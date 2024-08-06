const { getClient } = require("./get-client");
const getScenathonMetaData = require("./ScenathonParametersService");
const fs = require("fs");

const responseProductsApi = (rows, productColumnName) => {
  var scenathon_id_list = [];

  // console.log('rows: ', rows)

  if (rows) {
    rows.forEach((item) => {
      scenathon_id_list.push(item[productColumnName].trim());
    });
  }

  return scenathon_id_list;
};

const responseContriesApi = (rows) => {
  var countries_list = [];

  if (rows) {
    rows.forEach((item) => {
      countries_list.push(item.Country);
    });
  }

  return countries_list;
};

const respondRequestPrivate = async (req) => {
  var responseStatus = 200;
  var responseMessage = "OK";

  // console.log("req.route.path: ", req.route.path);
  req.route.path = req.route.path.replace("private", "");
  // console.log("NEW req.route.path: ", req.route.path);

  const routeStem = req.route.path.substring(1, req.route.path.indexOf(":"));
  // console.log("\n" + routeStem + " route:");
  // console.log(routeStem + " query: ", req.url);

  const combinations = JSON.parse(req.params.combinations).select;

  console.log(routeStem + " COMBINATIONS SELECT: ", combinations);

  try {
    const client = await getClient();

    const cache = await upateDatabaseCache();

    const { ScenathonYear, GraficaType, selected_target, scenathon_id } =
      combinations;

    var query = getQuery(
      routeStem,
      ScenathonYear,
      GraficaType,
      selected_target,
      cache,
      combinations.country
    );


    var arguments = await getArguments(req, cache);

    if (combinations.country != "") {
      arguments.push(combinations.country);
    }

    console.log("QUERY: ", query);
    console.log("ARGUMENTS: ", arguments);
    
    const response = await client.query(query, arguments);

    await client.end();

    responseMessage = { queryResponse: response.rows };

    const products = cache[ScenathonYear]["products"];

    responseMessage = { queryResponse: response.rows, products: products };

    if (ScenathonYear != "2019") {
      const pathways = cache[ScenathonYear]["scenathon_id"];
      const countries =
        cache[ScenathonYear]["scenathon_id"][scenathon_id]["countries"]["iteration" ][arguments[0]];

     
      // console.log("\npathways!!!: ", pathways);

      responseMessage = {
        queryResponse: response.rows,
        pathways,
        countries,
      };

      if (routeStem == "tradeReport") {

        const countries =
        cache[ScenathonYear]["scenathon_id"][scenathon_id]["countries"]["iteration" ][arguments[1]];
        
        // console.log("\n\ntradeReport countries!!!: ", countries);
        
        //TODO: GET TITLE FROM FILE ACCORDING ITS SCENATHON_ID
        responseMessage["countries"] = countries;
        responseMessage["products"] = products;
        responseMessage["titleChart"] = cache[ScenathonYear]["scenathon_id"][scenathon_id]["label"];

        // console.log("responseMessage: ", responseMessage);
      }
    }

    return { responseStatus, responseMessage };
  } catch (err) {
    console.log("CATCHED ERROR: ", err.message);
    responseStatus = 500;
    responseMessage = { error: "Server Error", message: err.message };

    return { responseStatus, responseMessage };
  }
};

const getIterationIndex = async (
  ScenathonYear,
  scenathon_id,
  iteration,
  selectedValue,
  cache
) => {
  var iterationIndex = -1;

  if (ScenathonYear == "2019") {
    if (selectedValue === "after") {
      iterationIndex = "5";
    } else {
      iterationIndex = "50";
    }

    switch (scenathon_id) {
      case "6":
        if (selectedValue === "after") {
          iterationIndex = "4";
        } else {
          iterationIndex = "3";
        }
        break;

      case "5":
        if (selectedValue === "after") {
          iterationIndex = "2";
        } else {
          iterationIndex = "1";
        }
        break;
    }
  } else {
    iterationIndex =
      cache[ScenathonYear]["scenathon_id"][scenathon_id]["iterations"][
        iteration
      ];
  }

  return "" + iterationIndex;
};

