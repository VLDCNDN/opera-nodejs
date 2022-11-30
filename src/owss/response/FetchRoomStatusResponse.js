module.exports = class FetchRoomStatusResponse {
  #resultStatus;
  #resultMessage;
  #roomStatus;

  constructor(charges) {
    const body = charges["soap:Envelope"]["soap:Body"];
    const fetchResponse = body[0]["FetchRoomStatusResponse"][0];
    const Result = fetchResponse["Result"][0];

    const resultStatusFlag = Result["$"]["resultStatusFlag"];
    this.#resultStatus = resultStatusFlag;

    if (resultStatusFlag === "FAIL") {
      if (Result["c:OperaErrorCode"] !== undefined) {
        this.#resultMessage = Result["c:OperaErrorCode"][0];
      } else {
        this.#resultMessage = Result["hc:GDSError"][0]["_"];
      }
    }

    if(fetchResponse["RoomStatus"] === undefined) {
      this.#roomStatus = [];
    } else {
      this.#processResult(fetchResponse["RoomStatus"]);
    }
  }

  #processResult(resp) {
    this.#roomStatus = resp[0]['$'] ?? [];
  }

  getResult() {
    return {
      status: this.#resultStatus,
      message: this.#resultMessage
    };
  }

  get() {
    return this.#roomStatus;
  }
};
