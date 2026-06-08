import { createRefreshToken, RefreshTokenType } from "./signUp.repository";

async function publishRefreshTokenService(data: RefreshTokenType) {
  return await createRefreshToken(data);
}

export default publishRefreshTokenService;
