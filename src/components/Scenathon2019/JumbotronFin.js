import React from 'react';
import styled from 'styled-components';
import IIASA_LOGO_COLOR from '../../assets/IIASA_LOGO.png';
import SDSN_LOGO_COLOR from '../../assets/SDSN_LOGO.png';
import {
  v as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import FoodAndLand_LOGO_COLOR from '../../assets/FoodAndLand_LOGO.png';
import fable_logo from '../../assets/fable_logo.png';
import FB_Logo from '../../assets/logofb_green.png';
import IG_Logo from '../../assets/logoinsta_green.png';
import TW_Logo from '../../assets/logotwitter_green.png';

const Styles = styled.div`
  .logo{
      width:200px;    
    }

        #instagram-logo{
      margin-top:4px;
      width:40px;
    }

    #twitter-logo{
      margin-top:1px;
      width:40px;
    }
 .socialmedia-logo{
          margin-right:20px;
          width:40px;
        }


    .footer-container{
  overflow:hidden;
    background-color: transparent;
    padding: 0 13%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin: 0;
    margin-top:25px;
    
    


  .logo-container{
    margin:0;
    max-width:100%;
    max-height:100%;
    .logo-container-1{
      display:flex;
      margin:0;
    }
    .logo-container-2{
      margin 0;
    }
    
  }


  .contact-container{
    max-width:100%;
    max-height:100%;
    margin-left:70px;
      .email{
        font-size:15px;
        color: #849F47 !important;
        text-decoration: none;
      }

      .socialmedia-container{
        display:flex;
        margin-bottom:15px;
        margin-left:5px;
      }
      .copyright{
        color:#4E4E4E;
        font-size:15px;
      }
  }
}

@media(max-width 1200px){

}

@media(max-width 992px){
   
}


@media( max-width: 768px){
   
}
@media (max-width 576px){
  .logo-container{
    width:25px;
  }
}

  
   `;


const JumbotronFin = () => {
  return (
    <Styles>
      <div className="footer-container">
        <div className="logo-container">
          <div className="logo-container-1">
            <img className="logo" src={FoodAndLand_LOGO_COLOR} alt="" />
            <img className="logo" src={SDSN_LOGO_COLOR} alt="" />
          </div>
          <div className="logo-container-2">
            <img className="logo" src={IIASA_LOGO_COLOR} alt="" />
            <img className="logo" src={fable_logo} alt="" />
          </div>
        </div>

        <div className="contact-container">
          <p className="email"><a href="mailto:info@foodandlandandusecoalition.org">info@foodandlandandusecoalition.org</a></p>
          <div className="socialmedia-container">
            <a href="https://www.instagram.com/folucoalition/"><img id="twitter-logo" className="socialmedia-logo" src={TW_Logo} alt="" /></a>
            <a href="https://www.facebook.com/IIASA"><img className="socialmedia-logo" src={FB_Logo} alt="" /></a>
            <a href="https://www.instagram.com/folucoalition/"><img id="instagram-logo" className="socialmedia-logo" src={IG_Logo} alt="" /></a>
          </div>
          <p className="copyright">© Copyright 2020 Fable Scenathon. All rights
            reserved. Privacy policy.</p>
        </div>
      </div>
    </Styles>

  );
};

export default JumbotronFin;