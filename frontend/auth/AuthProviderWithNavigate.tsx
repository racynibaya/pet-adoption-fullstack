import { AppState, Auth0Provider, User } from '@auth0/auth0-react';

type Props = {
  children: React.ReactNode;
};

const AuthProviderWithNavigate = ({ children }: Props) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectURI = import.meta.env.VITE_CALLBACK_URL;

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    console.log(appState);
    console.log(user);
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectURI,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProviderWithNavigate;
