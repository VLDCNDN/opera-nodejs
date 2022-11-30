const { parseStringPromise } = require("xml2js");
const Service = require("./Service");
const { FetchRoomStatusResponse } = require("../response");

class FetchRoomStatusRequest {
  static async byRoomNumber(roomNumber, config) {
    const action = `http://webservices.micros.com/ows/5.1/ResvAdvanced.wsdl#FetchRoomStatus`;
    const body = `<FetchRoomStatusRequest xmlns="http://webservices.micros.com/og/4.3/ResvAdvanced/" xmlns:c="http://webservices.micros.com/og/4.3/Common/" xmlns:hc="http://webservices.micros.com/og/4.3/HotelCommon/" xmlns:n="http://webservices.micros.com/og/4.3/Name/" xmlns:r="http://webservices.micros.com/og/4.3/Reservation/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" RoomNumber="${roomNumber}">
            <HotelReference hotelCode="${config.propertyCode}"/>
          </FetchRoomStatusRequest>`;

    const request = await Service.processRequest({ body, action, config });
    const parseRequest = await parseStringPromise(request);
    const response = new FetchRoomStatusResponse(parseRequest);

    return response;
  }
}

module.exports = FetchRoomStatusRequest;
