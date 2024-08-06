import React from "react";
import imgAbout from "../../assets/ImgAbout.jpg";
import BannerTitle from "../../components/BannerTitle";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home2019 from "../Scenathon2019/Home2019";

const HomeAbout = () => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <BannerTitle title="About the Scenathons" /> */}

      <div>
        <div className="full-width">
          <h1
            style={{
              width: "100%",
              textAlign: "center",
              padding: "32px"
            }}
          >
            About the Scenathons
          </h1>

          <div className="main-contentAlt">
            <p>
              <b>
                FABLE Scenathons: An iterative approach to integrate national
                and global scales
              </b>
            </p>
            <p>
              A central purpose of the FABLE Consortium is to ensure consistency
              between the ambition of national pathways and global targets, and
              between the trade projections across national pathways. To achieve
              this, FABLE has built a modelling infrastructure consisting of the
              Scenathon (“Scenario-Marathon”).
            </p>
            <p>
              Scenathons were initially conceived by IIASA as participatory
              decision-making exercises that integrate models, stakeholders, and
              technology to collectively solve complex, large-scale
              multi-objective problems. The FABLE Consortium has applied the
              Scenathon concept to answer questions related to the sustainable
              transformation of food and land-use systems at the national and
              global scales. The Scenathon process allows FABLE country teams to
              progressively align their national pathways with the global FABLE
              targets and to balance trade flows via iterative submissions of
              country pathways.
            </p>
            <p>
              <b>STEP 1:</b>
            </p>
            <p>
              FABLE teams agree on global sustainability targets based on
              scientific literature and policy commitments (Mosnier et al 2022).
            </p>
            <p>
              <b>STEP 2:</b>
            </p>
            <p>
              FABLE teams agree on the broad narratives for the national and
              regional pathways. Usually, FABLE compares the outcomes of at
              least two pathways: a Current Trends (CTs) pathway which depicts a
              low ambition of feasible action towards environmental
              sustainability with a future strongly dependent on current policy
              and historical trends, and a Sustainable pathway which corresponds
              to a stronger national political action toward the achievement of
              global sustainability targets.
            </p>
            <p>
              <b>STEP 3:</b>
            </p>
            <p>
              Local teams develop national quantitative pathways independently,
              and the FABLE Secretariat develops regional quantitative pathways
              to cover all the countries where there is not a FABLE team.
            </p>
            <p>
              <b>STEP 4:</b>
            </p>
            <p>
              FABLE teams submit key input and output data from national and
              regional models and narratives describing modelled pathways
              through the Scenathon online platform.
            </p>
            <p>
              <b>STEP 5:</b>
            </p>
            <p>
              The global database is compiled after the backend applications of
              the online portal automatically compute a set of review quality
              processes.
            </p>
            <p>
              <b>STEP 6:</b>
            </p>
            <p>
              Export quantities from each exporter are proportionally adjusted
              to match global imports for each product and each time step. The
              evolution of total trade volume is driven by countries' and
              regions' assumptions about the evolution of the internal demand
              for each product, while the market share by each exporter does not
              account for changes in the international competitiveness of
              different countries.
            </p>
            <p>
              <b>STEP 7:</b>
            </p>
            <p>
              National and regional pathways are re-computed with the same
              assumptions as in step 1 using newly adjusted export quantities,
              i.e., trade becomes exogenous in the national and regional models
              and updated pathways are reviewed by local researchers.
            </p>
            <p>
              <b>STEP 8:</b>
            </p>
            <p>
              Results on each global target are displayed on the Scenathon
              online dashboard. Depending on the gap between the computed target
              indicators and the global targets after trade adjustment, FABLE
              Consortium members decide if another cycle of national-global
              interactions is needed.
            </p>
            <p>
              <figure>
                <img src={imgAbout}></img>
                <figcaption>
                  Overview of the iterative stepwise FABLE modelling approach to
                  integrate national and global scales: the 'Scenathon'
                  approach. Source: Aline Mosnier et al 2023 Environ. Res. Lett.
                  18 045001.
                </figcaption>
              </figure>
            </p>

            <p>
              <b>Publications</b>
            </p>
            <p>
              Results from previous Scenathons are showcased in a wide range of
              publications led by country teams and the FABLE Secretariat. The
              resulting global databases from all Scenathons are publicly
              available and can be freely downloaded.
            </p>
            <p>
              <ul>
                <li>
                  Mosnier, Aline et al. 2023. “A Decentralized Approach to Model
                  National and Global Food and Land Use Systems.” Environmental
                  Research Letters.
                  http://iopscience.iop.org/article/10.1088/1748-9326/acc044
                  (March 9, 2023).
                </li>
                <li>
                  Basnet, Shyam et al. 2023. “Organic Agriculture in a
                  Low-Emission World: Exploring Combined Measures to Deliver a
                  Sustainable Food System in Sweden.” Sustainability Science
                  18(1): 501–19.
                </li>
                <li>
                  González-Abraham, Charlotte et al. 2023. “Long-Term Pathways
                  Analysis to Assess the Feasibility of Sustainable Land-Use and
                  Food Systems in Mexico.” Sustainability Science 18(1): 469–84.
                </li>
                <li>
                  Jha, Chandan Kumar et al. 2023. “Pathway to Achieve a
                  Sustainable Food and Land-Use Transition in India.”
                  Sustainability Science 18(1): 457–68.
                </li>
                <li>
                  Jones, Sarah K., Adrian Monjeau, Katya Perez-Guzman, and Paula
                  A. Harrison. 2023. “Integrated Modeling to Achieve Global
                  Goals: Lessons from the Food, Agriculture, Biodiversity,
                  Land-Use, and Energy (FABLE) Initiative.” Sustainability
                  Science 18(1): 323–33.
                </li>
                <li>
                  Lehtonen, Heikki, and Janne Rämö. 2023. “Development towards
                  Low Carbon and Sustainable Agriculture in Finland Is Possible
                  with Moderate Changes in Land Use and Diets.” Sustainability
                  Science 18(1): 425–39.
                </li>
                <li>
                  Mosnier, Aline et al. 2023. “A Decentralized Approach to Model
                  National and Global Food and Land Use Systems.” Environmental
                  Research Letters.
                  http://iopscience.iop.org/article/10.1088/1748-9326/acc044
                  (March 9, 2023).
                </li>
                <li>
                  Perez-Guzman, Katya et al. 2023. “Sustainability Implications
                  of Rwanda’s Vision 2050 Long-Term Development Strategy.”
                  Sustainability Science 18(1): 485–99.
                </li>
                <li>
                  Rasche, Livia, Uwe A. Schneider, and Jan Steinhauser. 2023. “A
                  Stakeholders’ Pathway towards a Future Land Use and Food
                  System in Germany.” Sustainability Science 18(1): 441–55.
                </li>
                <li>
                  Smith, Alison C. et al. 2023. “Sustainable Pathways towards
                  Climate and Biodiversity Goals in the UK: The Importance of
                  Managing Land-Use Synergies and Trade-Offs.” Sustainability
                  Science 18(1): 521–38.
                </li>
                <li>
                  Wang, Xiaoxi et al. 2023. “Reforming China’s Fertilizer
                  Policies: Implications for Nitrogen Pollution Reduction and
                  Food Security.” Sustainability Science 18(1): 407–20.
                </li>
                <li>
                  Wu, Grace C. et al. 2023. “Contributions of Healthier Diets
                  and Agricultural Productivity toward Sustainability and
                  Climate Goals in the United States.” Sustainability Science
                  18(1): 539–56.
                </li>
                <li>
                  Zerriffi, Hisham, Rene Reyes, and Avery Maloney. 2023.
                  “Pathways to Sustainable Land Use and Food Systems in Canada.”
                  Sustainability Science 18(1): 389–406.
                </li>
                <li>
                  Mosnier, Aline et al. 2022. “How Can Diverse National Food and
                  Land-Use Priorities Be Reconciled with Global Sustainability
                  Targets? Lessons from the FABLE Initiative.” Sustainability
                  Science. https://link.springer.com/10.1007/s11625-022-01227-7
                  (October 7, 2022).
                </li>
                <li>
                  Navarro Garcia, Javier et al. 2022. “Multi-Target Scenario
                  Discovery to Plan for Sustainable Food and Land Systems in
                  Australia.” Sustainability Science.
                  https://doi.org/10.1007/s11625-022-01202-2 (September 12,
                  2022).
                </li>
                <li>
                  Jha, Chandan Kumar et al. 2022. “The Role of Food and Land Use
                  Systems in Achieving India’s Sustainability Targets.”
                  Environmental Research Letters 17(7): 074022.
                </li>
                <li>
                  Zhao, Hao et al. 2021. “China’s Future Food Demand and Its
                  Implications for Trade and Environment.” Nature Sustainability
                  4(12): 1042–51.
                </li>
              </ul>
            </p>
            <p>
              <b>FABLE Policy Briefs & Global Reports</b>
            </p>
            <p>
              <ul>
                <li>
                  FABLE (2022). National food and land mitigation pathways for
                  net zero. FABLE Policy Brief. Sustainable Development
                  Solutions Network (SDSN), Paris.
                </li>
                <li>
                  FABLE (2022). Pathways for food and land systems to contribute
                  to global biodiversity conservation. FABLE Policy Brief.
                  Bioversity International and SDSN.
                </li>
                <li>
                  FABLE (2021). Environmental and agricultural impacts of
                  dietary shifts at global and national scales. FABLE Policy
                  Brief July 2021. Paris: Sustainable Development Solutions
                  Network (SDSN).{" "}
                </li>
                <li>
                  FABLE (2020). Pathways to Sustainable Land-Use and Food
                  Systems. 2020 Report of the FABLE Consortium. Laxenburg and
                  Paris: International Institute for Applied Systems Analysis
                  (IIASA){" "}
                </li>
                <li>
                  FABLE (2019). Pathways to Sustainable Land-Use and Food
                  Systems. 2019 Report of the FABLE Consortium. Laxenburg and
                  Paris: International Institute for Applied Systems Analysis
                  (IIASA) and Sustainable Development Solutions Network (SDSN).
                </li>
              </ul>
            </p>
          </div>
        </div>
        <br />
      </div>
    </>
  );
};
export default HomeAbout;
