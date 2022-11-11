import http from "k6/http";
import { check } from "k6";

export const options = {
  discardResponseBodies: true,
  scenarios: {
    actors: {
      executor: "constant-vus",
      vus: 200,
      duration: "15s",
    },
  },
  gracefulStop: "1s",
  thresholds: {
    http_req_failed: ["rate<0.1"],
    http_req_receiving: ["avg<4"],
  },
};

export default function () {
  const res = http.get("https://reqres.in/api/users?page=2");

  check(res, {
    "is status 200": (r) => r.status === 200,
  });
}
