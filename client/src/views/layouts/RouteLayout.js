import React from "react";
import {Route} from "react-router";
import MainLayout from './MainLayout';

const RouteLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <MainLayout>
                <React.Suspense fallback={<p>Loading....</p>}>
                    <Component {...matchProps} />
                </React.Suspense>
            </MainLayout>
        )}/>
    )
};

export {RouteLayout};