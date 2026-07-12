// nextJs takes seconds while express takes milliseconds for maxAge

const cookieConfig = {
  access_token: { httpOnly: false, secure: true, maxAge: 30 * 60 * 1000 },
  refresh_token: {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  device_id: { maxAge: 400 * 24 * 60 * 60 * 1000 },
};

export { cookieConfig };
