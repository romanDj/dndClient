import "./styles/main.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import React from "react";
import ReactDOM from "react-dom";
import Button from "./ui/Button";
import Navigation from "./components/Navigation";

/**
 * ui kit
 */
ReactDOM.render((
    <>
        <Navigation>
                <div className="ui_card">
                    <div className="ui_kit">
                        <p>Hello!</p>
                        <Button text="Basic" type="basic" click={()=>{
                            console.log("click callback");}}/>
                        <Button text="Secondary" type="secondary" click={()=>{
                            console.log("click callback");}}/>
                    </div>
                </div>
        </Navigation>
    </>
), document.getElementById('root'));