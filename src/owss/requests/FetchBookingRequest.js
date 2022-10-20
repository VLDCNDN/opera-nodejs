const { parseStringPromise } = require("xml2js");
const Service = require("./Service");
const { FetchBookingResponse } = require("../response");

class FetchBookingRequest {
  static async byConfirmationNumber(confirmationNumber, config) {
    const action = `http://webservices.micros.com/ows/5.1/Reservation.wsdl#FetchBooking`;
    const body = `<FetchBookingRequest xmlns="http://webservices.micros.com/ows/5.1/Reservation.wsdl">
        <ConfirmationNumber type="INTERNAL">${confirmationNumber}</ConfirmationNumber>
      </FetchBookingRequest>`;
    const request = await Service.processRequest({ body, action, config });
    const parseRequest = await parseStringPromise(request);
    const response = new FetchBookingResponse(parseRequest);
  
    return response;
  }

  static async byReservationId(reservationId, config) {
    const action = `http://webservices.micros.com/ows/5.1/Reservation.wsdl#FetchBooking`;
    const body = `<FetchBookingRequest xmlns="http://webservices.micros.com/ows/5.1/Reservation.wsdl">
        <ResvNameId type="INTERNAL">${reservationId}</ResvNameId>
      </FetchBookingRequest>`;
    const request = await Service.processRequest({ body, action, config });
    const parseRequest = await parseStringPromise(request);
    const response = new FetchBookingResponse(parseRequest);
  
    return response;
  }

}

module.exports = FetchBookingRequest;
