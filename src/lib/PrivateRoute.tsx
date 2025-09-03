import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
    isAuthenticated: boolean;
    path: string;
    exact?: boolean;
    component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        render={() =>
            isAuthenticated ? <Component /> : <Redirect to="/SignIn" />
        }
    />
);

export default PrivateRoute;
