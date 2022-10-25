
const axios = require("axios");
const AuthToken = require('./AuthToken')


module.exports = class OperaService {
  #config;

  constructor(config) {
    this.#config = config;
  }

  async #processToken() {
    const auth = new AuthToken(this.#config);
    const token = await auth.get();
    
    return token.access_token || '';
  }

  /**
   * 
   * @param {String} urlPath the host address is not included only the path 
   * @param {String} type GET,POST ... 
   * @param {Object} body if POST or PUT use this
   */
  async request({urlPath, type, body=null}) {
    //request token
    const accessToken = await this.#processToken();

    const url = `${this.#config.url}${urlPath}`;
    

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-hotelid": this.#config.hotelId,
        "x-app-key": this.#config.appKey,
        "Authorization": `Bearer ${accessToken}`
      }
    }

    let responseData = "";
    let resp = null;
    switch(type) {
      case "GET": 
        resp = await axios.get(url, config);
        responseData = resp.data;

        break;
      case "POST":
        resp = await axios.post(url, body, config);
        responseData = resp.data;
        break;
    }

    return responseData;
  }

}