const getArguments = async (req, cache) => {
  const routeStem = req.route.path.substring(1, req.route.path.indexOf(":"));

  const {
    Year2,
    product,
    iteration,
    scenathon_id,
    Year,
    ScenathonYear,
    GraficaType,
    selectedValue,
  } = JSON.parse(req.params.combinations).select;

  const iteration_index = await getIterationIndex(
    ScenathonYear,
    scenathon_id,
    iteration,
    selectedValue,
    cache
  );

  var arguments = [iteration_index, scenathon_id];

  // console.log("ScenathonYear: ", ScenathonYear);
  // console.log("routeStem: ", routeStem);

  if (routeStem == "Zerohunger" || routeStem == "Lowdietary") {
    arguments = [iteration_index, scenathon_id, Year];
  }

  if (routeStem == "tradeReport") {
    arguments = [product, iteration_index, scenathon_id];

    if (GraficaType != "0" && ScenathonYear == "2022") {
      arguments = arguments.concat([GraficaType]);
    }
  }

  if (routeStem == "yup") {
    arguments = [scenathon_id, Year2];
  }

  // console.log('ARGUMENTS: ', arguments);
  return arguments;
};

function getQuery(
  route,
  ScenathonYear,
  GraficaType,
  selected_target,
  cache,
  country
) {
  const queries = getRouteQueryDict(
    route,
    ScenathonYear,
    selected_target,
    country
  );

  // console.log('QUERIES: ', queries);
  // console.log('GraficaType: ', GraficaType);

  // console.log('queries[GraficaType]: ', queries[GraficaType]);

  if (
    route == "yup" ||
    route == "Zerohunger" ||
    route == "Lowdietary" ||
    route == "tradeReport" ||
    (route == "gas2" && ScenathonYear == "2022")
  ) {
    return queries;
  } else {
    return queries[GraficaType];
  }
}

