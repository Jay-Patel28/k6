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
  gracefulStop: "3s",
  //   duration: "30s",
  thresholds: {
    http_req_failed: ["rate<0.1"],
    http_req_waiting: ["avg<15"],
  },
};

export default function () {
  const end_point = "/api/Authenticate/login";

  const payload = JSON.stringify({
    email: "eve.holt@reqres.in",
    password: `${Math.random()}jp`
  });

  group("Authentication ", function () {
    const res = http.post(
      "https://reqres.in/api/login",
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
