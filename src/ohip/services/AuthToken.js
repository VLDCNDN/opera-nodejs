const axios = require("axios");

module.exports = class AuthToken {
  #host;
  #authKey;
  #username;
  #password;
  #appKey;
  #grantType;

  constructor({url, clientId, clientSecret, username, password, appKey}) {
    this.#host = url;
    this.#authKey = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    this.#username = username;
    this.#password = password;
    this.#appKey = appKey;
    this.#grantType = 'password';
  }

  async #request() {
    const url = `${this.#host}/oauth/v1/tokens`
    
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-app-key": this.#appKey,
        "Authorization": `Basic ${this.#authKey}`
      }
    }

    const data = {
      username: this.#username,
      password: this.#password,
      grant_type: this.#grantType
    }

    const resp = await axios.post(url, data, config);
    const token = resp.data;

    return token;
  }

  get() {
    return this.#request();
  }
}