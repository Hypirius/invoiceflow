import convertTimeValue from "@/utils/convertTimeValue";

function generateExpiryTime(futureTime: unknown) {
  return convertTimeValue(futureTime) / 1000;
}

export default generateExpiryTime;
