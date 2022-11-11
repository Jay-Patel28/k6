"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccessToken = getAccessToken;

var _http = _interopRequireDefault(require("k6/http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var token_url = "https://developers.google.com/oauthplayground/refreshAccessToken";

function getAccessToken(refresh_token) {
  console.log("refresh_token: __________________________________________________________________");

  var response = _http["default"].post(token_url, JSON.stringify({
    token_uri: "https://oauth2.googleapis.com/token",
    refresh_token: refresh_token
  }));

  return JSON.parse(response.body).access_token;
}