import { useCallback, useEffect, useState } from "react";

type ApiResult<T> = {
  data: T | null;
  error: string | null;
  // Which request this result came from, so we know if it is out of date
  request: (() => Promise<T>) | null;
  attempt: number;
};

// Reusable hook that runs an API function and keeps track of
// the data, the loading state, and any error message.
// The fetch function should be wrapped in useCallback by the screen
// so it only runs again when its inputs change.
export function useApiData<T>(fetchFunction: () => Promise<T>) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<ApiResult<T>>({
    data: null,
    error: null,
    request: null,
    attempt: 0,
  });

  useEffect(() => {
    // If the inputs change before the request finishes we ignore the old result
    let ignore = false;

    fetchFunction()
      .then((data) => {
        if (!ignore) setResult({ data, error: null, request: fetchFunction, attempt });
      })
      .catch((err: Error) => {
        if (!ignore) {
          setResult({
            data: null,
            error: err.message || "Something went wrong",
            request: fetchFunction,
            attempt,
          });
        }
      });

    return () => {
      ignore = true;
    };
  }, [fetchFunction, attempt]);

  // We are still loading if the saved result is from an older request
  const loading = result.request !== fetchFunction || result.attempt !== attempt;

  const reload = useCallback(() => setAttempt((count) => count + 1), []);

  return { data: result.data, error: loading ? null : result.error, loading, reload };
}
