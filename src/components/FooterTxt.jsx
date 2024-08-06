import React from 'react';
import { Jumbotron } from 'react-bootstrap';


function FooterTxt(props) {
  return (
    <div>
      <p className="body1Fable" style={{textAlign : 'center', fontWeight: "700", marginTop: "16px"  }}>{props.txt}</p>
    </div>
  )
}
export default FooterTxt;                                                                              