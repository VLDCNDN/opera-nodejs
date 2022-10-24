const HotelReservation = require("./classes/HotelReservation");

class FetchBookingResponse {
  #resultStatus;
  #resultMessage;
  #reservation;
  #rawData;
  #jsonData;
  #jsonDecoded;

  constructor(reservations) {
    const bookingResp = reservations["soap:Envelope"]["soap:Body"];
    const FetchBookingResp = bookingResp[0]["FetchBookingResponse"][0];
    const FetchResult = FetchBookingResp["Result"][0];
    const resultStatusFlag = FetchResult["$"]["resultStatusFlag"];

    this.resultStatus = resultStatusFlag; // this only contains, SUCCESS and FAIL
    if (resultStatusFlag === "FAIL") {
      if (FetchResult["c:OperaErrorCode"] !== undefined) {
        this.resultMessage = FetchResult["c:OperaErrorCode"][0];
      } else {
        this.resultMessage = FetchResult["hc:GDSError"][0]["_"];
      }
    }

    this.processResult(FetchBookingResp);
  }

  getResult() {
    return {
      status: this.resultStatus,
      message: this.resultMessage,
    };
  }

  processResult(fetchBookingResp) {
    if (this.resultStatus === "FAIL") {
      return;
    }

    this.reservation = new HotelReservation(
      fetchBookingResp["HotelReservation"][0]
    );
  }

  get() {
    return this.reservation;
  }
}

module.exports = FetchBookingResponse;
