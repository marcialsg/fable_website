import React from "react";
import styled from "styled-components";
import imagen from "../../assets/Scenathon2020GreenCheecks.svg";
import TableA from "./TableA.js";

const Styles = styled.div`
  .about-container {
    overflow: hidden;
    // padding: 10px 10%;
    align-items: center;
    margin: 0;
    justify-content: space-between;
    padding-bottom: 2em;

    .about-title {
      text-align: left;
      color: #306973;
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 30px;
    }

    .about-content {
      color: #4e4e4e;
      text-align: justify;
      font-size: 15px;
    }
  }

  @media (max-width 1200px) {
  }

  @media (max-width 992px) {
  }

  @media (max-width: 768px) {
    .about-title {
      font-size: 15px;
    }

    .about-content {
      font-size: 5px;
    }
  }
  @media (max-width 576px) {
    .about-title {
      font-size: 5px;
    }

    .about-content {
      font-size: 3px;
    }
  }
`;

const About1 = (props) => {
  return (
    <Styles>
      <div className="about-container" ref={props.aboutRef}>
        <div className="about-title">
          Food, Agriculture, Biodiversity, Land and <br /> Energy Consortium
        </div>
        <div className="about-content">
          The Food, Agriculture, Biodiversity, Land-Use, and Energy (FABLE)
          Consortium is convened as part of the Food and Land-Use Coalition
          (FOLU). It aims to understand how countries can transition towards
          sustainable land-use and food systems. In particular, we ask how
          countries can collectively meet associated Sustainable Development
          Goals (SDGs) and the objectives of the Paris Agreement. FABLE
          comprises 20 country teams, which develop data and modelling
          infrastructure to promote ambitious, integrated strategies towards
          sustainable land-use and food systems.
          <br />
          <br />
          The FABLE consortium has applied the Scenathon concept to answer
          questions concerned with sustainability transformations of food and
          land use systems. Within this setting, the Scenathon process allows
          country teams to progressively align national pathways with the global
          FABLE targets and to balance trade flows.
        </div>
        <br />
        <br />
        <div className="about-title">{props.title}</div>
        <div className="about-content">
          {" "}
          <a
            href="https://www.foodandlandusecoalition.org/fable/ "
            target="_blank"
            rel="noreferrer"
          >
            In its second global report
          </a>
          , the FABLE Consortium presents thoroughly revised pathways towards
          sustainable land-use and food systems for 20 countries. We show that
          integrated strategies across food production, biodiversity, climate,
          and diets can meet the objectives of the Paris Agreement and the
          Sustainable Development Goals (SDGs). Our iterative Scenathon approach
          complements prevailing top-down global models, which tend to lack the
          granularity and local buy-in needed for policy engagement. FABLE
          country teams have improved and deepened the analysis, particularly on
          biodiversity, climate impacts, and freshwater use. We now consider
          current trends pathways that describe business as usual and
          sustainable pathways to meet ambitious sustainability objectives. Our
          work is informed by consultations with governments, business, civil
          society organizations, and other scientists on how to align
          development strategies, including climate and biodiversity strategies,
          with the objectives of the Paris Agreement and the SDGs. The pathways
          described in the 2020 report will help tackle the hidden costs of
          today’s food system described by the Food and Land-Use Coalition.
          FABLE pathways are developed by each FABLE country team in four steps
          (Figure). First, country teams adopt global targets (Table A) covering
          the entire land-use system that are consistent with the SDGs and the
          Paris Agreement. Second, teams develop national pathways using locally
          appropriate modeling tools. To this end, the FABLE Consortium has
          developed a simplified FABLE Calculator to complement more complex
          models. Third, in an iterative process (“Scenathon”) country teams
          adjust their assumptions and pathways to ensure balanced trade flows
          and to aim towards achieving the global FABLE Targets. Throughout the
          process, country teams engage stakeholders to review assumptions, seek
          technical advice, and build a shared vision of how to transform
          landuse and food systems.
          <br />
          <br />
          <img
            src={imagen}
            alt="scn2020"
            width="100%"
            height="700"
            className="imagen20201111"
          />{" "}
          <br />
          <br />
          <TableA />
          {/* <img src={imagen2} alt="tablaA" width="700" height="700"  className="TablaA" /> <br/><br/> */}
          This year, FABLE has made several improvements to the design of
          national pathways. First, all countries now present at least one
          Current Trends Pathway and one Sustainable Pathway to assess how far
          and how quickly improved policies can make land-use and food systems
          sustainable. Second, we have broadened the scope of the analysis to
          include freshwater, future climate-change impacts on crops, a richer
          discussion of biodiversity targets, and a more detailed trade
          analysis. Third, we have incorporated feedback on last year’s
          pathways. As a result, we now have greater confidence in the
          robustness of the FABLE pathways The Scenathon 2020 interactive
          dashboard allows you to navigate and query the data of the Scenathon
          2020. For more explanation please read our{" "}
          <a
            href="https://www.foodandlandusecoalition.org/fable/ "
            target="_blank"
            rel="noreferrer"
          >
            2020 report.
          </a>
        </div>
      </div>
    </Styles>
  );
};
export default About1;
