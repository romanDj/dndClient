import React from "react";
import Button from "../../components/Button/Button";

function Home(props) {
    return <div>Главная
        <Button text="Basic" type="basic" click={() => {
            console.log("click callback");
        }}/>
    </div>
}

export default Home;