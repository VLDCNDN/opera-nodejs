const { parseStringPromise } = require("xml2js");
const Service = require("./Service");
const { AssignRoomAdvResponse } = require("../response");

class AssignRoomAdvRequest {
  static async byRoomNumberAndReservationId(reservationId, roomNumber, config) {
    const action = `http://webservices.micros.com/ows/5.1/ResvAdvanced.wsdl#AssignRoom`;
    const body = `<AssignRoomAdvRequest xmlns="http://webservices.micros.com/og/4.3/ResvAdvanced/">
            <HotelReference hotelCode="${config.propertyCode}"/>
            <ResvNameId type="INTERNAL" source="OPERA_RESV_ID">${reservationId}</ResvNameId>
            <RoomNoRequested>${roomNumber}</RoomNoRequested>
          </AssignRoomAdvRequest>`;

    const request = await Service.processRequest({ body, action, config });
    const parseRequest = await parseStringPromise(request);
    const response = new AssignRoomAdvResponse(parseRequest);

    return response;
  }
}

module.exports = AssignRoomAdvRequest;
