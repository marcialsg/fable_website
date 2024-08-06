import React from "react";

const zenodoComponent = (scenathonYear) => {
  let zenodoRef = {
    doi: "https://doi.org/10.5281/zenodo.",
    url: "https://zenodo.org/badge/DOI/10.5281/zenodo.",
  };

  switch (scenathonYear) {
    case 2019:
      zenodoRef.doi = zenodoRef.doi + "7969575";
      zenodoRef.url = zenodoRef.url + "7969575.svg";
      break;
    case 2020:
      zenodoRef.doi = zenodoRef.doi + "7969717";
      zenodoRef.url = zenodoRef.url + "7969717.svg";
      break;
    case 2021:
      zenodoRef.doi = zenodoRef.doi + "7969744";
      zenodoRef.url = zenodoRef.url + "7969744.svg";
      break;
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <a>Download {scenathonYear} database:</a>
      </div>
      <div className="col-md-6">
        <a href={zenodoRef.doi}>
          <img src={zenodoRef.url} alt="DOI"></img>
        </a>
      </div>
    </div>
  );
};

const Downloads = () => {
  return (
    <>
      <div>
        <div className="main-content">

        <h1>Scenathon databases</h1>
          {zenodoComponent(2019)}
          {zenodoComponent(2020)}
          {zenodoComponent(2021)}
        </div>
      </div>
    </>
  );
};

export default Downloads;
