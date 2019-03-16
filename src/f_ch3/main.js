import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Main(props) {

    return (
        <div>
            {props.a} + {props.b} = {props.a+props.b}
        </div>
    )
}


document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(<Main a="test" b="board" />, document.getElementById("mount"));
});