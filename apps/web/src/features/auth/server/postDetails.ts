export default async function postDetails<T>(details: T, url: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });

  if (!res.ok) {
    console.log(res);
    throw new Error("Unable to process request, an error occured");
  }

  const result = await res.json();

  if (!result.success) {
    console.log(result.errors);
    throw new Error(result.errors);
  }

  return result;
}

// TODO: Add secruity headers and potential error handling, fix to proper console response
