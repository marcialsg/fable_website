import React from 'react';
import styled from 'styled-components';
import TableB from './TableB.js';

const Styles= styled.div`

.about-container{
    overflow:hidden;
    align-items:center;
    margin:0;
    
    justify-content:space-between;
    width:100%;
    
    .about-title{
        text-align:left;
        color:#306973;
        font-size:32px;
        font-weight: bold;
        margin-bottom:30px;
    }
    
    .about-content{
        color:#4E4E4E;
        text-align: justify;
        font-size:15px;
    }
    }
    
    `;

const About2=(props)=>{
    return(

        <Styles>
            <div className="about-container" style={{marginTo: "100px" }}>

            <div className="about-content">Key findings and policy implications Current Trends Pathways lead most countries towards unsustainable land-use and food systems, but through decisive action governments and other stakeholders can meet the related SDGs and objectives of the Paris Agreement. The Sustainable Pathways concurrently meet the objectives related to food security, greenhouse gas emissions, water use, and biodiversity (Table B).</div>
            <div className="about-content">Scenathons were conceived at IIASA as participatory decision-making exercises that integrate models, stakeholders, and technology to collectively solve complex, large-scale multi-objective problems. <br/><br/>
            The Food, Agriculture, Biodiversity, Land, and Energy (FABLE) Consortium has applied the Scenathon concept to answer questions concerned with sustainability transformations of food and land use systems. Within this setting, the Scenathon process allows country teams to progressively align national pathways with the global FABLE targets and to balance trade flows.
            <br/><br/>

            <TableB/>

            </div>
            <br/><br/>

            <div className="about-title"  ref={props.abouTwo}>About the Scenathon 2020</div>
            <div className="about-content">The Food, Agriculture, Biodiversity, Land-Use, and Energy (FABLE) Consortium is convened as part of the Food and Land Use Coalition (FOLU). It is led by the International Institute for Applied Systems Analysis (IIASA) and the UN Sustainable Development Solutions Network (SDSN), working closely with EAT, the Potsdam Institute for Climate Impact Research (PIK), and many other institutions. The results presented in this website are the results of the FABLE Scenathon 2020. were jointly prepared by the members of the FABLE Consortium.  <br/><br/>

            <b>Scientific Director</b>: Aline Mosnier (SDSN)  <br/><br/>
<b>Project Directors:</b> Michael Obersteiner (IIASA/University of Oxford), Guido Schmidt-Traub (SDSN)  <br/><br/>
FABLE 2020 dashboard designed and lead by Valeria Javalera-Rincon.  <br/><br/>
The FABLE Scenathon 2020 was organized by:
Aline Mosnier, Valeria Javalera-Rincon, Fernando Orduña-Cabrera, Rudolf Neubauer, Katya Pérez-Guzmán, Clara Douzal, Frank Sperling and Marcus Thomson.
FABLE Secretariat: Fabrice DeClerck (EAT/Stockholm Resilience Centre), Maria Diaz (SDSN), Clara Douzal (SDSN), Gaëlle Espinosa (SDSN), Marine Formentini (SDSN), Camille François (SDSN), Valeria Javalera-Rincon, Sarah Jones (Bioversity International), Micheline Kahn (SDSN), Rudolf Neubauer (IIASA), Fernando Orduña-Cabrera (IIASA), Katya Pérez-Guzmán (IIASA, Frank Sperling (IIASA), Marcus Thomson (IIASA), Piero Visconti (IIASA) 
Participants of the FABLE Scenathon 2020
Country Teams 
FABLE Country Teams: Argentina: Federico Frank (INTA EEA Anguil, UNLPam), Ximena Sirimarco (INTAUNMDP), María Paula Barral (UNMdP, INTA EEA Balcarce), Pablo García Martinez (Centro Atómico Bariloche, Consejo Nactional de Investigaciones Científicas y Técnicas), Sebastián Villarino (UNMdP, INTA EEA Balcarce, Consejo Nacional de Investigaciones Científicas y Técnicas), Adrian Monjeau (Consejo Nacional de Investigaciones Científicas y Técnicas, Fundación Bariloche); Australia: Raymundo Marcos-Martinez (Commonwealth Scientific and Industrial Research Organisation), Javier Navarro Garcia (Commonwealth Scientific and Industrial Research Organisation), Michalis Hadjikakou (Deakin University), Brett Bryan (Deakin University), Romy Zyngier (ClimateWorks Australia), Eli Court (ClimateWorks Australia); Brazil: Wanderson Costa (National Institute for Space Research), Marluce Scarabello (National Institute for Space Research), Aline Cristina Soterroni (National Institute for Space Research, IIASA), Fernando Ramos (National Institute for Space Research); Canada: René Reyes (University of British Columbia, Instituto Forestal de Chile), Hisham Zerriffi (University of British Columbia), Avery Maloney (University of British Columbia); China: Xinpeng Jin (Center for Agricultural Resources Research, Chinese Academy of Sciences), Zhaohai Bai (Center for Agricultural Resources Research, Chinese Academy of Sciences), Hao Zhao (Center for Agricultural Resources Research, Chinese Academy of Sciences), Xiaoxi Wang (China Academy for Rural Development, Zhejiang University), Jinfeng Chang (College of Environmental And Resource Sciences, Zhejiang University), Fangyuan Hua (Peking University), Lin Ma (Center for Agricultural Resources Research, Chinese Academy of Sciences); Colombia: John Chavarro (Pontificia Universidad Javeriana), Andrés Peña (Pontificia Universidad Javeriana), Armando Sarmiento (Pontificia Universidad Javeriana), Juan Benavides (Pontificia Universidad Javeriana), Efraín Dominguez (Pontificia Universidad Javeriana); Ethiopia: Kiflu Gedefe Molla (Policy Studies Institute), Firew Bekele Woldeyes (Policy Studies Institute); Germany: Jan Steinhauser (Universität Hamburg), Uwe Schneider (Universität Hamburg); Finland: Heikki Lehtonen Pathways to Sustainable Land-Use and Food Sytems. 2020 FABLE Report • 5 (Natural Resources Institute Finland), Janne Rämö (Natural Resources Institute Finland); India: Chandan Kumar Jha (Indian Institute of Management Ahmedabad), Vartika Singh (Indian Institute of Management Ahmedabad, Humboldt-Universität zu Berlin, IFPRI), Satyam Saxena (Indian Institute of Management Ahmedabad), Ranjan Kumar Ghosh (Indian Institute of Management Ahmedabad), Miodrag Stevanović (PIK), Jan Philipp Dietrich (PIK), Isabelle Weindl (PIK), Benjamin Leon Bodirsky (PIK), Hermann LotzeCampen (PIK, Humboldt-Universität zu Berlin), Alexander Popp (PIK); Indonesia: Habiburrachman A H Fuad (Research Center for Climate Change, Universitas Indonesia), Nurul L. Winarni (Research Center for Climate Change, Universitas Indonesia), Sonny Mumbunan (Research Center for Climate Change, Universitas Indonesia), Jatna Supriatna (Research Center for Climate Change, Universitas Indonesia), Nurlaely Khasanah (Research Center for Climate Change, Universitas Indonesia), Rizaldi Boer (Climate Risk and Opportunity Management in Southeast Asia Pasific Institut Pertanian Bogor), Gito Immanuel (Climate Risk and Opportunity Management in Southeast Asia Pasific, Institut Pertanian Bogor), Lukytawati Anggraeni (Climate Risk and Opportunity Management in Southeast Asia Pasific, Institut Pertanian Bogor), Annuri Rosita (Climate Risk and Opportunity Management in Southeast Asia Pasific, Institut Pertanian Bogor); Malaysia: Wai Sern Low (Jeffrey Sachs Center on Sustainable Development, Sunway University), Andrew Chiah Howe Fan (Jeffrey Sachs Center on Sustainable Development, Sunway University), Jeremy Jiang Shen Lim (Jeffrey Sachs Center on Sustainable Development, Sunway University), Danesh Prakash Chacko (Jeffrey Sachs Center on Sustainable Development, Sunway University), Jit Ern Chen (Jeffrey Sachs Center on Sustainable Development, Sunway University), Chun Sheng Goh (Jeffrey Sachs Center on Sustainable Development, Sunway University); Mexico: Charlotte E. Gonzalez-Abraham (Independent Contractor), Gordon McCord (University of California San Diego), Marcela Olguin (Independent Contractor), Sonia Rodríguez Ramírez (INSP), Juan Manuel Torres Rojo (CIDE), Arturo Flores (INP), Camilo Alcantara Concepcion (Universidad de Guanajuato), Irene Pisanty (UNAM), Gerardo Bocco (UNAM); Norway: Anne Sophie Daloz (CICERO), Robbie Andrew (CICERO), Bob van Oort (CICERO); Russian Federation: Anton Strokov (Russian Presidential Academy of National Economy and Public Administration), Vladimir Potashnikov (Russian Presidential Academy of National Economy and Public Administration), Oleg Lugovoy (Russian Presidential Academy of National Economy and Public Administration); Rwanda: Dative Imanirareba (Uganda Martyrs University), Fidèle Niyitanga (University of Rwanda), François Xavier Naramabuye (University of Rwanda); South Africa: Odirilwe Selomane (Centre for Complex Systems in Transition, Stellenbosch University), Belinda Reyers (Future Africa, University of Pretoria; Stockholm Resilience Centre); Sweden: Shyam Basnet (Stockholm Resilience Center), Ingo Fetzer (Stockholm Resilience Centre), Torbjörn Jansson (Swedish University of Agricultural Sciences), Line Gordon (Stockholm Resilience Centre), Elin Röös (Swedish University of Agricultural Sciences), Serina Ahlgren (Research Institute of Sweden), Amanda Wood (Stockholm Resilience Center), Anna Woodhouse (Research Institute of Sweden); United Kingdom: Alison Smith (University of Oxford), Nicholas Leach (University of Oxford), Paula Harrison (UK Centre for Ecology & Hydrology), Saher Hasnain (University of Oxford), Charles Godfray (University of Oxford), Jim Hall (University of Oxford), Michael Obersteiner (University of Oxford); United States: Grace Wu (The Nature Conservancy and the National Center for Ecological Analysis and Synthesis), Justin Baker (RTI International and NC State University), Gordon McCord (University of California San Diego), Chris Wade (RTI International).

 <br/><br/>
            </div>
            </div>

        </Styles>
    )
};
export default About2;