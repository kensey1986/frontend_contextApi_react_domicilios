
import React, { useContext } from "react";
import { DataContext } from "../context/Context";
import { Redirect, Route } from 'react-router-dom'

export const FreeRoute = ({
   component: Component,
   ...rest
}) => {
    const {logeado} = useContext(DataContext);
    return (
        <Route { ...rest }
            component={ (props) => (
                ( !logeado )
                    ? <Component { ...props } />
                    : <Redirect to="/domicilio" />
            )} 
        />
    )
}

export default  FreeRoute;

