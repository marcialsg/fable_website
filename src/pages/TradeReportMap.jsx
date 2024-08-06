import React from "react";
import { Map, GeoJSON, Tooltip, Circle } from "react-leaflet";
import * as L from "leaflet";

import surfaceAreas from "./../data/countries_surfaceArea.json";
import centros from "./../data/countries_centers.json";
import mapDataTest from "./../data/countries_geometry.json";
import "leaflet/dist/leaflet.css";
import "../css/index.css";

const TradeReportMap = (props) => {

  var corner1 = L.latLng(-90, -200);
  var corner2 = L.latLng(90, 200);
  var bounds = L.latLngBounds(corner1, corner2);
  var color = [];
  var countriesName = [];
  var years = [];
  var data = [];

  var bubbleInfo = [];
  var selectedYear = 2050;
  // var minValue = 999
  // var maxValue = -999
  let dataMap;

  if (props.isGrenHouseTwo && props.isChartOne) {

    dataMap = props.countriesData.chartOne;

  } else if (props.isGrenHouseTwo && !props.isChartOne) {

    dataMap = props.countriesData.charTwo;
  } else {

    dataMap = props.countriesData;
  }

  const converter = () => {

    if (dataMap.datasets !== null) {
      for (const country in dataMap.datasets) {
        color.push(dataMap.datasets[country].backgroundColor);
        countriesName.push(dataMap.datasets[country].label);
        data.push(dataMap.datasets[country].data);
      }
      years = dataMap.labels;
    }
  }

  var R_ASIPAC = [
    "BGD",
    "BRN",
    "KHM",
    "FJI",
    "PYF",
    "JPN",
    "PRK",
    "KOR",
    "LAO",
    "MNG",
    "MMR",
    "NPL",
    "NZL",
    "NCL",
    "PHL",
    "WSM",
    "SLB",
    "LKA",
    "THA",
    "VUT",
    "VNM",
    "TLS",
  ];

  var R_LAM = [
    "BHS",
    "BLZ",
    "BOL",
    "CHL",
    "CRI",
    "CUB",
    "DOM",
    "ECU",
    "SLV",
    "GTM",
    "GUY",
    "HTI",
    "HND",
    "JAM",
    "NIC",
    "PAN",
    "PRY",
    "PER",
    "SUR",
    "TTO",
    "URY",
    "VEN",
  ];

  var R_MECAS = [
    "AFG",
    "DZA",
    "ARM",
    "AZE",
    "EGY",
    "GEO",
    "IRN",
    "IRQ",
    "ISR",
    "JOR",
    "KAS",
    "KWT",
    "KGZ",
    "LBN",
    "LBY",
    "MAR",
    "PAK",
    "SAU",
    "SYR",
    "TJK",
    "TUN",
    "TKM",
    "ARE",
    "UZB",
    "YEM",
    "PSE",
  ];

  var R_AFR = [
    "AGO",
    "BEN",
    "BWA",
    "BFA",
    "CMR",
    "CPV",
    "CAF",
    "TCD",
    "COG",
    "CIV",
    "DJI",
    "GAB",
    "GMB",
    "GHA",
    "GIN",
    "GBN",
    "KEN",
    "LSO",
    "LBR",
    "MDG",
    "MWI",
    "MLI",
    "MRT",
    "MUS",
    "MOZ",
    "NAM",
    "NER",
    "NGA",
    "SEN",
    "SLE",
    "SOM",
    "SWZ",
    "TZA",
    "TGO",
    "UGA",
    "ZMB",
    "ZWE",
  ];

  var R_NEU = [
    "ALB",
    "BLR",
    "BIH",
    "ISL",
    "MKD",
    "MDA",
    "SRB",
    "CHE",
    "TUR",
    "UKR",
  ];

  var R_OEU = [
    "AUT",
    "BEL",
    "BGR",
    "HRV",
    "CYP",
    "CZE",
    "DNK",
    "EST",
    "FRA",
    "GRC",
    "HUN",
    "IRL",
    "ITA",
    "LVA",
    "LTU",
    "LUX",
    "MLT",
    "NLD",
    "POL",
    "PRT",
    "ROU",
    "SVK",
    "SVN",
    "ESP",
  ];

  const addInfoBubbleOnCountry = (index, countryName, props) => {
    var found = false;

    var valor = 0;
    var lat = 0;
    var long = 0;
    var surfaceArea = 0;
    var fullName = "";
    for (const currentValue in years) {
      var currentYear = years[currentValue];
      if (currentYear === selectedYear) {
        valor = parseFloat(data[index][currentValue]);
        found = true;
        if (valor === 0.0) {
          return NaN;
        }
        break;
      }
    }
    if (!found) {
      return;
    }
    found = false;

    for (var center in centros) {
      if (center === countryName) {
        found = true;
        lat = centros[center]["latitude"];
        long = centros[center]["longitude"];
        break;
      }
    }
    if (!found) {
      return;
    }

    for (var srf in surfaceAreas) {
      if (srf === countryName) {
        surfaceArea = surfaceAreas[srf]["area"];
        fullName = surfaceAreas[srf]["country"];
        break;
      }
    }

    bubbleInfo.push([
      valor.toFixed(2),
      lat,
      long,
      surfaceArea,
      fullName,
      countryName,
      increaseBrightness(color[index], 20),
    ]);
    return bubbleInfo[bubbleInfo.length - 1];
  };

  function whereBelongsCountry(countryName) {
    var indexAux = -1;
    var fromRegion = false;
    if (R_AFR.includes(countryName)) {
      indexAux = countriesName.indexOf("R_AFR");
      if (indexAux === -1) {
        indexAux = countriesName.indexOf("SSA");
      }
      fromRegion = true;
    } else if (R_MECAS.includes(countryName)) {
      indexAux = countriesName.indexOf("R_MECAS");
      if (indexAux === -1) {
        indexAux = countriesName.indexOf("NMC");
      }
      fromRegion = true;
    } else if (R_LAM.includes(countryName)) {
      indexAux = countriesName.indexOf("R_LAM");
      if (indexAux === -1) {
        indexAux = countriesName.indexOf("CSA");
      }
      fromRegion = true;
    } else if (R_OEU.includes(countryName)) {
      indexAux = countriesName.indexOf("ROEU");
      if (indexAux === -1) {
        indexAux = countriesName.indexOf("R_OEU");
      }
      fromRegion = true;
    } else if (R_NEU.includes(countryName)) {
      indexAux = countriesName.indexOf("R_NEU");
      if (indexAux === -1) {
        indexAux = countriesName.indexOf("NEU");
      }
      fromRegion = true;
    } else if (R_ASIPAC.includes(countryName)) {
      indexAux = countriesName.indexOf("R_ASIPAC");
      if (indexAux === -1) {
        indexAux = countriesName.indexOf("ASP");
      }
      fromRegion = true;
    } else {
      indexAux = countriesName.indexOf(countryName);
    }
    return [indexAux, fromRegion];
  }

  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ISO_A3;
    var belongs = whereBelongsCountry(countryName);
    var indexAux = belongs[0];
    var fromRegion = belongs[1];
    if (indexAux !== -1) {
      if (fromRegion === false) {
        layer.options.fillColor = color[indexAux];
      }
    }
  };

  function eachCountriesBubbles() {
    for (var country in mapDataTest.features) {
      const countryName = mapDataTest.features[country].properties.ISO_A3;
      var belongs = whereBelongsCountry(countryName);
      var indexAux = belongs[0];
      var fromRegion = belongs[1];
      if (indexAux !== -1) {
        if (fromRegion === false) {
          addInfoBubbleOnCountry(indexAux, countryName);
        }
      }
    }
  }

  function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }

  function increaseBrightness(color, percent) {
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    color = ctx.getImageData(0, 0, 1, 1);
    var r = color.data[0] + Math.floor((percent / 100) * 255);
    var g = color.data[1] + Math.floor((percent / 100) * 255);
    var b = color.data[2] + Math.floor((percent / 100) * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  var countryStyle = {
    fillColor: "#dddddd",
    fillOpacity: 1,
    color: "white",
    weight: 1,
  };

  converter();
  eachCountriesBubbles();

  for (var i in bubbleInfo) {
    bubbleInfo[i][3] = clamp(bubbleInfo[i][3], 0, 1_500_000);
  }

  bubbleInfo.sort(function (a, b) {
    return a[3] < b[3] ? 1 : -1;
  });

  return (
    <div>
      <Map
        key={new Date().getMilliseconds()}
        style={{
          textAlign: "left", height: "45em", width: "100%", display: "flex", flexDirection: "column"
        }}
        minZoom={1}
        zoom={1}
        center={[20, 100]}
        maxBoundsViscosity={1.0}
        maxBounds={bounds}

      >
        {
          < GeoJSON
            style={countryStyle}
            key={new Date().getMilliseconds()}
            data={mapDataTest.features}
            onEachFeature={onEachCountry}
          />
        }
        {Object.keys(bubbleInfo).map((i, index) => {
          var countryName = i;
          var x = bubbleInfo[countryName];
          var sum = x[0];
          var lat = x[1];
          var lon = x[2];
          var radius = x[3];
          var fullName = x[4];
          // var countryCode = x[5]
          var color = x[6];
          return (
            <Circle
              key={countryName + "-bubble"}
              center={[lat, lon]}
              radius={radius}
              fillOpacity={0}
              stroke={false}
              color={color}
            >
              <Tooltip direction="center" offset={[0, 50]} opacity={1}>
                <span>
                  <b>{fullName}: </b>
                  {`${sum}${props.from === "Biodiversity" ? " %" : ""}`}
                </span>
              </Tooltip>
            </Circle>
          );
        })}
      </Map>
    </div >
  );

};
export default TradeReportMap;