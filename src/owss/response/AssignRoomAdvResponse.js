module.exports = class AssignRoomAdvResponse {
  #resultStatus;
  #resultMessage;

  constructor(charges) {
    const body = charges["soap:Envelope"]["soap:Body"];
    const fetchResponse = body[0]["AssignRoomAdvResponse"][0];
    const Result = fetchResponse["Result"][0];

    const resultStatusFlag = Result["$"]["resultStatusFlag"];
    this.#resultStatus = resultStatusFlag;
    
    if (resultStatusFlag === "FAIL") {
      if (Result["OperaErrorCode"] !== undefined) {
        this.#resultMessage = Result["OperaErrorCode"][0]["_"];
      } else {
        this.#resultMessage = Result["GDSError"][0]["_"];
      }
    }
  }

  getResult() {
    return {
      status: this.#resultStatus,
      message: this.#resultMessage
    };
  }
};
