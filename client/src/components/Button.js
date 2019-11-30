import React from "react";

function Button(props) {
    return <button
        className={[props.type === "basic" ? "ui_button-basic" : "ui_button-secondary", "ui_button"].join(" ")}
        onClick={props.click}>{props.text}</button>
}

export default Button;