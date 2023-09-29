import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";

export default function useRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  const back = () => navigate(-1);

  const onRedirect = (path?: string, options?: NavigateOptions) => () =>
    path && navigate(path, options);

  const redirect = (path?: string) => path && navigate(path);

  const onRedirectWithState = (path?: string, options?: NavigateOptions) => () =>
    path &&
    navigate(path, {
      ...options,
      state: {
        ...options?.state,
        background: location,
      },
    });

  return { back, onRedirect, redirect, onRedirectWithState };
}
