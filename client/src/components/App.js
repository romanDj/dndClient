import React from "react";
import {Route, Switch} from "react-router";

import Scrollbar from "react-scrollbars-custom";
import Navigation from "./Navigation";
import {routes} from  "../routes";

const Missed = React.lazy(() => import("../layouts/Missed"));

/**
 * Возвращает роутеры в зависимости от роли
 */
function App(props) {
    return <Navigation>
        <div className="ui_card">
            <Scrollbar>
                <React.Suspense fallback={<p>Loading....</p>}>
                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.main/>}
                            />
                        ))}
                        <Route component={Missed}/>
                    </Switch>
                </React.Suspense>
            </Scrollbar>
        </div>
    </Navigation>
}

export default App;