import ms from "ms";

function convertTimeValue(value: ms.StringValue | number) {
  if (typeof value === "number") {
    return value;
  }

  return ms(value);
}

export default convertTimeValue;
