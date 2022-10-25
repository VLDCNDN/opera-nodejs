let chai = require("chai");
var expect = chai.expect;
require("dotenv").config();

let {
  FetchBookingRequest,
  FutureBookingSummaryRequest,
  PostChargeRequest,
  FetchBookedPackagesRequest,
} = require("../src/owss/requests");

let {
  Reservations,
} = require("../src/ohip/requests");

const 
  AuthToken
 = require('../src/ohip/services/AuthToken')
 const 
 OperaService
  = require('../src/ohip/services/OperaService')

const owssConfig = {
  url: process.env.OPERA_URL,
  propertyCode: process.env.OPERA_PROPERTYCODE,
  username: process.env.OPERA_USERNAME,
  password: process.env.OPERA_PASSWORD,
};

const ohipConfig = {
  url: process.env.OHIP_HOSTNAME,
  username: process.env.OHIP_USERNAME,
  password: process.env.OHIP_PASSWORD,
  hotelCode: process.env.OHIP_HOTELCODE,
  hotelId: process.env.OHIP_HOTELID,
  clientId: process.env.OHIP_CLIENTID,
  clientSecret: process.env.OHIP_CLIENTSECRET,
  appKey: process.env.OHIP_APPKEY,
}

// describe("Index", () => {
//   it("it should Return sample", async () => {
//     const resp = await FutureBookingSummaryRequest.byRoomNumberAndInhouse(
//       "0516",
//       config
//     );

//     const resp2 = await FetchBookedPackagesRequest.byConfirmationNumber(
//       resp.getReservationWithGuest().getConfirmationNumber(),
//       config
//     );

//     const packages = resp2.filter({
//       // filterByValidDate: new Date().toISOString().slice(0, 10),
//       filterByPackageCodes: ["CHBF"]
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
describe("Ohip", () => {
  it("Reservation Request", async () => {
    const reservation = new Reservations(ohipConfig);
    const data = await reservation.getAll();

    console.log(data);
  });
  
  // it("Opera service", async () => {
  //   const auth = new OperaService(ohipConfig);
  //   const data = await auth.request({
  //     urlPath: `/rsv/v1/hotels/${ohipConfig.hotelId}/reservations`,
  //     type: "GET",
  //   });
    
  //   console.log(data);
  // });

  // it("Auth Test", async () => {
  //   const auth = new AuthToken(ohipConfig);
  //   await auth.get();

  // });
  
});