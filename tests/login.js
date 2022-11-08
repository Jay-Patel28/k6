import http from "k6/http";
import { group, check } from "k6";

const BASE_URL = "https://localhost:7114";
console.log("BASE_URL: ", BASE_URL);

export const options = {
  stages: [
    { duration: "5s", target: 10 },
    { duration: "20s", target: 100 },
    { duration: "5s", target: 10 },
  ],
  discardResponseBodies: true,
  executor: "constant-vus",
  vus: 5,
//   duration: "30s",
  thresholds: {
    http_req_failed: ["rate<0.1"],
    http_req_waiting: ["avg<15"],
  },
};

export default function () {
  const end_point = "/api/Authenticate/login";
  const payload = JSON.stringify({
    username: "string",
    password: "String@123",
  });

  group("Authentication ", function () {
    const res = http.post(
      BASE_URL + end_point,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      },
      { tags: { name: "LOGIN" } }
    );

    check(res, {
      "is status 200": (r) => r.status === 200,
    });
  });
}
