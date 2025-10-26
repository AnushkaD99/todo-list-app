import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const runThunk = useCallback(
    async (arg) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await dispatch(thunk(arg)).unwrap();
        return { success: true, response: response };
      } catch (err) {
        console.log(err);

        const errorCode = err.code || 500;
        const errorMessage = err.message || "Internal Server Error";
        const customCode = err?.name || "Axios Error";

        const validatedError = {
          code: errorCode,
          message: errorMessage,
          customCode: customCode,
        };

        setError(validatedError);

        if (err.code === 500 || err.code === "500") {
          navigate("/server-error");
          return { success: false, error: validatedError };
        }

        return { success: false, error: validatedError };
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, thunk, navigate]
  );

  return [runThunk, isLoading, error];
}