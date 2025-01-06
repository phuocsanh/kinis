import {useAppStore} from 'stores';

export function useIsSignedIn() {
  const isSignedIn = useAppStore(state => state.userToken);
  const userActive = useAppStore(state => state.userActive);
  return isSignedIn && userActive ? true : false;
}

export function useIsSignedOut() {
  const userToken = useAppStore(state => state.userToken);
  const userActive = useAppStore(state => state.userActive);

  return (!userToken && !userActive) || (userToken && !userActive)
    ? true
    : false;
}
