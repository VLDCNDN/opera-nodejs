let chai = require("chai");
var expect = chai.expect;
require("dotenv").config();

let {
  FetchBookingRequest,
  FutureBookingSummaryRequest,
  PostChargeRequest,
  FetchBookedPackagesRequest,
} = require("../src/owss/requests");

const config = {
  url: process.env.OPERA_URL,
  propertyCode: process.env.OPERA_PROPERTYCODE,
  username: process.env.OPERA_USERNAME,
  password: process.env.OPERA_PASSWORD,
};

// describe("Index", () => {
//   it("it should Return sample", async () => {
//     const resp = await FetchBookingRequest.byConfirmationNumber(
//       "50902",
//       config
//     );

//     const resp2 = await FetchBookedPackagesRequest.byConfirmationNumber(
//       resp.get().getConfirmationNumber(),
//       config
//     );

//     const packages = resp2.filter({
//       filterByValidDate: "2022-10-25",
//       filterByPackageCodes: ["BDBKT", "CHBF"],
//     })

//     console.log(packages);

//     return;
//     // expect(index.requests).to.equal('test');
//     const d = resp.get();
//     if (d.result.status === "FAIL") {
//       console.log("FAIL");
//       return;
//     }

//     console.log(d.data.toJson());
//   });
// });

// describe("Index", () => {
//   it("Test postcharge", async () => {
//     const sampleData = {
//       reservationId : "56652",
//       shortInfo: "shortInfooo",
//       longInfo: "longINfooo",
//       charge: 123,
//     };

//     const resp = PostChargeRequest.byReservationId(
//             sampleData,config
//           ).then(resp => {
//             console.log(resp.getResult());
//           });

//           // console.log();
//     // console.log(resp.getResult());
//   });
// });
