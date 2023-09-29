import { useEffect } from "react";
import {
  createSearchParams,
  URLSearchParamsInit,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function useSyncQueryParams(params?: URLSearchParamsInit) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const serializedSearchParams = createSearchParams(params);

  useEffect(() => {
    setSearchParams(serializedSearchParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString(), serializedSearchParams.toString()]);

  return { navigate, location };
}
