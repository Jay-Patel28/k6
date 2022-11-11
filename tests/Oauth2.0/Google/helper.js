import http from "k6/http";
const token_url =
  "https://developers.google.com/oauthplayground/refreshAccessToken";

export function getAccessToken(refresh_token) {
  console.log(
    "refresh_token: __________________________________________________________________"
  );
  const response = http.post(
    token_url,
    JSON.stringify({
      token_uri: "https://oauth2.googleapis.com/token",
      refresh_token: refresh_token,
    })
  );
  return JSON.parse(response.body).access_token;
}
