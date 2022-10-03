import { useAuth0 } from "@auth0/auth0-react";
/**
 * Logging our redirects your users to the Auth0
 * logout endpoint https://YOUR_DOMAIN/v2/logout
 */

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};
