const PackageDetails = require("./classes/PackageDetails");

module.exports = class FetchBookedPackagesResponse {
  #resultStatus;
  #resultMessage;
  #packages;

  constructor(soap) {
    const body = soap["soap:Envelope"]["soap:Body"];
    const packagesResp = body[0]["FetchBookedPackagesResponse"][0];
    const Result = packagesResp["Result"][0];

    const resultStatusFlag = Result["$"]["resultStatusFlag"];
    this.#resultStatus = resultStatusFlag;

    if (resultStatusFlag === "FAIL") {
      if (Result["OperaErrorCode"] !== undefined) {
        this.#resultMessage = Result["OperaErrorCode"][0]["_"];
      } else {
        this.#resultMessage = Result["GDSError"][0]["_"];
      }
    }
    if(packagesResp["BookedPackageList"] === undefined) {
      this.#packages = [];
    } else {
      this.#processResult(packagesResp["BookedPackageList"][0]["PackageDetails"]);
    }
    
  }

  #processResult(packages) {
    const arr = [];
    for (const pckg of packages) {
      arr.push(new PackageDetails(pckg));
    }

    this.#packages = arr;
  }

  getResult() {
    return {
      status: this.#resultStatus,
      message: this.#resultMessage,
    };
  }

  getAll() {
    return this.#packages;
  }

  /**
   * @TODO Improve the loop instead of using the nested loop the if else can also be improved
   */
  filter({ filterByValidDate = "", filterByPackageCodes = [] }) {
    const arr = [];

    if(filterByValidDate === "" || filterByPackageCodes.length === 0) {
      return arr;
    }

    for (const pckg of this.#packages) {
      const dataPackages = pckg.get();
      for (const data of dataPackages) {     
        var startDate = new Date(data['validStartDate']);
        var filterDate = new Date(filterByValidDate);

        if (filterByValidDate !== "" && filterByPackageCodes.length > 0) {
          if(filterByPackageCodes.includes(data['packageCode']) 
          && filterDate.toDateString() === startDate.toDateString()
          ) {
            arr.push(data);
          }
        } else if (filterByValidDate !== "" && filterByPackageCodes.length === 0) {
          if(filterDate.toDateString() === startDate.toDateString()) {
            arr.push(data);
          }
        } else if(filterByValidDate === "" && filterByPackageCodes.length > 0) {
          if(filterByPackageCodes.includes(data['packageCode'])) {
            arr.push(data);
          }
        }
      }

    }
    
    return arr;
  }
};
