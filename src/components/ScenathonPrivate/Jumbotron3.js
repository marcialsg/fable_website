import React from 'react';
import { Jumbotron as Jumbo } from 'react-bootstrap';
import styled from 'styled-components';
import Banner3 from '../../assets/banner_3.png';

const Styles = styled.div`
   
    .jumbo3{
        background: url(${Banner3});
        background-size: cover;
        color: #ccc;
        position: absoulte;
        background-position:center ;
        margin-top:20px;
    }
    .overlay{
        background-color: #000;
        opacity:0.6;
        position: absolute;
        top:0;
        left: 0;
        bottom: -5;
        right: 0;
        
    }
    
    @media(max-width 1200px){

    }

    @media(max-width 992px){
        .jumbo3{
            height: 40vh;
        }
    }

    
    @media( max-width: 768px){
       .jumbo3{
           height: 125px;
       }
    }
    @media (max-width 576px){
        .jumbo3{
            height: 32px;
        }
    }
    `;


const Jumbotron3 = () => {
    return (

        <Styles>
            <Jumbo fluid className="jumbo3">
                <div className="overlay"></div>
            </Jumbo>
        </Styles>
    )
};
export default Jumbotron3;