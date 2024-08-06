import React from 'react';
import BannerCustom from '../assets/global.png';
import BannerLifeOnLand from '../assets/netForestNew.png';
import BannerLifeOnLandByCountry from '../assets/coverByCountry.png';
import BiodiversityIMG from '../assets/biodiversity.png';
import ProtectedAreas from '../assets/protectedAreas.png';
import LandCoverNew from '../assets/LandCoverNew.png';
import freshNew from '../assets/freshWaterNew.png';
import ghgnew from '../assets/ghgnew.png';
import ghg2 from '../assets/ghg2.png';
import newFood1 from '../assets/newFood1.png';
import food2 from '../assets/food2.png';

function ComboBoxTradeAdjusment(props) {

    var img = BannerCustom;

    switch (props.img) {

        case "Global Target Summary":
            img = BannerCustom;
            break;
        case "Net Forest Cover Change 1":
            img = BannerLifeOnLand;
            break;
        case "Net Forest Cover Change 2":
            img = BannerLifeOnLandByCountry;
            break;
        case "Biodiversity":
            img = BiodiversityIMG;
            break;
        case "Biodiversity 2":
            img = BiodiversityIMG;
            break;
        case "Protected Areas by Type":
            img = ProtectedAreas;
            break;
        case "Land Cover":
            img = LandCoverNew;
            break;
        case "Fresh Water 1":
            img = freshNew;
            break;
        case "Fresh Water 2":
            img = freshNew;
            break;
        case "Green House Gas":
            img = ghg2;
            break;
        case "Green House Gas 2":
            img = ghgnew;
            break;
        case "Food Energy Intake Per Capita 1":
            img = newFood1;
            break;
        case "Food Energy Intake Per Capita 2":
            img = food2;
            break;
        case "TradeReport":
            img = null;
            break;
   default:break;
    }
    return (
        <div >
            <div >
                <img className="banner" id="banner" src={img} alt="" />
            </div>
        </div>
    )



}

export default ComboBoxTradeAdjusment;