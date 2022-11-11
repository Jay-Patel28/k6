import http from "k6/http";
import { check } from "k6";
import { getAccessToken } from "./helper.js";
export const options = {
  executor: "constant-vus",
  vus: 5,
  duration: "10s",
};

const refresh_token =
  "1//046Fw2uiyDdYICgYIARAAGAQSNgF-L9IrZF9Bxd_Pv-XPpmGiEG3VAZ8i5RTUXG3R4J7G050cjAQLd-oK1pQcnVAbrMVDErWSZw";

let some = "";
export function setup() {
  some = getAccessToken(refresh_token);
  return some;
}

export default function (some) {
  console.log("some: ", some);
  const body = JSON.stringify({
    Method: "GET",
    absoluteURI: "https://tasks.googleapis.com/tasks/v1/users/@me/lists",
    headers: {},
    "message-body": "",
    access_token: some,
    access_token_type: "bearer",
  });

  const resp = http.post(
    "https://developers.google.com/oauthplayground/sendRequest",
    body
  );

  check(resp, {
    "is status 200": (r) => r.status === 200,
  });
}
