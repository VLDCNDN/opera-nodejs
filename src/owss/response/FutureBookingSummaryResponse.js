const HotelReservation = require("./classes/HotelReservation");

module.exports = class FutureBookingSummaryResponse {
  #resultStatus;
  #resultMessage;
  #reservations;
  count;

  constructor(reservations) {
    const bookingResp = reservations["soap:Envelope"]["soap:Body"];
    const FetchBookingResp = bookingResp[0]["FutureBookingSummaryResponse"][0];
    const FetchResult = FetchBookingResp["Result"][0];

    const resultStatusFlag = FetchResult["$"]["resultStatusFlag"];

    this.#resultStatus = resultStatusFlag; // this only contains, SUCCESS and FAIL
    if (resultStatusFlag === "FAIL") {
      if (FetchResult["c:OperaErrorCode"] !== undefined) {
        this.#resultMessage = FetchResult["c:OperaErrorCode"][0];
      } else {
        this.#resultMessage = FetchResult["hc:GDSError"][0]["_"];
      }
    }

    this.#processResult(FetchBookingResp);
  }

  getResult() {
    return {
      status: this.#resultStatus,
      message: this.#resultMessage,
    };
  }

  #processResult(fetchBookingResp) {
    if (this.#resultStatus === "FAIL") {
      return;
    }
    const hotelReservations = fetchBookingResp['HotelReservations'][0]['r:HotelReservation'];

    this.count = (hotelReservations).length;

    const arr = [];
    for (const resv of hotelReservations) {
      arr.push(new HotelReservation(resv));
    }

    this.#reservations = arr;
  }
  
  getReservationWithGuest() {
    for(const resv of this.#reservations) {
      if(resv.getGuestCount() > 0) {
        return resv;
      }
    }
  }

  getFirst() {
    return this.#reservations[0];
  }

  get() {
    return this.#reservations
  }

  toJson() {
    const arr = [];
    // console.log(this.#reservations);
    for(const resv of this.#reservations) {
      // arr.push(resv.toJson());
      // console.log(resv.toJson());
    }

    // return arr;
  }
};
