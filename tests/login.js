import http from "k6/http";
import { check } from "k6";

const BASE_URL = "https://localhost:7114";
console.log("BASE_URL: ", BASE_URL);
export const options = {
  discardResponseBodies: true,
  scenarios: {
    actors: {
      executor: "constant-vus",
      vus: 5,
      duration: "2s",
    },
  },
};

export default function () {
  const end_point = "/api/Authenticate/login";
  const payload = JSON.stringify({
    username: "string",
    password: "String@123",
  });

  const res = http.post(BASE_URL + end_point, payload, {
    headers: { "Content-Type": "application/json" },
  });

  check(res, {
    "is status 200": (r) => r.status === 200,
  });
}
