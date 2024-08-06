import React from 'react';
import Carousel from 'react-elastic-carousel';

function Slider(){
        return(
        <React.Fragment>
            <Carousel itemPadding={[10, 50]} enableAutoPlay autoPlaySpeed={1500} itemsToShow={3} itemsToScroll={3}>
                <h1 style={{backgroundColor: 'white', paddingLeft: '10%', paddingRight: '10%'}}>Lorem ipsum</h1>
                <h1 style={{backgroundColor: 'white', paddingLeft: '10%', paddingRight: '10%'}}>Lorem ipsum</h1>
                <h1 style={{backgroundColor: 'white', paddingLeft: '10%', paddingRight: '10%'}}>Lorem ipsum</h1>
                <h1 style={{backgroundColor: 'white', paddingLeft: '10%', paddingRight: '10%'}}>Lorem ipsum</h1>
                <h1 style={{backgroundColor: 'white', paddingLeft: '10%', paddingRight: '10%'}}>Lorem ipsum</h1>
                <h1 style={{backgroundColor: 'white', paddingLeft: '10%', paddingRight: '10%'}}>Lorem ipsum</h1>
            </Carousel>
        </React.Fragment>
    )
}

export default Slider;