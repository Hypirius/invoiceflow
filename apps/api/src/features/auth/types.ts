import { JWTPayload } from "jose";

interface JwtPayloadType extends JWTPayload {
  sub: string;
  email: string;
  displayName: string;
  role: string;
}

type EmailRedisPayload = {
  email: string;
  otp: number;
  userId: string | null;
  attempts: number;
  invalid: boolean;
  expiresAt: number;
};

type GoogleIdTokenPayloadType = {
  iss: string; // Issuer (always "accounts.google.com" or "https://accounts.google.com")
  sub: string; // Unique user identifier (Use this as your database primary key)
  aud: string; // Client ID of your application (Audience)
  exp: number; // Expiration Unix timestamp in seconds
  iat: number; // Issued-at Unix timestamp in seconds

  // User Profile Information (Available depending on OAuth scopes)(Scopes confirmed for non optional fields)
  email: string; // User's email address
  email_verified: boolean; // True if Google has verified the email address
  name: string; // User's full name
  picture: string; // URL to the user's profile image
  given_name: string; // First name
  family_name: string; // Last name
  locale?: string; // User's language preference (e.g., "en")

  // Optional / Administrative Claims
  azp?: string; // Authorized party (the client ID that requested the token)
  hd?: string; // G Suite/Google Workspace hosted domain (only present if enterprise user)
  nbf?: number; // Not-before Unix timestamp in seconds
  at_hash?: string; // Access token hash value
};

export type { JwtPayloadType, EmailRedisPayload, GoogleIdTokenPayloadType };

// TODO: Will need to be changed to support other related features
