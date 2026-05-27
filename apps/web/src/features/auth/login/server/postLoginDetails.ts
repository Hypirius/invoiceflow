import { LoginDetailsType } from "../../types";

export default async function postLoginDetails(details: LoginDetailsType) {
  const results = await fetch("url", {
    method: "POST",
    body: JSON.stringify(details),
  });

  if (!results.ok) {
    throw new Error("Unable to login in, Error occured");
  }

  return await results.json();
}

// TODO: Add secruity headers and potential error handling
