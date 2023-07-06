/* This component is to define privateRoute in which you cannot go when keycloak is not initialized*/
import { useKeycloak } from "@react-keycloak/web";
import LoadingSpinner from "./LoadingSpinner";


const PrivateRoute = ({ children }) => {
    const { keycloak , initialized } = useKeycloak();
    const isLoggedIn = keycloak.authenticated;
    /* If keycloak is initialized it returns children, 
       inside each "childen" page we are making checks for authenticated or not User */
    if(initialized){
        return isLoggedIn ? children : children;
    }
    /* If keycloak is not initialized it returns LoadingSpinner */
    else{
        return (<LoadingSpinner/>);
    }
};

export default PrivateRoute;