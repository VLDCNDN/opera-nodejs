const { parseStringPromise } = require("xml2js");
const Service = require("./Service");
const { PostChargeResponse } = require("../response");

class PostChargeRequest {
  static async byReservationId(
    {
      reservationId,
      shortInfo,
      longInfo,
      charge,
      account = 1000,
      userId = "SUPERVISOR",
      stationID = "KIOSK1",
    },
    config
  ) {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    var seconds = date_ob.getSeconds();
    var minutes = date_ob.getMinutes();
    var hour = date_ob.getHours();

    const action = `http://webservices.micros.com/ows/5.1/ResvAdvanced.wsdl#PostCharge`;
    const body = `<PostChargeRequest xmlns="http://webservices.micros.com/og/4.3/ResvAdvanced/"
      xmlns:c="http://webservices.micros.com/og/4.3/Common/"
      xmlns:hc="http://webservices.micros.com/og/4.3/HotelCommon/"
      xmlns:n="http://webservices.micros.com/og/4.3/Name/"
      xmlns:r="http://webservices.micros.com/og/4.3/Reservation/" xmlns:xsi="http://www.w3.org/2001/XMLSchemainstance" Account="${account}" >
      <Posting PostTime="${hour}:${minutes}:${seconds}" UserID="${userId}" ShortInfo="${shortInfo}"
      LongInfo="${longInfo}" Charge="${charge}" StationID="${stationID}" PostDate="${year}-${month}-${date}">
      <ReservationRequestBase>
      <HotelReference hotelCode="${config.propertyCode}"/>
        <ReservationID>
          <c:UniqueID type="EXTERNAL" source="RESV_NAME_ID">${reservationId}</c:UniqueID>
        </ReservationID>
      </ReservationRequestBase>
      </Posting>
    </PostChargeRequest>`;

    const request = await Service.processRequest({ body, action, config });
    const parseRequest = await parseStringPromise(request);
    const response = new PostChargeResponse(parseRequest);

    return response;
  }
}

module.exports = PostChargeRequest;
