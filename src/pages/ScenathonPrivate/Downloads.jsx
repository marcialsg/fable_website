import React from 'react';
import Modal from 'react-bootstrap/Modal'
import map from '../../assets/fable_pathways1.png';
import mapHD from '../../assets/imgScenathon2020.PNG';
import li1 from '../../assets/list1.png';
import li2 from '../../assets/list2.png';
import li3 from '../../assets/list3.png';
import li4 from '../../assets/list4.png';
import BannerTitle from '../../components/BannerTitle';


const Downloads = () => {

    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <>
            <BannerTitle title="Scenathon databases" />
            <div>
                <div className="full-width">
                    <div className="main-content">
                        <p>
                    <a href="https://storage.googleapis.com/scenathon-uploads/scenathon2020/scenathon_db2019.xlsx" target="_blank">Download Scenathon2019 database</a>
                        <br></br>
                    <a href="https://storage.googleapis.com/scenathon-uploads/scenathon2020/scenathon_db2020.xlsx" target="_blank">Download Scenathon2020 database</a>
                   

                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Downloads;