function getRouteQueryDict(route, ScenathonYear, selected_target, country) {
  var suffix = "";
  var base = "";
  var prefix1 = "";
  var prefix2 = "";

  switch (route) {
    case "landcover":
      //TODO: CREATE TABLE WITH NAME "indicatorsScen" FOR GENERIC PURPOSES

      var tableName = '"dashboard23"';
      var calcpastureColumnName = "calcpasture";
      var calccroplandColumnName = "calccropland";
      var calcforestColumnName = "calcforest";
      var calcnewforestColumnName = "calcnewforest";
      var calcotherlandColumnName = "calcotherland";
      var calcurbanColumnName = "calcurban";
      var yearColumnName = "year";

      prefix1 =
        'SELECT "' +
        yearColumnName +
        '", ROUND(SUM("' +
        calcpastureColumnName +
        '")::numeric,2) AS "CalcPasture",ROUND(SUM("' +
        calccroplandColumnName +
        '")::numeric,2) AS "CalcCropland",ROUND(SUM("' +
        calcforestColumnName +
        '")::numeric,2) AS "CalcForest",ROUND(SUM("' +
        calcnewforestColumnName +
        '")::numeric,2) AS "CalcNewForest" ,ROUND(SUM("' +
        calcotherlandColumnName +
        '")::numeric,2) AS "CalcOtherLand",ROUND(SUM("' +
        calcurbanColumnName +
        '")::numeric,2) AS "CalcUrban"';

      prefix2 = 'WHERE "iteration"=$1 AND "scenathon_id" = $2';
      suffix =
        'GROUP BY ';

      if (country != "") {
        prefix1 += ' , "Country" ';
        prefix2 += ' AND "Country" = $3';
        suffix += ' "Country", ';
      }

      prefix1 += '  FROM ';
      suffix += '"' + yearColumnName + '" ORDER BY "' + yearColumnName + '"';
        

         

      base = prefix1.concat(" ", tableName, " ", prefix2);

      // console.log("\n\n ***** landcover***** \n");
      // console.log(base);

      queries = {
        group: base.concat(" ", suffix),
        countries: base.concat(
          " ",
          "AND \"Country\" NOT LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
        regions: base.concat(
          " ",
          "AND \"Country\" LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
      };

      break;

    case "wNetForesCoverChange":
      var tableName = "dashboard23";
      var yearColumnName = "year";
      var netforestchangeColumnName = "";
      var forestgainColumnName = "";
      var forestlossColumnName = "";
      var gfwdeforestationColumnName = "gfw_deforestation";
      var arguments = [];

      suffix =
        'GROUP BY "' + yearColumnName + '" Order by "' + yearColumnName + '"';

      netforestchangeColumnName = "netforestchange";

      prefix1 =
        'SELECT "' +
        yearColumnName +
        '", ROUND(sum("' +
        netforestchangeColumnName +
        '")::numeric,2) as "NetForestChange", ROUND(sum(CASE WHEN "' +
        netforestchangeColumnName +
        '" > 0 THEN "' +
        netforestchangeColumnName +
        '" ELSE 0 END)::numeric,2) as "Aforestation", ROUND(sum(CASE WHEN "' +
        netforestchangeColumnName +
        '" < 0 THEN "' +
        netforestchangeColumnName +
        '" ELSE 0 END)::numeric,2) as "ForestLoss"';

      base =
        prefix1 +
        " FROM " +
        tableName +
        ' WHERE "iteration"= $1 AND "scenathon_id" = $2';

      if (country != "") {
        base += ' AND "Country" = $3';
      }

      queries = {
        group: base.concat(" ", suffix),
        countries: base.concat(
          " ",
          "AND \"Country\" NOT LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
        regions: base.concat(
          " ",
          "AND \"Country\" LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
      };
      break;

    case "Nforestbycountry":
      base =
        'SELECT "year","Country",ROUND(sum("netforestchange")::numeric,2) as "NetForestChange" FROM "dashboard23" WHERE "iteration"=$1 AND "scenathon_id"=$2';

      if (country != "") {
        base += ' AND "Country" = $3';
      }

      suffix = 'GROUP BY "Country", "year" Order by "Country","year"';

      queries = {
        group: base.concat(" ", suffix),
        countries: base.concat(
          " ",
          "AND \"Country\" NOT LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
        regions: base.concat(
          " ",
          "AND \"Country\" LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
      };
      break;

    case "biodiversityByCountry":
      base =
        'SELECT "year","Country", ROUND((avg("calcbiodivlnd"))::numeric,2) AS "Biodiversity_land",ROUND((((SUM("dashboard23"."protectedareasforest" + "dashboard23"."protectedareasothernat" +"dashboard23"."protectedareasother")) / 12337786.02)*100)::numeric,2) AS "Protected_land" FROM "dashboard23" WHERE "iteration" = $1 AND "scenathon_id" = $2';
      suffix = 'GROUP BY "Country", "year" Order by "Country", "year"';

      if (country != "") {
        base += ' AND "Country" = $3';
      }

      queries = {
        group: base.concat(" ", suffix),
        countries: base.concat(
          " ",
          "AND \"Country\" NOT LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
        regions: base.concat(
          " ",
          "AND \"Country\" LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
      };

      break;

    case "freshwater":
      base =
        'SELECT "year",ROUND(sum("calcwfblue")::numeric,2) AS "BlueWater" ';
        suffix = 'GROUP BY ';

      if (country != "") {


        base += ', "Country" FROM "dashboard23" WHERE "iteration"=$1 AND "scenathon_id"=$2 AND "Country" = $3';
        suffix += ' "Country", ';
      }else{

        base += ' FROM "dashboard23" WHERE "iteration"=$1 AND "scenathon_id"=$2';

      }

      suffix += ' "year" ORDER BY "year"';

      queries = {
        group: base.concat(" ", suffix),
        countries: base.concat(
          " ",
          "AND \"Country\" NOT LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
        regions: base.concat(
          " ",
          "AND \"Country\" LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
      };

      break;

    case "qFreshwaterBycountry":
      suffix = 'GROUP BY "Country", "year" ORDER BY "Country", "year"';

      tableName = "dashboard23";
      calcwfblue = "calcwfblue";

      base =
        'SELECT "year","Country",ROUND(sum("' +
        calcwfblue +
        '")::numeric,2) as "BlueWater" FROM "' +
        tableName +
        '" WHERE "iteration"=$1 AND "scenathon_id"=$2';

      if (country != "") {
        base += ' AND "Country" = $3';
      }

      queries = {
        group: base.concat(" ", suffix),
        countries: base.concat(
          " ",
          "AND \"Country\" NOT LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
        regions: base.concat(
          " ",
          "AND \"Country\" LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
      };

      break;

    case "GlobalghgEtarget":
      base =
        'SELECT "year", ROUND((SUM("calclivech4")/1000)::numeric,2) AS "Livestock_CH4", ';
      base +=
        'ROUND((SUM("calcliven2o")/1000)::numeric,2) AS "Livestock_N20", ROUND((SUM("calccropn2o")/1000)::numeric,2) AS "Crop_N20", ROUND((SUM("calccropch4")/1000)::numeric,2) AS "Crop_CH4", ROUND((SUM("calccropco2")/1000)::numeric,2) AS "Crop_CO2", ROUND(((SUM("calcliveallco2e")+(SUM("calccropallco2e")))/1000)::numeric,2) AS "Total_GHG_agric", ROUND(AVG("fao_ghgagric")::numeric,2) AS "FAO_GHGagric",  ROUND(AVG("ghg_agri_target")::numeric,2) AS "ghg_agri_target", ROUND((AVG("calcdeforco2")/100)::numeric,2) AS "deforestation", ROUND((AVG("calcotherlucco2")/100)::numeric,2) AS "Other_LUC", ROUND((AVG("calcsequestco2")/100)::numeric,2) AS "sequestration", ROUND((AVG("calcpeatco2")/100)::numeric,2) AS "peat", ROUND((AVG("calcalllandco2e")/100)::numeric,2) AS "total_GHG_land", ROUND(AVG("fao_ghg_lu")::numeric,2) AS "fao_ghg_lu", ROUND(AVG("ghg_lu_target")::numeric,2) AS "GHG_LU_target", ROUND((SUM("ghgbiofuels")/1000)::numeric,2) AS "GHG_BIOFUEL" ';
      base +=
        'FROM "dashboard23" WHERE "iteration" = $1 AND "scenathon_id" = $2';


      if (country != "") {
        base += ' AND "Country" = $3';
      }

      suffix = 'GROUP BY "year" ORDER BY "year"';

      queries = {
        group: base.concat(" ", suffix),
        countries: base.concat(
          " ",
          "AND \"Country\" NOT LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
        regions: base.concat(
          " ",
          "AND \"Country\" LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
      };

      break;

    case "Zerohunger":
      var query = "";

      query =
        'SELECT "Country", ROUND(avg("kcal_feas")::numeric,0) AS "Kcal_feasible", ROUND(avg("kcal_mder")::numeric,0) AS "Target_MDER" FROM "dashboard23" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "year" = $3';

      if (country != "") {
        query += ' AND "Country" = $4';
      } 

      queries = query +  ' GROUP BY "Country" ORDER BY "Country"';

      break;

    case "Lowdietary":
      var geoColumnName = "Country";
      var yearColumnName = "year";
      var tableName = "dashboard23";

      queries =
        'SELECT "' +
        geoColumnName +
        '", ROUND(avg("prot_feas")::numeric,0) AS "Protein_feasible", ROUND(avg("fat_feas")::numeric,0) AS "Fat_feasible" FROM ' +
        tableName +
        ' WHERE "iteration"=$1 AND scenathon_id =$2 AND "' +
        
        yearColumnName +
        '"=$3 ';

        if (country != "") {
          queries += ' AND "Country" = $4';
        } 

        queries += ' GROUP BY "' +
        geoColumnName +
        '" ORDER BY "' +
        geoColumnName +
        '"'

      break;

    case "tradeReport":
      // IN privatetrade view, the year column is capitalized,
      var query = "";
      var tableName = "";

      prefix1 = 'WHERE "Product"= $1 AND "iteration"= $2 AND "scenathon_id"= $3';

      if (country != "") {
        prefix1 += ' AND "country" = $4';
      } 

      suffix = 'ORDER BY "name","Year" ASC';

      var importQuantityColumnName = "Import_quantity";
      var exportQuantityColumnName = "Export_quantity";

      var prefix =
        'SELECT "name", "Year", ROUND("' +
        importQuantityColumnName +
        '"::numeric,2) as "' +
        importQuantityColumnName +
        '", ROUND("' +
        exportQuantityColumnName +
        '"::numeric,2) as "' +
        exportQuantityColumnName +
        '" FROM';

      tableName = "privatetrade";
      base = prefix.concat(" ", tableName);
      query = base.concat(
        " ",
        prefix1,
        " ",
        suffix
      );
      queries = query;

      break;

    case "protectedAreas":
      var query = "";
      var tableName = "dashboard23";
      var protectedAreasForestColumnName = "protectedareasforest";
      var protectedAreasForestOtherColumnName = "protectedareasother";
      var protectedAreasOtherNatColumnName = "protectedareasother";
      var geoColumnName = "Country";
      var yearColumnName = "year";

      base =
        'SELECT "' +
        yearColumnName +
        '", ROUND(SUM("' +
        protectedAreasForestColumnName +
        '")::numeric,2) as "ProtectedAreasForest", ROUND(SUM("' +
        protectedAreasForestOtherColumnName +
        '")::numeric,2) as "ProtectedAreasOther", ROUND(SUM("' +
        protectedAreasOtherNatColumnName +
        '")::numeric,2) as "ProtectedAreasOtherNat" FROM "' +
        tableName +
        '" WHERE "iteration"=$1 AND scenathon_id = $2';

      if (country != "") {
        base += ' AND "Country" = $3';
      }

      // console.log("\n\n ***** protectedAreas***** \n");
      // console.log(base);

      suffix =
        'GROUP BY "' + yearColumnName + '" ORDER BY "' + yearColumnName + '"';

      queries = {
        group: base.concat(" ", suffix),
        countries: base.concat(
          " ",
          'AND "' + geoColumnName + "\" NOT LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
        regions: base.concat(
          " ",
          'AND "' + geoColumnName + "\" LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
      };

      break;

    case "target5":
      var geoColumnName = "Country";
      var tableName = '"dashboard23"';
      var yearColumnName = "year";
      var selectedYear = "2030";

      base =
        'SELECT "' +
        geoColumnName +
        '", ROUND((avg("kcal_feas"))::numeric,0) AS kcal_feasible, ROUND(avg("kcal_mder")::numeric,0) AS target_mder FROM ' +
        tableName +
        ' WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "' +
        yearColumnName +
        '" = ' +
        selectedYear;

      if (country != "") {
        base = base.concat(' AND "Country" = $3');
      }

      suffix =
        'GROUP BY "' + geoColumnName + '" ORDER BY "' + geoColumnName + '"';

      queries = {
        group: base.concat(" ", suffix),
        countries: base.concat(
          " ",
          'AND "' + geoColumnName + "\" NOT LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
        regions: base.concat(
          " ",
          'AND "' + geoColumnName + "\" LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
      };

      break;

    case "gas2":
      var geoColumnName = "Country";
      var yearColumnName = "year";
      var tableName = "dashboard23";
      prefix1 = 'WHERE "iteration"=$1 AND "scenathon_id"=$2';
      
      if (country != "") {
        prefix1 += ' AND "Country" = $3';
      }
      
      var calcLiveCH4ColumnName = "calclivech4";
      var calcLiveN2OColumnName = "calcliven2o";
      var calcCropN2OColumnName = "calccropn2o";
      var calcCropCH4ColumnName = "calccropch4";
      var calcCropCO2ColumnName = "calccropco2";
      var calcalllandco2eColumnName = "calcalllandco2e";

      base =
        'SELECT "' +
        yearColumnName +
        '","' +
        geoColumnName +
        '",ROUND(((SUM("' +
        calcLiveCH4ColumnName +
        '")+SUM("' +
        calcLiveN2OColumnName +
        '")+SUM("' +
        calcCropN2OColumnName +
        '")+SUM("' +
        calcCropCH4ColumnName +
        '")+SUM("' +
        calcCropCO2ColumnName +
        '")+SUM("ghgbiofuels"))/1000)::numeric,2) AS "AgriCO2e",ROUND((AVG("' +
        calcalllandco2eColumnName +
        '")/1000)::numeric,2) AS "LandCO2e" FROM';
      suffix =
        'GROUP BY "' +
        geoColumnName +
        '", "' +
        yearColumnName +
        '" ORDER BY "' +
        geoColumnName +
        '", "' +
        yearColumnName +
        '"';

      queries = {
        group: base.concat(" ", tableName, " ", prefix1, " ", suffix),
        countries: base.concat(
          " ",
          'AND "' + geoColumnName + "\" NOT LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
        regions: base.concat(
          " ",
          'AND "' + geoColumnName + "\" LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
      };

      if (ScenathonYear === "2022") {
        if (GraficaType === "0") {
          queries = queries["group"];
        } else {
          prefix1 = prefix1.concat(" ", 'AND "country_id"=$3');
          queries = base.concat(" ", tableName, " ", prefix1, " ", suffix);
        }
      }

      break;

    case "alltargetsy21":
      var tableName = "";

      var geoColumnName = "Country";
      var yearColumnName = "year";

      var protectedAreasForestColumnName = "protectedareasforest";
      var protectedAreasForestOtherColumnName = "protectedareasother";
      var protectedAreasOtherNatColumnName = "protectedareasothernat";
      var netforestchangeColumnName = "netforestchange";
      var forestTargetColumnName = "forest_target";
      var protectedLandconstantValue = "12337786.02";
      var protectedLandTargetColumnName = "protected_land_target";
      var calcBiodivLndColumnName = "calcbiodivlnd";
      var totalLandColumnName = "TotalLand";
      var biodivTargetColumnName = "BiodivTarget";

      var forestTargetQuery = "";
      var protectedLandQuery = "";
      var protectedLandTargetQuery = "";
      var biodiversityLandQuery = "";
      var targetBiodiversityQuery = "";

      prefix1 =
        'WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "' +
        yearColumnName +
        '" > 2020';

      if (country != "") {
        prefix1 = prefix1.concat(' AND "Country" = $3');
      }

      tableName = '"dashboard23"';
      totalLandColumnName = "totalland";
      biodivTargetColumnName = "biodivtarget";

      base =
        'SELECT "' +
        yearColumnName +
        '", ROUND(SUM("' +
        netforestchangeColumnName +
        '")::numeric,2) AS "NetForestChange"';
      suffix =
        'GROUP BY "' + yearColumnName + '" ORDER BY "' + yearColumnName + '"';

      protectedLandQuery =
        "ROUND(((SUM(" +
        tableName +
        '."' +
        protectedAreasForestColumnName +
        '" + ' +
        tableName +
        '."' +
        protectedAreasOtherNatColumnName +
        '" +' +
        tableName +
        '."' +
        protectedAreasForestOtherColumnName +
        '")) / ' +
        protectedLandconstantValue +
        ")::numeric,2)";
      protectedLandTargetQuery =
        'ROUND(AVG("' + protectedLandTargetColumnName + '"/100)::numeric,2)';
      biodiversityLandQuery =
        "ROUND((SUM(" +
        tableName +
        '."' +
        calcBiodivLndColumnName +
        '" * ' +
        tableName +
        '."' +
        totalLandColumnName +
        '") / ' +
        protectedLandconstantValue +
        ")::numeric,2)";
      targetBiodiversityQuery =
        'ROUND(AVG("' + biodivTargetColumnName + '")::numeric,2)';
      forestTargetQuery =
        'ROUND(SUM("' + forestTargetColumnName + '")::numeric,2)';

      base = base.concat(
        ", ",
        forestTargetQuery,
        ' AS "ForestTarget"',
        ", ",
        protectedLandQuery,
        ' AS "Protected_Land"',
        ", ",
        protectedLandTargetQuery,
        ' AS "Protected_land_target"',
        ", ",
        biodiversityLandQuery,
        ' AS "Biodiversity_Land"',
        ", ",
        targetBiodiversityQuery,
        " ",
        'AS "Target_Biodiversity" FROM'
      );

      queries = {
        group: base.concat(" ", tableName, " ", prefix1, " ", suffix),
        countries: base.concat(
          " ",
          tableName,
          " ",
          prefix1,
          " ",
          'AND "' + geoColumnName + "\" NOT LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
        regions: base.concat(
          " ",
          tableName,
          " ",
          prefix1,
          " ",
          'AND "' + geoColumnName + "\" LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
      };

      break;

    case "targets4and6":
      console.log("targets4and6");

      var tableName = '"dashboard23"';
      var geoColumnName = "Country";
      var yearColumnName = "year";
      var calcLiveCH4ColumnName = "calclivech4";
      var calcLiveN2OColumnName = "calcliven2o";
      var calcCropN2OColumnName = "calccropn2o";
      var calcCropCH4ColumnName = "calccropch4";
      var calcCropCO2ColumnName = "calccropco2";
      var ghgAgriTargetColumnName = "ghg_agri_target";
      var calcAllLandCO2eColumnName = "calcalllandco2e";
      var ghgLuTargetColumnName = "ghg_lu_target";
      var calcWFblueColumnName = "calcwfblue";
      var waterTargetColumnName = "water_target";

      var livestockCH4Query =
        'ROUND((SUM("' + calcLiveCH4ColumnName + '")/1000)::numeric,2)';
      var livestockN20CH4Query =
        'ROUND((SUM("' + calcLiveN2OColumnName + '")/1000)::numeric,2)';
      var cropN20TargetQuery =
        'ROUND((SUM("' + calcCropN2OColumnName + '")/1000)::numeric,2)';
      var calcCropCH4TargetQuery =
        'ROUND((SUM("' + calcCropCH4ColumnName + '")/1000)::numeric,2)';
      var cropCO2TargetQuery =
        'ROUND((SUM("' + calcCropCO2ColumnName + '")/1000)::numeric,2)';
      var ghgAgriTargetQuery =
        'ROUND(AVG("' + ghgAgriTargetColumnName + '")::numeric,2)';
      var totalGHGLandQuery =
        'ROUND((AVG("' + calcAllLandCO2eColumnName + '")/1000)::numeric,2)';
      var gHGLuTargetQuery =
        'ROUND(AVG("' + ghgLuTargetColumnName + '")::numeric,2)';
      var blueWaterQuery =
        'ROUND(sum("' + calcWFblueColumnName + '")::numeric,2)';
      var waterTargetrQuery =
        'ROUND(AVG("' + waterTargetColumnName + '")::numeric,2)';

      var queriesRequests =
        'SELECT "' +
        yearColumnName +
        '", ' +
        livestockCH4Query +
        ' AS "Livestock_CH4", ' +
        livestockN20CH4Query +
        ' AS "Livestock_N20", ' +
        cropN20TargetQuery +
        ' AS "Crop_N20", ' +
        calcCropCH4TargetQuery +
        ' AS "Crop_CH4", ' +
        cropCO2TargetQuery +
        ' AS "Crop_CO2", ' +
        totalGHGLandQuery +
        ' AS "total_GHG_land", ' +
        blueWaterQuery +
        ' AS "BlueWater"';

      const prefix3 = ghgAgriTargetQuery.concat(
        " ",
        'AS "ghg_agri_target"',
        ", ",
        gHGLuTargetQuery,
        " ",
        'AS "GHG_LU_target"',
        ", ",
        waterTargetrQuery,
        ' AS "water_target"'
      );

      prefix1 = '"iteration"=$1 AND "scenathon_id"=$2';
      prefix2 = 'AND "' + yearColumnName + '" = 2050';

      if (country != "") {
        prefix2 = prefix2.concat(' AND "Country" = $3');
      }

      suffix =
        'GROUP BY "' + yearColumnName + '" ORDER BY "' + yearColumnName + '"';

      queriesRequests = queriesRequests.concat(", ", prefix3);
      prefix1 = prefix1.concat(" ", prefix2);

      base = queriesRequests.concat(" FROM ", tableName, " WHERE");

      queries = {
        group: base.concat(" ", prefix1, " ", suffix),
        countries: base.concat(
          " ",
          prefix1,
          " ",
          'AND "' + geoColumnName + "\" NOT LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
        regions: base.concat(
          " ",
          prefix1,
          " ",
          'AND "' + geoColumnName + "\" LIKE '%$_%' ESCAPE '$'",
          " ",
          suffix
        ),
      };

      break;

    case "yup":
      base = 'SELECT "iteration"';
      operation = "";

      switch (selected_target) {
        case "kcal_targ":
        case "kcal_feas":
        case "kcal_mder":
          operation = "AVG";
          break;

        default:
          operation = "SUM";
          break;
      }

      queries = base.concat(
        ", ",
        "ROUND(" +
          operation +
          '("' +
          selected_target +
          '")::numeric,2) AS ' +
          selected_target,
        ' FROM "fabletargets" WHERE "scenathon_id" = $1 AND "year"=$2 GROUP BY iteration ORDER BY iteration'
      );

      break;
  }

  return queries;
}

const getProductList = async (
  local_client,
  nettrade_table,
  scenathon_id = null,
  productColumnName
) => {
  // console.log("\ngetProductList");
  // console.log("nettrade_table: ", nettrade_table);

  var query_to_fetch =
    'SELECT DISTINCT "' + productColumnName + '" FROM "' + nettrade_table + '"';

  if (scenathon_id != null) {
    // console.log("\nscenathon_id != null");
    query_to_fetch = query_to_fetch.concat(
      ' WHERE "scenathon_id" = ' + scenathon_id
    );
  }

  query_to_fetch = query_to_fetch.concat(
    ' ORDER BY "' + productColumnName + '"'
  );
  // console.log("getProductList: query_to_fetch: ", query_to_fetch);

  var responseMessage = [];

  try {
    const response = await local_client.query(query_to_fetch, []);

    responseMessage = responseProductsApi(response.rows, productColumnName);

    // console.log('getProductList: responseMessage: ', responseMessage);
  } catch (error) {
    console.error(error);
  }

  return responseMessage;
};

const getScenathonCache = async (local_client) => {
  // TODO: AQUI ES DONDE SE LLENAN LOS VALORES DE LOS SCENATHON IDS PARA RELLENAR
  const years = [2021];
  const tables = [
    //scenathon ids
    '"dashboard23"',
  ];

  var productColumnName = "Product";

  const nettrade_tables = [
    //product tables
    "privatetrade",
  ];

  var year_counter = 0;

  var cache = {};

  for (var i = 0; i < years.length; i++) {
    year_counter = year_counter + 1;

    var table = tables[i];
    var year = years[i];
    var nettrade_table = nettrade_tables[i];

    // console.log("year: ", year);
    // console.log("table: ", table);
    // console.log("nettrade_table: ", nettrade_table);

    var scenathon_id = -1;
    var scenathon_id_list = await getScenathonMetaData(
      local_client,
      "scenathon_id",
      table,
      ""
    );
    // console.log("\nscenathon_id_list: " + scenathon_id_list);

    if (scenathon_id_list) {
      scenathon_id_list = scenathon_id_list.filter(function (el) {
        return el.scenathon_id >= 15;
      });

      for (var j = 0; j < scenathon_id_list.length; j++) {
        const products_list = await getProductList(
          local_client,
          nettrade_table,
          scenathon_id_list[j].scenathon_id,
          productColumnName
        );
        // console.log('\n products_list: ' + products_list);

        const conditionPrefix = "WHERE scenathon_id = ";
        scenathon_id = scenathon_id_list[j].scenathon_id;

        const iteration_object_list = await getScenathonMetaData(
          local_client,
          "iteration",
          table,
          conditionPrefix + scenathon_id
        );

        if (iteration_object_list) {
          var iteration_list = [];

          for (var k = 0; k < iteration_object_list.length; k++) {
            const iteration_item = iteration_object_list[k];

            iteration_list.push(iteration_item.iteration);
          }

          // console.log("iteration_list: ", iteration_list);

          var iterations_object = {};
          var products_object = {};

          if (cache[year]) {
            iterations_object = cache[year]["scenathon_id"];
            products_object = cache[year]["products"];
          }

          const scenathon_label = await getScenathonLabel(scenathon_id);

          var tradeAdjustmentObject = {};

          for (var k = 0; k < iteration_list.length; k++) {
            tradeAdjustmentObject[iteration_list[k]] = iteration_list[k];
          }

          // console.log("TODO: GET COUNTRIES AS WE GOT PRODUCTS");

          var scenathon_country_object = await getCountryList(
            local_client,
            scenathon_id,
            tradeAdjustmentObject
          );

          iterations_object[scenathon_id] = {
            iterations: tradeAdjustmentObject,
            label: scenathon_label,
            countries: scenathon_country_object,
          };

          products_object[scenathon_id] = products_list;

          cache[year] = {
            table: table,
            scenathon_id: iterations_object,
            nettrade_table: nettrade_table,
            products: products_object,
          };
        } else {
          console.log(
            "No iteration data found for year: " +
              year +
              " and scenathon_id: " +
              scenathon_id
          );
        }
      }
    } else {
      console.log("No scenathon id data found for table: " + table);
    }
  }

  return cache;
};

const getCountryList = async (
  local_client,
  scenathon_id,
  iterations_object
) => {
  // console.log("\ngetCountryList");

  // console.log("scenathon_id: ", scenathon_id);
  countries_object = {};

  for (var iteration_id in iterations_object) {
    // console.log("iteration_id: ", iteration_id);

    var country_list = await getCountryListForIteration(
      local_client,
      scenathon_id,
      iteration_id
    );

    // console.log("country_list: scenathon_id "+ scenathon_id +" : iteration_id: " + iteration_id + " : \n"+ country_list);
    countries_object[iteration_id] = country_list;
  }

  // console.log("countries_object: ", countries_object);
  return { iteration: countries_object };
};

const getCountryListForIteration = async (
  local_client,
  scenathon_id,
  iteration_id
) => {
  var query_to_fetch =
    'SELECT DISTINCT "Country" FROM "dashboard23" WHERE "scenathon_id" = ' +
    scenathon_id +
    ' AND "iteration" = ' +
    iteration_id;

  // console.log("getCountryListForIteration: query_to_fetch: ", query_to_fetch);

  var responseMessage = [];

  try {
    const response = await local_client.query(query_to_fetch, []);

    responseMessage = responseContriesApi(response.rows);

    // console.log("\ngetCountryListForIteration: responseMessage: ", responseMessage);
  } catch (error) {
    console.error(error);
  }

  return responseMessage;
};

const upateDatabaseCache = async () => {
  // If scenathon_cache does not exist, create it

  // console.log("scenathon_cache_private.json does not exist.");

  // console.log("Updating Database Cache...");

  const local_client = await getClient();

  cache = await getScenathonCache(local_client);

  await local_client.end();

  console.log("Database Cache Updated");

  fs.writeFileSync("./Api/scenathon_cache_private.json", JSON.stringify(cache));

  // console.log("scenathon_cache_private.json created");
  return cache;
};

const getScenathonLabel = async (scenathon_id) => {
  return "Scenathon " + scenathon_id;
};

module.exports = { respondRequestPrivate, upateDatabaseCache };
