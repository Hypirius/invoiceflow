import convertTimeValue from "@/utils/convertTimeValue";

function generateJWTExpiryTime(futureTime: unknown) {
  return new Date(Date.now() + convertTimeValue(futureTime));
}

export default generateJWTExpiryTime;
