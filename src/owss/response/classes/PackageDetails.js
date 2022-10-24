module.exports = class PackageDetails {
  #expectedCharges;

  constructor(packages) {
    this.#processExpectedCharges(packages['ExpectedCharges']);
  }

  #processExpectedCharges(expectedPackages) {
    if(expectedPackages !== undefined) {
      let packageChargesFormatted = [];
      
      for(const ep of expectedPackages) {
        for(const pc of ep['PackageCharge']) {
          const tmp = {};
          tmp.packageCode = pc['PackageCode'][0];
          tmp.validStartDate = pc['ValidDates'][0]['StartDate'][0];
          tmp.validEndDate = pc['ValidDates'][0]['EndDate'][0];
          tmp.quantity = pc['Quantity'][0];

          packageChargesFormatted.push(tmp);
        }
      }

      this.#expectedCharges = packageChargesFormatted;
    }
  }

  get() {
    return this.#expectedCharges;
  }

};
