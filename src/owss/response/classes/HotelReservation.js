module.exports = class HotelReservation {
  constructor(reservation) {
    this.reservation = reservation;
    this.attributes = reservation["$"];
    this.uniqueIdList = reservation["r:UniqueIDList"][0]["c:UniqueID"];
    this.roomStay = reservation["r:RoomStays"][0]["hc:RoomStay"][0];

    this.profile =
      reservation["r:ResGuests"][0]["r:ResGuest"][0]["r:Profiles"][0][
        "Profile"
      ][0];
    this.customer = this.profile["Customer"][0]["PersonName"][0];
    this.addresses = this.profile["Addresses"][0]["NameAddress"][0];

    console.log(reservation);
  }

  ////////////////////////////////////////////////////////////////
  // IDS
  ////////////////////////////////////////////////////////////////

  getConfirmationNumber() {
    // the confirmation # always at the start of the list, or there's no type of RESVID
    return this.uniqueIdList[0]["_"];
  }

  getReservationId() {
    return this.uniqueIdList[1]["_"];
  }

  getReservationStatus() {
    return this.attributes["reservationStatus"];
  }

  ////////////////////////////////////////////////////////////////
  // Profile
  ////////////////////////////////////////////////////////////////

  getProfileId() {
    return this.profile["ProfileIDs"][0]["c:UniqueID"][0]["_"] ?? "";
  }

  getFirstName() {
    return this.customer["c:firstName"].join(" ");
  }
  getLastName() {
    return this.customer["c:lastName"].join(" ");
  }

  getTitleName() {
    return this.customer["c:nameTitle"] !== undefined
      ? this.customer["c:nameTitle"].join(" ")
      : "";
  }

  getMobileNumber() {
    return this.profile["Phones"] !== undefined ? this.profile["Phones"][0]["NamePhone"][0]["c:PhoneNumber"][0] : "";
  }

  getAddressLine() {
    return this.addresses["c:AddressLine"] === undefined ? "" : this.addresses["c:AddressLine"][0];
  }

  getCity() {
    return this.addresses["c:cityName"] === undefined ? "" : this.addresses["c:cityName"][0];
  }

  getState() {
    return  this.addresses["c:stateProv"] === undefined ? "" : this.addresses["c:stateProv"][0];
  }

  getCountry() {
    return this.addresses["c:countryCode"] === undefined ? "" : this.addresses["c:countryCode"][0];
  }

  getPostal() {
    return this.addresses["c:postalCode"]===undefined ? "" : this.addresses["c:postalCode"][0];
  }

  getEmails() {
    return this.profile["EMails"][0]["NameEmail"][0]["_"] ?? [];
  }

  ////////////////////////////////////////////////////////////////
  // ROOM STAY
  ////////////////////////////////////////////////////////////////
  getRoomTypeCode() {
    return this.roomStay["hc:RoomTypes"][0]["hc:RoomType"][0]["$"][
      "roomTypeCode"
    ];
  }

  getRoomNumber() {
    const roomNumber =
      this.roomStay["hc:RoomTypes"][0]["hc:RoomType"][0]["hc:RoomNumber"];

    if (roomNumber === undefined) {
      return "";
    }

    return roomNumber[0];
  }

  getArrivalDate() {
    return this.roomStay["hc:TimeSpan"][0]["hc:StartDate"][0];
  }

  getDepartureDate() {
    return this.roomStay["hc:TimeSpan"][0]["hc:EndDate"][0];
  }

  getGuestCount() {
    const guestCount = this.roomStay["hc:GuestCounts"][0]["hc:GuestCount"];
    const total = guestCount.reduce((total, guest) => {
      return total + parseInt(guest["$"]["count"]);
    }, 0);

    return total;
  }

  /**
   * Note: this will only return mostly using ${FetchBookingRequest}
   */
  getComments() {
    const comments = this.roomStay["hc:Comments"][0]["hc:Comment"][0]['hc:Text'];
    return comments;
  }

  toJson() {
    return {
      reservationId: this.getReservationId(),
      confirmationNumber: this.getConfirmationNumber(),
      reservationStatus: this.getReservationStatus(),
      arrivalDate: this.getArrivalDate(),
      departureDate: this.getDepartureDate(),
      profile: {
        id: this.getProfileId(),
        firstName: this.getFirstName(),
        lastName: this.getLastName(),
        title: this.getTitleName(),
        mobileNumber: this.getMobileNumber(),
        email: this.getEmails(),
        addresses: {
          line: this.getAddressLine(),
          city: this.getCity(),
          state: this.getState(),
          country: this.getCountry(),
          postal: this.getPostal(),
        },
      },
      room: {
        number: this.getRoomNumber(),
        typeCode: this.getRoomTypeCode(),
        guestCount: this.getGuestCount(),
      },
    };
  }
};
