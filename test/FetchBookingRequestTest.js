let chai = require("chai");
var expect = chai.expect;
require('dotenv').config();

let {
  FetchBookingRequest,
  FutureBookingSummaryRequest,
  PostChargeRequest
} = require("../src/owss/requests");

const config = {
  url: process.env.OPERA_URL,
  propertyCode: process.env.OPERA_PROPERTYCODE,
  username: process.env.OPERA_USERNAME,
  password: process.env.OPERA_PASSWORD,
};

// describe("Index", () => {
//   it("it should Return sample", async () => {
//     const resp = await FutureBookingSummaryRequest.byRoomNumberAndInhouse(
//       "0608",
//       config
//     );

//     console.log(resp.getReservationWithGuest().getReservationId());
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

describe("Index", () => {
  it("Test postcharge", async () => {
    const sampleData = {
      reservationId : "56652",
      shortInfo: "shortInfooo",
      longInfo: "longINfooo",
      charge: 123,
    };
    
    const resp = PostChargeRequest.byReservationId(
            sampleData,config
          ).then(resp => {
            console.log(resp.getResult());
          });

          // console.log();
    // console.log(resp.getResult());
  });
});
