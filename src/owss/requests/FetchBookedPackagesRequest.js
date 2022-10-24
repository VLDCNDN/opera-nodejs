const { parseStringPromise } = require("xml2js");
const Service = require("./Service");
const { FetchBookedPackagesResponse } = require("../response");

class FetchBookedPackagesRequest {
  static async byConfirmationNumber(confirmationNumber, config) {
    const action = `http://webservices.micros.com/ows/5.1/Reservation.wsdl#FetchBookedPackages`;
    const body = `<FetchBookedPackagesRequest xmlns="http://webservices.micros.com/ows/5.1/Reservation.wsdl">
            <HotelReference hotelCode="${config.propertyCode}" />
            <ConfirmationNumber type="INTERNAL">${confirmationNumber}</ConfirmationNumber>
        </FetchBookedPackagesRequest>`;

    const request = await Service.processRequest({ body, action, config });
    const parseRequest = await parseStringPromise(request);
    const response = new FetchBookedPackagesResponse(parseRequest);

    return response;
  }
}

module.exports = FetchBookedPackagesRequest;
