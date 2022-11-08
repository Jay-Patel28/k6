import http from "k6/http";
import { check } from "k6";

const BASE_URL = "https://localhost:7114";
console.log("BASE_URL: ", BASE_URL);
export const options = {
  tags: {
    name: "ACTOR",
  },
  discardResponseBodies: true,
  scenarios: {
    actors: {
      executor: "constant-vus",
      vus: 5,
      duration: "5s",
    },
  },
};

export default function () {
  const end_point = "/actor/1b590e9b-ac0a-4c85-34e0-08da97054f1d";
  const res = http.get(BASE_URL + end_point);

  check(res, {
    "is status 200": (r) => r.status === 200,
  });
}
