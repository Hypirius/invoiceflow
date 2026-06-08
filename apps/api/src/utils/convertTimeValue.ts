import ms from "ms";

function convertTimeValue(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  return ms(value as ms.StringValue);
}

export default convertTimeValue;
