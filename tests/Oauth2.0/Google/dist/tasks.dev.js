"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;
exports["default"] = _default;
exports.options = void 0;

var _http = _interopRequireDefault(require("k6/http"));

var _k = require("k6");

var _helper = require("./helper.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var options = {
  executor: "constant-vus",
  vus: 5,
  duration: "10s"
};
exports.options = options;
var refresh_token = "1//046Fw2uiyDdYICgYIARAAGAQSNgF-L9IrZF9Bxd_Pv-XPpmGiEG3VAZ8i5RTUXG3R4J7G050cjAQLd-oK1pQcnVAbrMVDErWSZw";
var some = "";

function setup() {
  some = (0, _helper.getAccessToken)(refresh_token);
  return some;
}

function _default(some) {
  console.log("some: ", some);
  var body = JSON.stringify({
    Method: "GET",
    absoluteURI: "https://tasks.googleapis.com/tasks/v1/users/@me/lists",
    headers: {},
    "message-body": "",
    access_token: some,
    access_token_type: "bearer"
  });

  var resp = _http["default"].post("https://developers.google.com/oauthplayground/sendRequest", body);

  (0, _k.check)(resp, {
    "is status 200": function isStatus200(r) {
      return r.status === 200;
    }
  });
}