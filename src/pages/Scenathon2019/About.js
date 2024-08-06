import { Container } from "react-bootstrap";
import AccordionToggle from "../../components/AccordionToggle";
import BannerTitle from "../../components/BannerTitle";
import {
  secretariat,
  argentina,
  australia,
  brazil,
  canada,
  china,
  colombia,
  ethiopia,
  finland,
  germany,
  india,
  indonesia,
  malaysia,
  mexico,
  norway,
  russian_federation,
  rwanda,
  south_africa,
  sweden,
  united_kingdom,
  usa,
} from "../../data/collaborators";

const About = () => {
  return (
    <>
      {" "}
      <h1
        style={{
          width: "100%",
          textAlign: "center",
          padding: "32px",
        }}
      >
        Participants
      </h1>
      {/* <BannerTitle title="Participants" /> */}
      <Container>
        <div className="main-content">
          <p>
            {" "}
            <b>Scientific Director:</b> Aline Mosnier (SDSN)
          </p>

          <p>
            {" "}
            <b>Project Directors:</b>Michael Obersteiner (IIASA/University of
            Oxford), Guido Schmidt-Traub (SDSN){" "}
          </p>

          <p>
            {" "}
            FABLE 2020 dashboard designed and lead by Valeria Javalera-Rincon.{" "}
          </p>
        </div>

        <div>
          <h3 className="bg__title p-1 mb-0 text-center">
            The FABLE Scenathon 2020 was organized by:{" "}
          </h3>
          <div className="col-lg-12">
            <div className="col-lg-8 mx-auto">
              <h5 className="bg__secretariat p-2 m-1">Aline Mosnier</h5>
              <h5 className="bg__secretariat p-2 m-1">
                Valeria Javalera-Rincon
              </h5>
              <h5 className="bg__secretariat p-2 m-1">Katya Pérez-Guzman</h5>
              <h5 className="bg__secretariat p-2 m-1">Clara Douzal</h5>
              <h5 className="bg__secretariat p-2 m-1">Rudolf Neubauer</h5>
              <h5 className="bg__secretariat p-2 m-1">
                Fernando Orduña-Cabrera
              </h5>
              <h5 className="bg__secretariat p-2 m-1">Frank Sperling</h5>
              <h5 className="bg__secretariat p-2 m-1">Marcus Thomson</h5>
            </div>
          </div>
        </div>
        <AccordionToggle
          style="bg__title p-1 text-center"
          collaborators={secretariat}
        />
        <h3 className="bg__title pt-4 pb-4 mt-4 mb-4 text-center">
          Participants of the FABLE Scenathon 2020 Country Teams FABLE Country
          Teams:{" "}
        </h3>
        <AccordionToggle collaborators={argentina} />
        <AccordionToggle collaborators={australia} />
        <AccordionToggle collaborators={brazil} />
        <AccordionToggle collaborators={canada} />
        <AccordionToggle collaborators={china} />
        <AccordionToggle collaborators={colombia} />
        <AccordionToggle collaborators={ethiopia} />
        <AccordionToggle collaborators={germany} />
        <AccordionToggle collaborators={finland} />
        <AccordionToggle collaborators={india} />
        <AccordionToggle collaborators={indonesia} />
        <AccordionToggle collaborators={malaysia} />
        <AccordionToggle collaborators={mexico} />
        <AccordionToggle collaborators={norway} />
        <AccordionToggle collaborators={russian_federation} />
        <AccordionToggle collaborators={rwanda} />
        <AccordionToggle collaborators={south_africa} />
        <AccordionToggle collaborators={sweden} />
        <AccordionToggle collaborators={united_kingdom} />
        <AccordionToggle collaborators={usa} />
      </Container>
    </>
  );
};
export default About;
