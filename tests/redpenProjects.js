import http from "k6/http";
import { group, check } from "k6";

const BASE_URL = "https://localhost:7114";
console.log("BASE_URL: ", BASE_URL);

export const options = {
  stages: [
    { duration: "20s", target: 10 },
    { duration: "40s", target: 50 },
    { duration: "20s", target: 10 },
  ],
  discardResponseBodies: true,
  executor: "constant-vus",
  vus: 5,
  // gracefulStop: "3s",
  //   duration: "30s",
  thresholds: {
    http_req_failed: ["rate<1"],
  },
};

export default function () {
  const end_point =
    "https://api.dev.redpen.work/serviceconnections/96182fa4-1461-4ef0-a0ed-0b4e40b5d56a/projects";

  group("Authentication ", function () {
    const res = http.get(
      end_point,
      {
        headers: {
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.8",
          Connection: "keep-alive",
          Origin: "https://dev.redpen.work",
          Referer: "https://dev.redpen.work/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "Sec-GPC": "1",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
          authorization:
            "Bearer eyJraWQiOiIzRTBWVFpSbFdPNXR5dXpCa0ZwbzJVN01mSU0zZnRKXC8walpZQjZpTXo5Yz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3YjIxMzQ0Ni1lMWFlLTRmODItOTkxZS02NzgyMDExZTA3M2MiLCJjb2duaXRvOmdyb3VwcyI6WyJVc2VyIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2tad1pRNVFzWiIsImNsaWVudF9pZCI6IjZucjAyYjdzY2xtM2lmYWNhZDcxdWllcGFiIiwiZXZlbnRfaWQiOiI3OWFlMWVkMS04ZDg2LTRmOWItYjlkOS1jZGE5ZWJkMDg3N2UiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjY3OTc3NTAyLCJleHAiOjE2NjgwNjM5MDIsImlhdCI6MTY2Nzk3NzUwMiwianRpIjoiMzc0ODI1NGUtMGMxMC00ZjI3LTk1YTAtNzQ5OGExNDRkNWI2IiwidXNlcm5hbWUiOiI3YjIxMzQ0Ni1lMWFlLTRmODItOTkxZS02NzgyMDExZTA3M2MifQ.o85A5T4JsVSUjKV6L-FrWSkvk-HaZwz2yrBSELGaB09CXwMtRcohkuETAfZPcTLeaUu0lFj938mlOQ3sKllNAS_h91WPd_6e7PSnk8m4zDzU_JaOm4sn6B4RlFZI4B_xt8FhMTJ8DEkcTyA_QEwX_7aJAaQtVfwxEsMhe0cBW38olOn4pK-o50XcKSKYId5RFf-s67KCCtmcH_AWkCtOaawYgl519r1-YPg78_479DWweikD4woHFoONRWZnHsk8z_Osy9Mr4aVwDFa15UBhhmQB2G7wLAh1LCgn68zn5yz5tS-vxCnGqeiaWi3HXa47-dWnVltOcp8MovRam3AB6w",
          "content-type": "application/json",
          "redpen-client-id": "9a192e70-2e5e-40a4-9ad6-d0a1ee29e6bd",
          "redpen-client-name": "Web App",
          "redpen-client-version": "1.1.12",
          Cookie:
            "JSESSIONID=86B997DBDF4F39885F35B0D02B1FD345; XSRF-TOKEN=bba2fc52-7c27-4079-9687-6a66ef25d1c5",
        },
      },
      { tags: { name: "LOGIN" } }
    );

    // console.log('res: ', res);
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
  });
}
