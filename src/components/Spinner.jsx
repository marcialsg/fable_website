import React from 'react';
import Spinner from "react-bootstrap/Spinner";
import sdgwheel from '../assets/sdg-wheel.png';
import '../css/index.css';
function SpinnerScenathon(props) {

    return (
        <>
            <img className="sdg-spinner" src={sdgwheel} alt="" />
        </>

        // <Spinner
        //     style={{
        //         flex: 1,
        //         marginTop: 240,
        //         marginLeft: props.marginLeft,
        //         justifyContent: "center",
        //         alignItems: "center",
        //         alignSelf: "center",
        //     }}
        //     animation="border"
        //     variant="success"
        // />
    )
}

export default SpinnerScenathon;