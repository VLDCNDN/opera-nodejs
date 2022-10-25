const OperaService = require('../services/OperaService');

module.exports = class Reservations extends OperaService {
  #config;

  constructor(config) {
    super(config);
    this.#config = config;
  }
  
  async getAll() {
    const data = await super.request({
      urlPath: `/rsv/v1/hotels/${this.#config.hotelId}/reservations`,
      type: "GET",
    });

    return data;
  }
}