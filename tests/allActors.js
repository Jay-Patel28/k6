import http from "k6/http";
import { check } from "k6";

const BASE_URL =
  "https://localhost:7114/actor/1b590e9b-ac0a-4c85-34e0-08da97054f1d";
console.log("BASE_URL: ", BASE_URL);
export const options = {
  discardResponseBodies: true,
  scenarios: {
    actors: {
      executor: "constant-vus",
      vus: 10,
      duration: "5s",
    },
  },
};

export default function () {
  const end_point = "/actors";
  const res = http.get(BASE_URL + end_point);
  check(res, {
    "status 200": (r) => r.status === 200,
  });
}
