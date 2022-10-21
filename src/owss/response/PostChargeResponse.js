module.exports = class PostChargeResponse {
  #resultStatus;
  #resultMessage;

  constructor(charges) {
    const body = charges["soap:Envelope"]["soap:Body"];
    const PostChargeResp = body[0]['PostChargeResponse'][0];
    const Result = PostChargeResp["Result"][0];

    const resultStatusFlag = Result["$"]["resultStatusFlag"];
    this.#resultStatus = resultStatusFlag;

    if (resultStatusFlag === "FAIL") {
      if (Result["c:OperaErrorCode"] !== undefined) {
        this.#resultMessage = Result["c:OperaErrorCode"][0];
      } else {
        this.#resultMessage = Result["hc:GDSError"][0]["_"];
      }
    }
  }

  getResult() {
    return {
      status: this.#resultStatus,
      message: this.#resultMessage,
    };
  }
};
