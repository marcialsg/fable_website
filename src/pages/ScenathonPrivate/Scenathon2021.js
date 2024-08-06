import React from 'react';
import '../../css/App.css';
import Navbar from "../../components/Navbar";
import Jumbotron from '../../components/Scenathon2021/Jumbotron'
import Jumbotron3 from '../../components/Scenathon2021/Jumbotron3'
import JumbotronFin from '../../components/Scenathon2021/JumbotronFin';
import 'react-hint/css/index.css';
import CookieDisclaimer from 'react-cookie-disclaimer';


const App = () => {
  console.groupEnd();
  const references = {

    fable: React.createRef(),
    scenathon: React.createRef(),
    home: React.createRef(),
  }

  return (
    <React.Fragment>

      <CookieDisclaimer
        background='#306973'
        bottomPosition={true}
        closeIconSize={60}
        closeIconPositionTop={false}
        color='white'
        cookiePolicyName='Cookie Policy'
        cookiePolicyText='By continuing to use the service, you agree to our'
        text='This website uses cookies to improve service.' />

      {/*<CookieDisclaimer2 />*/}

      <Jumbotron home={references.home} />

      <div className="Nav">
        <Navbar references={references} />
      </div>


      <div id="Jumbotron_3" >
        <Jumbotron3 />
      </div>
      <div id="JumbotronFin" data-rh="Copyright" data-rh-at="top">
        <JumbotronFin />
      </div>


    </React.Fragment>
  )
};
export default App;
