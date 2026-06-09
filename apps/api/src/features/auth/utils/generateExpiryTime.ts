import convertTimeValue from "@/utils/convertTimeValue";

function generateExpiryTime(futureTime: unknown) {
  return new Date(Date.now() + convertTimeValue(futureTime));
}

export default generateExpiryTime;
