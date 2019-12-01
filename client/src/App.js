import React from "react";
import {Route, Switch} from "react-router";

import Missed from "./views/pages/Missed";
import {RouteLayout} from "./views/layouts/RouteLayout";

const Home = React.lazy(() => import("./views/pages/Home"));
const Spells = React.lazy(() => import("./views/pages/Spells"));
const Bestiary = React.lazy(() => import("./views/pages/Bestiary"));
const MagicItems = React.lazy(() => import("./views/pages/MagicItems"));
const CharacterCreation = React.lazy(() => import("./views/pages/СharacterCreation"));
const CharacterGallery = React.lazy(() => import("./views/pages/СharacterGallery"));

/**
 * Организация роутинга
 */
export default function App(props) {
    return <Switch>
        <RouteLayout exact path="/" component={Home}/>
        <RouteLayout path="/spells" component={Spells}/>
        <RouteLayout path="/bestiary" component={Bestiary}/>
        <RouteLayout path="/magicitems" component={MagicItems}/>
        <RouteLayout path="/charactercreation" component={CharacterCreation}/>
        <RouteLayout path="/charactergallery" component={CharacterGallery}/>
        <Route component={Missed}/>
    </Switch>
}