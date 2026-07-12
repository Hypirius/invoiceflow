let promise: Promise<unknown> | null = null;
// TODO: could use map for multiple paths

//NOTE: NOT USED ANYWHERE AS OF NOW

type promiseFnType<T> = () => Promise<T>;

async function lockPromise<T>(
  promiseFn: promiseFnType<T>,
  unlock: boolean = false,
) {
  let isError: boolean = false;
  let error: string | null = null;
  let data: T | null = null;

  try {
    if (promise === null) {
      promise = promiseFn();
    }

    data = (await promise) as T;

    if (unlock) {
      promise.finally(() => (promise = null));
    }
  } catch (err) {
    console.log(err);
    isError = true;
    if (err instanceof Error) {
      error = err.message;
    }

    error = "Unknown error";
  }

  return {
    data,
    isError,
    error,
  };
}

export default lockPromise;
