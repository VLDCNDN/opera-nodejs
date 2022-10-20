const axios = require("axios");

class Service {
  static async processRequest({ action, body, config }) {
    const url = Service.processUrl(action, config);
    const headersConfig = {
      headers: {
        "Content-Type": "text/xml",
        SOAPAction: action,
      },
    };

    const data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:c="http://webservices.micros.com/og/4.3/Common/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:r="http://webservices.micros.com/og/4.3/Reservation/" xmlns:hc="http://webservices.micros.com/og/4.3/HotelCommon/" xmlns:n="http://webservices.micros.com/og/4.3/Name/">
        <soap:Header>
            ${Service.processHeader(config)}
        </soap:Header>
        <soap:Body>
            ${body}
        </soap:Body>
    </soap:Envelope>`;

    const respData = await Service.startRequest(url, data, headersConfig);

    return respData.data;
  }

  static async startRequest(url, data, headersConfig) {
    return axios.post(url, data, headersConfig);
  }

  static processUrl(action, config) {
    const getAction = action
      .substring(action.lastIndexOf("/") + 1)
      .split("#")[0];
    const mainAction = getAction.replace(".wsdl", "");
    let url = `${config.url}/${mainAction}`;

    if (
      config.wssePassword === undefined &&
      config.wsseUsername === undefined
    ) {
      url += ".asmx";
    }

    return url;
  }

  static processHeader(config) {
    const currentDate = new Date().toISOString();
    const transactionId = Date.parse(currentDate);
    let header = "";

    if (
      config.wssePassword !== undefined &&
      config.wsseUsername !== undefined
    ) {
      header += `<wsse:Security xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
            <wsse:UsernameToken wsu:Id="UsernameToken-89C29635B49E665F5E157002847059328">
                <wsse:Username>${config.wsseUsername}</wsse:Username>
                <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${config.wssePassword}</wsse:Password>
            </wsse:UsernameToken>
            <wsu:Timestamp wsu:Id="TS-89C29635B49E665F5E157002847059327">
              <wsu:Created>${currentDate}</wsu:Created>
                <wsu:Expires>${currentDate}</wsu:Expires>
            </wsu:Timestamp>
        </wsse:Security>`;
    }

    header += `<OGHeader transactionID="${transactionId}" primaryLangID="E" timeStamp="${currentDate}" xmlns="http://webservices.micros.com/og/4.3/Core/">
          <Origin entityID="KIOSK" systemType="KIOSK" />
          <Destination entityID="TI" systemType="PMS" />
          <Authentication>
              <UserCredentials>
                  <UserName>${config.username}</UserName>
                  <UserPassword>${config.password}</UserPassword>
                  <Domain>${config.propertyCode}</Domain>
              </UserCredentials>
          </Authentication>
        </OGHeader>`;

    return header;
  }
}

module.exports = Service;
