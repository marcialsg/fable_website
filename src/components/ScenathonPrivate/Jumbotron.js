import React from 'react';
import { Jumbotron as Jumbo } from 'react-bootstrap';
import styled from 'styled-components';
import Banner from '../../assets/home.png';
import IIASA_LOGO_WHITE from '../../assets/IIASA_LOGO_WHITE.png';
import SDSN_LOGO_WHITE from '../../assets/SDSN_LOGO_WHITE.png';
import FoodAndLand_LOGO_WHITE from '../../assets/FoodAndLand_LOGO_WHITE.png';
const Styles = styled.div`
    .bann{
       color: white;
       top:5;
       text-align: left;
       font-size:100px;
       text-shadow: 1px .5px 2px #000000;
    }

    .banner-logo{
        padding-right:1em;
        padding-bottom: 1em;
    }
    .jumbo{
        background: url(${Banner});
        background-size: cover;
        color: #ccc;
        height: 260px;
        position: relative;
        z-index: -2;
        margin-bottom:20px;
    }
    .overlay{
        background-color: #000;
        opacity:0.6;
        position: absolute;
        top:0;
        left: o;
        bottom: -5;
        right: 0;
        z-index: -1;
    }
    
    @media(max-width 1200px){
        .jumbo{
            background: url(${Banner});
            background-size: cover;
            color: #ccc;
            height: 300px;
            position: relative;
            z-index: -2;
        }
    }

    @media(max-width 992px){
        .bann{
            font-size:75px;
         }
         .jumbo{
             height: 300px;
         }
    }

    
    @media( max-width: 768px){
        .bann{
            font-size:75px;
         }
         .jumbo{
             height: 270px;
         }
    }
    @media (max-width 576px){
        .bann{
            font-size:10px;
         }
         .jumbo{
             height: 70px;
         }
    `;


const Jumbotron = (props) => {

    return (
        <div className="banner-content">
            <Styles ref={props.home}>
                <Jumbo fluid className="jumbo p-0 m-0 d-flex align-items-end">
                    <div className="col-lg-12 d-flex justify-content-around align-items-end">
                        <div className="col-lg-4">
                            <h3 className="bann" data-rh="tooltip 1">Fable</h3>
                            <h3 className="bann" data-rh="tooltip 1">Scenathon</h3>
                        </div>

                        <div className="banner-container" >
                            <img
                                alt=""
                                className="banner-logo"
                                id="IIASA_LOGO"
                                src={IIASA_LOGO_WHITE}
                            />
                            <img
                                alt=""
                                src={SDSN_LOGO_WHITE}
                                className="banner-logo"
                                id="SDSN_LOGO"
                            />
                            <img
                                alt=""
                                src={FoodAndLand_LOGO_WHITE}
                                className="banner-logo"
                                id="FoodAndLand_LOGO"
                            />
                        </div>
                    </div>
                </Jumbo>
            </Styles>
        </div>

    )
};
export default Jumbotron;