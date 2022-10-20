const { parseStringPromise } = require("xml2js");
const Service = require("./Service");
const { FutureBookingSummaryResponse } = require("../response");

class FutureBookingSummaryRequest {
  static async byRoomNumberAndInhouse(roomNumber, config) {
    const action = `http://webservices.micros.com/ows/5.1/Reservation.wsdl#FutureBookingSummary`;
    const body = `<FutureBookingSummaryRequest canHandleVaultedCreditCard="true" xmlns:hc="http://webservices.micros.com/og/4.3/HotelCommon/" xmlns="http://webservices.micros.com/ows/5.1/Reservation.wsdl">
                    <AdditionalFilters RoomNumber="${roomNumber}" ReservationStatus="INHOUSE">
                        <r:HotelReference hotelCode="${config.propertyCode}"/>
                    </AdditionalFilters>
                </FutureBookingSummaryRequest>`;
    const request = await Service.processRequest({ body, action, config });
    const parseRequest = await parseStringPromise(request);
    const response = new FutureBookingSummaryResponse(parseRequest);
    return response;
  }
}

module.exports = FutureBookingSummaryRequest;
