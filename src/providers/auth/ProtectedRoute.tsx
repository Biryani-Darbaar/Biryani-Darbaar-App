import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the auth context
import { RouteComponentProps } from 'react-router-dom';
interface ProtectedRouteProps {
  component: React.ComponentType<RouteComponentProps>;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/SignIn" />
        )
      }
    />
  );
};

export default ProtectedRoute;
