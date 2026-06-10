import * as arctic from "arctic";
import { google } from "@/config/arctic";

function googleOauthStartService() {
  const state = arctic.generateState(); // CSRF protection
  const codeVerifier = arctic.generateCodeVerifier(); // PKCE
  const scopes = ["openid", "profile", "email"];
  return {
    url: google.createAuthorizationURL(state, codeVerifier, scopes),
    state,
  };
}

export default googleOauthStartService;
