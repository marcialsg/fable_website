const { SourceTextModule } = require("vm");
const { getClient } = require("./get-client");
const getScenathonMetaData = require("./ScenathonParametersService");
const getScenathonMetaData2 = require("./ScenathonParametersService2");
const fs = require("fs");
const { off } = require("process");

const responseProductsApi = (rows, productColumnName) => {
  var scenathon_id_list = [];

  console.log("responseProductsApi in");
  if (rows) {
    rows.forEach((item) => {
      scenathon_id_list.push(item[productColumnName].trim());
    });
  }

  console.log("responseProductsApi out");
  return scenathon_id_list;
};

const respondRequest = async (req) => {
  var responseStatus = 200;
  var responseMessage = "OK";

  var routeStem = "";
  var queryParameters = {};

  console.log("respondRequest: ");
  console.log("req.route.path: ", req.route.path);

  var cache = {};

  if (!fs.existsSync("./Api/scenathon_cache.json")) {
    console.log("scenathon_cache.json does not exist.");
    console.log("Updating Database Cache...");

    try {
      const local_client = await getClient();

      cache = await getScenathonCache(local_client);

      await local_client.end();

      console.log("Database Cache Updated");

      fs.writeFileSync("./Api/scenathon_cache.json", JSON.stringify(cache));

      console.log("scenathon_cache.json created");
    } catch (err) {
      console.log("CATCHED ERROR scenathon_cache: ", err.message);
      responseStatus = 500;
      responseMessage = { responseStatus, responseMessage: err.message };
    }
  } else {
    cache = fs.readFileSync("./Api/scenathon_cache.json", {
      encoding: "utf8",
      flag: "r",
    });

    cache = JSON.parse(cache);
  }

  if (req.route.path.includes("update_cache")) {
    try {
      cache = await upateDatabaseCache();
      responseMessage = "Scenathon Cache Updated";
      return { responseStatus, responseMessage };
    } catch (err) {
      console.log("CATCHED ERROR upateDatabaseCache: ", err.message);
      responseStatus = 500;
      responseMessage = { responseStatus, responseMessage };
    }
  }

  if (!req.route.path.includes("summary")) {
    routeStem = req.route.path.substring(1, req.route.path.indexOf(":"));

    queryParameters = JSON.parse(req.params.combinations).select;

    console.log(
      routeStem + " COMBINATIONS SELECT: ",
      JSON.parse(req.params.combinations).select
    );
  } else {
    routeStem = req.route.path.replace("/", "") + req.route.path + "/:";
  }

  console.log("\nrouteStem: ", routeStem);

  try {
    const client = await getClient();

    const {
      ScenathonYear = -1,
      PathwayId = -1,
      GraficaType = "",
      selected_target = "",
      scenathon_id = -1,
      iteration = -1,
      country = "",
      product = "",
    } = queryParameters;

    var query = getQuery(
      routeStem,
      ScenathonYear,
      GraficaType,
      selected_target,
      cache,
      country,
      product
    );

    console.log("QUERY: ", query);

    var arguments = await getArguments(req, cache);

    if (ScenathonYear != 2019) {
      console.log("ScenathonYear != 2019");

      console.log("country: ", country);

      if (country.length > 0) {
        console.log("country.length > 0");
        arguments.push(country);
      }
    }

    console.log("ARGUMENTS: ", arguments);

    const response = await client.query(query, arguments);

    //console.log("RESPONSE: ", response);

    await client.end();

    if (routeStem.includes("summary")) {
      responseMessage = { queryResponse: response.rows };

      // console.log(" \n\n summary responseMessage: ", responseMessage);
    } else {
      const products = cache[ScenathonYear]["products"];

      responseMessage = { queryResponse: response.rows, products: products };

      if (ScenathonYear != "2019") {
        const pathways = cache[ScenathonYear]["scenathon_id"];

        responseMessage["pathways"] = pathways;

        if (routeStem == "tradeReport") {
          responseMessage = {
            queryResponse: response.rows,
            pathways: pathways,
            products: products,
            titleChart:
              cache[ScenathonYear]["scenathon_id"][scenathon_id]["label"],
          };
        }
      } else {
        if (routeStem == "tradeReport") {
          responseMessage["iterations"] = cache[ScenathonYear]["iterations"];
        }
      }

      // if scenathonyear == 2023

      if (ScenathonYear == "2023") {
        // split the routeStem string with the '/' character and get the last element of the array
        // var routeStemArray = routeStem.split('/');
        // var routeStemLastElement = routeStemArray[routeStemArray.length - 2];
        // fs.writeFileSync(
        //   "./Api/" + routeStemLastElement + ".json",
        //   JSON.stringify(responseMessage)
        // );
      }
    }
  } catch (err) {
    console.log("CATCHED ERROR: ", err.message);
    responseStatus = 500;
    responseMessage = { error: "Server Error", message: err.message };
  }

  return { responseStatus, responseMessage };
};

const getArguments = async (req, cache) => {
  if (req.route.path.includes("summary")) {
    return [];
  }

  const {
    Year2 = "",
    product = "",
    iteration = -1,
    scenathon_id = -1,
    Year = -1,
    ScenathonYear = -1,
    PathwayId = -1,
    GraficaType = "",
    country = "",
  } = JSON.parse(req.params.combinations).select;

  if (req.route.path.includes("get_country_products")) {
    return [scenathon_id, iteration, PathwayId];
  }

  const routeStem = req.route.path.substring(1, req.route.path.indexOf(":"));
  var arguments = [];

  arguments = [iteration, scenathon_id];

  //if ScenathonYear == 2023, append PathwayId to arguments
  if (ScenathonYear == "2023") {
    arguments = arguments.concat([PathwayId]);
  }

  if (ScenathonYear == "2019") {
    if (
      routeStem == "wNetForesCoverChange" ||
      routeStem == "biodiversityByCountry" ||
      routeStem == "GlobalghgEtarget" ||
      routeStem == "Zerohunger"
    ) {
      arguments = [];
    }

    if (routeStem == "Nforestbycountry") {
      arguments = [iteration];
    }

    if (routeStem == "tradeReport") {
      arguments = [product, iteration];
    }
  } else {
    if (req.route.path.includes("total_costs_of_production")) {
      if (country != "" && product != "") {
        arguments = arguments.concat([product]);
      } else {
        if (country != "" && product == "") {
        } else if (country == "" && product != "") {
          arguments = arguments.concat([product]);
        }
      }
    }
    if (
      req.route.path.includes("employment_in_agriculture_crops_vs_livestock")
    ) {
      if (country != "" && product != "") {
        arguments = arguments.concat([product]);
      } else {
        if (country != "" && product == "") {
        } else if (country == "" && product != "") {
          arguments = arguments.concat([product]);
        }
      }
    }
    if (req.route.path.includes("get_country_products")) {
      arguments = arguments.concat([country]);
    }
    if (req.route.path.includes("average_daily_intake_per_capita_in_2030")) {
      arguments = [iteration, scenathon_id, Year, PathwayId];
    }

    if (req.route.path.includes("prevalence_of_undernourishment_in_2030")) {
      arguments = [iteration, scenathon_id, Year, PathwayId];
    }

    if (routeStem == "Zerohunger" || routeStem == "Lowdietary") {
      arguments = [iteration, scenathon_id, Year];
    }

    if (ScenathonYear == "2022") {
      // console.log('ScenathonYear: ', ScenathonYear);
      // console.log('routeStem: ', routeStem);
      // console.log('GraficaType: ', GraficaType);

      if (GraficaType != "0") {
        if (routeStem == "biodiversityByCountry" || routeStem == "gas2") {
          arguments = [iteration, scenathon_id, GraficaType];
        }
      }
    }

    if (routeStem == "tradeReport" || routeStem == "trade_report") {
      arguments = [product, iteration, scenathon_id];

      if (GraficaType != "0" && ScenathonYear == "2022") {
        arguments = arguments.concat([GraficaType]);
      }

      if (ScenathonYear == "2023") {
        arguments = arguments.concat([PathwayId]);
      }
    }
  }

  if (routeStem == "yup") {
    arguments = [scenathon_id, Year2];
  }

  return arguments;
};

function getQuery(
  route,
  ScenathonYear,
  GraficaType,
  selected_target,
  cache,
  country,
  product
) {
  const queries = getRouteQueryDict(
    route,
    ScenathonYear,
    selected_target,
    country,
    GraficaType,
    product
  );

  if (
    route.includes("get_country_products") ||
    route.includes("total_costs_of_production") ||
    route.includes("employment_in_agriculture_eat_food_groups") ||
    route.includes("employment_in_agriculture_crops_vs_livestock") ||
    route.includes("summary") ||
    route.includes("trade_report") ||
    route.includes("water_use_for_irrigation_in_agriculture") ||
    route.includes("nitrogen_and_phosphorus") ||
    route.includes("water/") ||
    route.includes("biodiversity/") ||
    route.includes("average_daily_intake_per_capita_in_2030") ||
    route.includes(
      "evolution_of_daily_calories_intake_per_capita_by_country"
    ) ||
    route.includes(
      "prevalence_of_undernourishment_in_2030"
    ) ||
    route.includes(
      "evolution_of_prevalence_of_undernourishment_by_country"
    ) ||
    route.includes("share_of_undernourished") ||
    route.includes("share_of_obese") ||
    route.includes("methane_emissions_from_crops_and_livestock") ||
    route.includes(
      "annual_co2_emissions_from_land_use_change_and_on-farm_energy_use_by_source"
    ) ||
    route.includes(
      "annual_ghg_emissions_from_crops_and_livestock_in_gt_co2e_by_country"
    ) ||
    route.includes(
      "annual_co2_emissions_from_land_use_change_and_on-farm_energy_use_by_country"
    ) ||
    route.includes("total_agricultural_emissions_2050") ||
    route.includes("cumulative_co2_emissions_from_afolu_2020-2050") ||
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

function getRouteQueryDict(
  route,
  ScenathonYear,
  selected_target,
  country,
  plotType,
  product
) {
  var suffix = "";
  var base = "";
  var prefix1 = "";
  var prefix2 = "";

  console.log("\ngetRouteQueryDict route: ", route);

  switch (route) {
    case "landcover":
      //TODO: CREATE TABLE WITH NAME "indicatorsScen" FOR GENERIC PURPOSES

      var tableName = "";
      var calcpastureColumnName = "calcpasture";
      var calccroplandColumnName = "calccropland";
      var calcforestColumnName = "calcforest";
      var calcnewforestColumnName = "calcnewforest";
      var calcotherlandColumnName = "calcotherland";
      var calcurbanColumnName = "calcurban";
      var yearColumnName = "Year";

      switch (ScenathonYear) {
        case "2020":
          tableName = '"resultsScen2020"';
          calcpastureColumnName = "CalcPasture";
          calccroplandColumnName = "CalcCropland";
          calcforestColumnName = "CalcForest";
          calcnewforestColumnName = "CalcNewForest";
          calcotherlandColumnName = "CalcOtherLand";
          calcurbanColumnName = "CalcUrban";
          break;

        case "2021":
          tableName = '"indicatorsScen2022"';
          break;

        case "2022":
          yearColumnName = "year";
          tableName = "fabletargets";
          break;

        default:
          yearColumnName = "year";
          tableName = '"indicatorsScen"';
          break;
      }

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
        '")::numeric,2) AS "CalcUrban" FROM';
      prefix2 = 'WHERE "iteration"=$1 AND "scenathon_id" = $2';
      suffix =
        'GROUP BY "' + yearColumnName + '" Order BY "' + yearColumnName + '"';

      base = prefix1.concat(" ", tableName, " ", prefix2);

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
      var tableName = "";
      var yearColumnName = "";
      var netforestchangeColumnName = "";
      var forestgainColumnName = "";
      var forestlossColumnName = "";
      var gfwdeforestationColumnName = "";
      var arguments = [];

      switch (ScenathonYear) {
        case "2019":
          // console.log('2019');
          // console.log('route: ', route);

          tableName = '"indicatorsScen2019"';
          yearColumnName = "year";
          netforestchangeColumnName = "netforest_change";
          forestgainColumnName = "forest_gain";
          forestlossColumnName = "forest_loss";
          gfwdeforestationColumnName = "gfw_deforestation";

          base =
            'SELECT "' +
            yearColumnName +
            '", ROUND((sum("' +
            netforestchangeColumnName +
            '")/1000)::numeric,2) as "NetForestChange", ROUND((sum("' +
            forestgainColumnName +
            '")/1000)::numeric,2) as "Aforestation", ROUND((sum("' +
            forestlossColumnName +
            '")/1000)::numeric,2) as "ForestLoss", ROUND((sum("' +
            gfwdeforestationColumnName +
            '")/1000)::numeric,2) as "GFW_deforestation_global" FROM';
          suffix =
            'GROUP BY "' +
            yearColumnName +
            '" Order by "' +
            yearColumnName +
            '"';

          // console.log('BASE: ', base);
          // console.log('countries: ', base.concat(" ", tableName, " ", 'WHERE "country_fable"=1', " ", suffix));
          // console.log('regions: ', base.concat(" ", tableName, " ", 'WHERE "country_fable"=2', " ", suffix));
          // console.log('BASE: ', base);

          queries = {
            group: base.concat(" ", tableName, " ", suffix),
            countries: base.concat(
              " ",
              tableName,
              " ",
              'WHERE "country_fable"=1',
              " ",
              suffix
            ),
            regions: base.concat(
              " ",
              tableName,
              " ",
              'WHERE "country_fable"=2',
              " ",
              suffix
            ),
          };

          // console.log('queries: ', queries);

          break;

        case "2022":
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

          tableName = "fabletargets";
          yearColumnName = "year";
          netforestchangeColumnName = "netforestchange";
          base =
            prefix1 +
            " FROM " +
            tableName +
            ' WHERE "iteration"= $1 AND "scenathon_id" = $2';
          suffix =
            'GROUP BY "' +
            yearColumnName +
            '" Order by "' +
            yearColumnName +
            '"';

          queries = {
            group: base.concat(" ", suffix),
            countries: base.concat(
              " ",
              "AND \"location\" LIKE '%$_%' ESCAPE '$'",
              " ",
              suffix
            ),
            regions: base.concat(
              " ",
              " AND \"location\" LIKE '%$_%' ESCAPE '$' ",
              " ",
              suffix
            ),
          };

          break;

        default:
          yearColumnName = "Year";
          gfwdeforestationColumnName = "gfw_deforestation";
          suffix =
            'GROUP BY "' +
            yearColumnName +
            '" Order by "' +
            yearColumnName +
            '"';

          if (ScenathonYear === "2020") {
            // console.log("Enters 2020");
            tableName = '"resultsScen2020"';
            netforestchangeColumnName = "NetForestChange";
          } else {
            //2021

            // console.log("Enters 2021");
            tableName = '"indicatorsScen2022"';
            netforestchangeColumnName = "netforestchange";
          }

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
      }

      break;

    case "Nforestbycountry":
      switch (ScenathonYear) {
        case "2019":
          base =
            'SELECT "year","country",ROUND(sum("netforestchange")::numeric,2) as "NetForestChange" FROM "indicators19" WHERE "iteration"=$1';
          suffix = 'GROUP BY "year","country" Order by "year","country"';

          queries = {
            group: base.concat(" ", suffix),
            countries: base.concat(
              " ",
              "AND \"alpha\" NOT LIKE '%$_%' ESCAPE '$'",
              " ",
              suffix
            ),
            regions: base.concat(
              " ",
              "AND \"alpha\" LIKE '%$_%' ESCAPE '$'",
              " ",
              suffix
            ),
          };

          break;

        case "2020":
          base =
            'SELECT "Year","Country",ROUND(sum("NetForestChange")::numeric,2) as "NetForestChange" FROM "resultsScen2020" WHERE "iteration"=$1 AND "scenathon_id"=$2';
          suffix = 'GROUP BY "Country","Year" Order by "Country","Year"';

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

        case "2021":
          base =
            'SELECT "Year","Country",ROUND(sum("netforestchange")::numeric,2) as "NetForestChange" FROM "indicatorsScen2022" WHERE "iteration"=$1 AND "scenathon_id"=$2';
          suffix = 'GROUP BY "Country", "Year" Order by "Country","Year"';

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

        case "2022":
          base =
            'SELECT "year","location",ROUND(sum("netforestchange")::numeric,2) as "NetForestChange" FROM fabletargets WHERE "iteration"=$1 AND "scenathon_id"=$2';
          suffix = 'GROUP BY "year","location" Order by "year","location"';

          if (GraficaType === "0") {
            queries = {
              0: base.concat(" ", suffix),
            };
          } else {
            queries = {
              group: base.concat(" ", "AND country_id = $3", " ", suffix),
              countries: base.concat(" ", "AND country_id = $3", " ", suffix),
              regions: base.concat(" ", "AND country_id = $3", " ", suffix),
            };
          }

          break;
      }

      break;

    case "biodiversityByCountry":
      switch (ScenathonYear) {
        case "2019":
          base =
            'SELECT "year", ROUND(sum(biodiversity)::numeric,2) AS "Biodiversity_Land" FROM "indicatorsScen2019"';
          suffix = 'GROUP BY "year" Order by "year"';

          queries = {
            group: base.concat(" ", suffix),
            countries: base.concat(
              " ",
              'WHERE "country_fable" = 1',
              " ",
              suffix
            ),
            regions: base.concat(" ", 'WHERE "country_fable" = 2', " ", suffix),
          };

          break;

        case "2020":
          base =
            'SELECT "Year","Country", ROUND((avg("CalcBiodivLnd"))::numeric,2) AS "Biodiversity_land",ROUND((((SUM("resultsScen2020"."ProtectedAreasForest" + "resultsScen2020"."ProtectedAreasOtherNat" +"resultsScen2020"."ProtectedAreasOther")) / 12376329.73)*100)::numeric,2) AS "Protected_land" FROM "resultsScen2020"  WHERE "iteration" = $1 AND "scenathon_id" = $2';
          suffix = 'GROUP BY "Country", "Year" Order by "Country", "Year"';

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

        case "2021":
          base =
            'SELECT "Year","Country", ROUND((avg("calcbiodivlnd"))::numeric,2) AS "Biodiversity_land",ROUND((((SUM("indicatorsScen2022"."protectedareasforest" + "indicatorsScen2022"."protectedareasothernat" +"indicatorsScen2022"."protectedareasother")) / 12337786.02)*100)::numeric,2) AS "Protected_land" FROM "indicatorsScen2022" WHERE "iteration" = $1 AND "scenathon_id" = $2';
          suffix = 'GROUP BY "Country", "Year" Order by "Country", "Year"';

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

        case "2022":
          if (GraficaType === "0") {
            base =
              'SELECT "year","location",ROUND(sum("biodiversity")::numeric,2) as "Biodiversity_Land" FROM fabletargets WHERE "iteration"=$1 AND "scenathon_id"=$2';
            suffix = 'GROUP BY "year","location" ORDER BY "year","location"';

            queries = {
              0: base.concat(" ", suffix),
            };
          } else {
            base =
              'SELECT year,location, ROUND((AVG("calcbiodivlnd"))::numeric,2) AS "Biodiversity_land", ROUND((((SUM("fabletargets"."protectedareasforest" + "fabletargets"."protectedareasothernat" +"fabletargets"."protectedareasother")) / 12337786.02)*100)::numeric,2) AS "Protected_land" FROM fabletargets WHERE "iteration" = $1 AND "scenathon_id" = $2 AND country_id = $3 GROUP BY "location","year" ORDER BY "location","year"';
            queries = {
              group: base,
              countries: base,
              regions: base,
            };
          }

          break;
      }

      break;

    case "freshwater":
      switch (ScenathonYear) {
        case "2020":
          base =
            'SELECT "Year",ROUND(sum("CalcWFblue")::numeric,2) as "BlueWater" from "resultsScen2020" WHERE "iteration"=$1 and "scenathon_id"=$2';
          suffix = 'GROUP BY "Year" ORDER BY "Year"';

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

        case "2021":
          base =
            'SELECT "Year",ROUND(sum("calcwfblue")::numeric,2) as "BlueWater" from "indicatorsScen2022" WHERE "iteration"=$1 and "scenathon_id"=$2';
          suffix = 'GROUP BY "Year" ORDER BY "Year"';

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

        case "2022":
          base =
            'SELECT "year",ROUND(sum("calcwfblue")::numeric,2) as "BlueWater" from fabletargets WHERE "iteration"=$1 and "scenathon_id"=$2';
          suffix = 'GROUP BY "year" ORDER BY "year"';

          queries = {
            group: base.concat(" ", suffix),
            countries: base.concat(
              " ",
              "AND \"location\" NOT LIKE '%$_%' ESCAPE '$'",
              " ",
              suffix
            ),
            regions: base.concat(
              " ",
              "AND \"location\" LIKE '%$_%' ESCAPE '$'",
              " ",
              suffix
            ),
          };

          break;
      }

      break;

    case "qFreshwaterBycountry":
      switch (ScenathonYear) {
        case "2022":
          base =
            'SELECT "year","location",ROUND(sum("calcwfblue")::numeric,2) as "BlueWater" from fabletargets WHERE "iteration"=$1 and "scenathon_id"=$2';
          suffix = 'GROUP BY "location", "year" ORDER BY "location", "year"';

          var query = "";

          if (GraficaType === "0") {
            query = base.concat(" ", suffix);
          } else {
            query = base.concat(" ", 'AND "country_id"=$3', " ", suffix);
          }

          queries = {
            GraficaType: query,
          };

          break;

        default:
          suffix = 'GROUP BY "Country", "Year" ORDER BY "Country", "Year"';

          if (ScenathonYear == "2020") {
            tableName = "resultsScen2020";
            calcwfblue = "CalcWFblue";
          } else {
            //2021

            tableName = "indicatorsScen2022";
            calcwfblue = "calcwfblue";
          }

          base =
            'SELECT "Year","Country",ROUND(sum("' +
            calcwfblue +
            '")::numeric,2) as "BlueWater" FROM "' +
            tableName +
            '" WHERE "iteration"=$1 AND "scenathon_id"=$2';

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
      }

      break;

    case "GlobalghgEtarget":
      switch (ScenathonYear) {
        case "2019":
          base =
            'SELECT "year", ROUND(SUM("livestockch4")::numeric,2) AS "Livestock_CH4", ROUND(SUM("livestockn2o")::numeric,2) AS "Livestock_N20", ROUND(SUM("cropsn2o")::numeric,2) AS "Crop_N20", ROUND(SUM("cropsch4")::numeric,2) AS "Crop_CH4", ROUND(SUM("cropsco2")::numeric,2) AS "Crop_CO2", ROUND(SUM("total_ghg_agric")::numeric,2) AS "Total_GHG_agric", ROUND(SUM("fao_ghg_agric")::numeric,2) AS "FAO_GHGagric", ROUND(SUM("deforestation")::numeric,2) AS "deforestation", ROUND(SUM("otherluc")::numeric,2) AS "Other_LUC", ROUND(SUM("secuestration")::numeric,2) AS "sequestration", ROUND(SUM("peat")::numeric,2) AS "peat", ROUND(AVG("fao_ghg_lu")::numeric,2) AS "fao_ghg_lu", ROUND(SUM("total_ghg_land")::numeric,2) AS "total_GHG_land" FROM "indicatorsScen2019"';
          suffix = 'GROUP BY "year" ORDER BY "year"';

          queries = {
            group: base.concat(" ", suffix),
            countries: base.concat(" ", 'WHERE "country_fable"=1', " ", suffix),
            regions: base.concat(" ", 'WHERE "country_fable"=2', " ", suffix),
          };

          break;
        case "2020":
          base =
            'SELECT "Year", ROUND((SUM("CalcLiveCH4")/1000)::numeric,2) AS "Livestock_CH4", ROUND((SUM("CalcLiveN2O")/1000)::numeric,2) AS "Livestock_N20", ROUND((SUM("CalcCropN2O")/1000)::numeric,2) AS "Crop_N20", ROUND((SUM("CalcCropCH4")/1000)::numeric,2) AS "Crop_CH4", ROUND((SUM("CalcCropCO2")/1000)::numeric,2) AS "Crop_CO2", ROUND(((SUM("CalcLiveAllCO2e")+(SUM("CalcCropAllCO2e")))/1000)::numeric,2) AS "Total_GHG_agric", ROUND(AVG("fao_ghgagric")::numeric,2) AS "FAO_GHGagric", ROUND(AVG("ghg_agri_target")::numeric,2) AS "ghg_agri_target", ROUND((AVG("CalcDeforCO2")/100)::numeric,2) AS "deforestation", ROUND((AVG("CalcOtherLUCCO2")/100)::numeric,2) AS "Other_LUC", ROUND((AVG("CalcSequestCO2")/100)::numeric,2) AS "sequestration", ROUND((AVG("CalcPeatCO2")/100)::numeric,2) AS "peat", ROUND((AVG("CalcAllLandCO2e")/100)::numeric,2) AS "total_GHG_land", ROUND(AVG("fao_ghg_lu")::numeric,2) AS "fao_ghg_lu", ROUND(AVG("ghg_lu_target")::numeric,2) AS "GHG_LU_target", ROUND((SUM("ghgbiofuels")/1000)::numeric,2) AS "GHG_BIOFUEL" FROM "resultsScen2020" WHERE "iteration" = $1 AND "scenathon_id" = $2';
          suffix = 'GROUP BY "Year" ORDER BY "Year"';

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
        case "2021":
          base =
            'SELECT "Year", ROUND((SUM("calclivech4")/1000)::numeric,2) AS "Livestock_CH4", ROUND((SUM("calcliven2o")/1000)::numeric,2) AS "Livestock_N20", ROUND((SUM("calccropn2o")/1000)::numeric,2) AS "Crop_N20", ROUND((SUM("calccropch4")/1000)::numeric,2) AS "Crop_CH4", ROUND((SUM("calccropco2")/1000)::numeric,2) AS "Crop_CO2", ROUND(((SUM("calcliveallco2e")+(SUM("calccropallco2e")))/1000)::numeric,2) AS "Total_GHG_agric", ROUND(AVG("fao_ghgagric")::numeric,2) AS "FAO_GHGagric", ROUND(AVG("ghg_agri_target")::numeric,2) AS "ghg_agri_target", ROUND((AVG("calcdeforco2")/100)::numeric,2) AS "deforestation", ROUND((AVG("calcotherlucco2")/100)::numeric,2) AS "Other_LUC", ROUND((AVG("calcsequestco2")/100)::numeric,2) AS "sequestration", ROUND((AVG("calcpeatco2")/100)::numeric,2) AS "peat", ROUND((AVG("calcalllandco2e")/100)::numeric,2) AS "total_GHG_land", ROUND(AVG("fao_ghg_lu")::numeric,2) AS "fao_ghg_lu", ROUND(AVG("ghg_lu_target")::numeric,2) AS "GHG_LU_target", ROUND((SUM("ghgbiofuels")/1000)::numeric,2) AS "GHG_BIOFUEL" FROM "indicatorsScen2022" WHERE "iteration" = $1 AND "scenathon_id" = $2';
          suffix = 'GROUP BY "Year" ORDER BY "Year"';

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
        case "2022":
          base =
            'SELECT "year", ROUND((SUM("calclivech4")/1000)::numeric,2) AS "Livestock_CH4", ROUND((SUM("calcliven2o")/1000)::numeric,2) AS "Livestock_N20", ROUND((SUM("calccropn2o")/1000)::numeric,2) AS "Crop_N20", ROUND((SUM("calccropch4")/1000)::numeric,2) AS "Crop_CH4", ROUND((SUM("calccropco2")/1000)::numeric,2) AS "Crop_CO2", ROUND(((SUM("calcliveallco2e")+(SUM("calccropallco2e")))/1000)::numeric,2) AS "Total_GHG_agric", ROUND((AVG("calcdeforco2")/1000)::numeric,2) AS "deforestation", ROUND((AVG("calcotherlucco2")/1000)::numeric,2) AS "Other_LUC", ROUND((AVG("calcsequestco2")/1000)::numeric,2) AS "sequestration", ROUND((AVG("calcpeatco2")/1000)::numeric,2) AS "peat", ROUND((AVG("calcalllandco2e")/1000)::numeric,2) AS "total_GHG_land", ROUND((SUM("ghgbiofuels")/1000)::numeric,2) AS "GHG_BIOFUEL" FROM fabletargets WHERE "iteration" = $1 AND "scenathon_id" = $2';
          suffix = 'GROUP BY "year" ORDER BY "year"';

          queries = {
            group: base.concat(" ", suffix),
            countries: base.concat(
              " ",
              "AND \"location\" NOT LIKE '%$_%' ESCAPE '$'",
              " ",
              suffix
            ),
            regions: base.concat(
              " ",
              "AND \"location\" LIKE '%$_%' ESCAPE '$'",
              " ",
              suffix
            ),
          };

          break;
      }

      break;

    case "Zerohunger":
      var query = "";

      switch (ScenathonYear) {
        case "2019":
          query =
            'SELECT "year", ROUND(sum("feasible")::numeric,2) as "Kcal_feasible", ROUND(sum(mder)::numeric,2) as "Target_MDER", ROUND(sum(target)::numeric,2) as "Target" FROM "indicatorsScen2019" GROUP BY "year" Order by "year"';
          break;
        case "2020":
          query =
            'SELECT "Country", ROUND(avg("kcal_feas")::numeric,0) AS "Kcal_feasible", ROUND(avg("kcal_mder")::numeric,0) AS "Target_MDER" FROM "resultsScen2020" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "Year" = $3 GROUP BY "Country" ORDER BY "Country"';
          break;
        case "2021":
          query =
            'SELECT "Country", ROUND(avg("kcal_feas")::numeric,0) AS "Kcal_feasible", ROUND(avg("kcal_mder")::numeric,0) AS "Target_MDER" FROM "indicatorsScen2022" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "Year" = $3 GROUP BY "Country" ORDER BY "Country"';
          break;
        case "2022":
          query =
            'SELECT "location", ROUND(avg("kcal_feas")::numeric,0) AS "Kcal_feasible", ROUND(avg("kcal_mder")::numeric,0) AS "Target_MDER" FROM fabletargets WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "year" = $3 GROUP BY "location" ORDER BY "location"';
          break;
      }

      queries = query;

      break;

    case "Lowdietary":
      var geoColumnName = "Country";
      var yearColumnName = "Year";
      var tableName = "";

      switch (ScenathonYear) {
        case "2022":
          geoColumnName = "location";
          tableName = "fabletargets";
          yearColumnName = "year";
          break;

        case "2021":
          tableName = '"indicatorsScen2022"';
          break;

        case "2020":
          tableName = '"resultsScen2020"';
          break;

        default:
          tableName = '"indicatorsScen"';
          break;
      }

      queries =
        'SELECT "' +
        geoColumnName +
        '", ROUND(avg("prot_feas")::numeric,0) AS "Protein_feasible", ROUND(avg("fat_feas")::numeric,0) AS "Fat_feasible" FROM ' +
        tableName +
        ' WHERE "iteration"=$1 AND scenathon_id =$2 AND "' +
        yearColumnName +
        '"=$3 GROUP BY "' +
        geoColumnName +
        '" ORDER BY "' +
        geoColumnName +
        '"';

      break;

    case "tradeReport":
      var query = "";
      var tableName = "";

      prefix1 = 'WHERE "Product"= $1 AND "iteration"= $2';
      suffix = 'ORDER BY "name","Year" ASC';

      var importQuantityColumnName = "import_quantity";
      var exportQuantityColumnName = "export_quantity";

      var prefix =
        'SELECT "name", "Year", ROUND("' +
        importQuantityColumnName +
        '"::numeric,2) as "Import_quantity", ROUND("' +
        exportQuantityColumnName +
        '"::numeric,2) as "Export_quantity" FROM';

      switch (ScenathonYear) {
        case "2019":
          tableName = "nettrade2019";
          base = prefix.concat(" ", tableName);
          query = base.concat(" ", prefix1, " ", suffix);
          break;

        case "2020":
          importQuantityColumnName = "Import_quantity";
          exportQuantityColumnName = "Export_quantity";

          prefix =
            'SELECT "name", "Year", ROUND("' +
            importQuantityColumnName +
            '"::numeric,2) as "Import_quantity", ROUND("' +
            exportQuantityColumnName +
            '"::numeric,2) as "Export_quantity" FROM';

          tableName = "nettrade";
          base = prefix.concat(" ", tableName);
          query = base.concat(
            " ",
            prefix1,
            " ",
            'AND "scenathon_id"=$3',
            " ",
            suffix
          );

          break;

        case "2021":
          tableName = "nettrade2022";
          base = prefix.concat(" ", tableName);
          query = base.concat(
            " ",
            prefix1,
            " ",
            'AND "scenathon_id"=$3',
            " ",
            suffix
          );

          break;

        case "2022":
          tableName = "fableproducts";
          base =
            'SELECT "location", "year", ROUND("import_quantity"::numeric,2) as "Import_quantity", ROUND("export_quantity"::numeric,2) as "Export_quantity" FROM ' +
            tableName +
            ' WHERE "product"=$1 AND "iteration"=$2';
          suffix = 'ORDER BY "location","year" ASC';

          if (GraficaType === "0") {
            query = base.concat(" ", 'AND "scenathon_id"=$3', " ", suffix);
          } else {
            query = base.concat(
              " ",
              'AND "scenathon_id"=$3 AND country_id = $4',
              " ",
              suffix
            );
          }

          break;
      }

      queries = query;

      break;

    case "protectedAreas":
      var query = "";
      var tableName = "";
      var protectedAreasForestColumnName = "protectedareasforest";
      var protectedAreasForestOtherColumnName = "protectedareasother";
      var protectedAreasOtherNatColumnName = "protectedareasothernat";
      var geoColumnName = "Country";
      var yearColumnName = "Year";

      switch (ScenathonYear) {
        case "2020":
          protectedAreasForestColumnName = "ProtectedAreasForest";
          protectedAreasForestOtherColumnName = "ProtectedAreasOther";
          protectedAreasOtherNatColumnName = "ProtectedAreasOtherNat";
          tableName = "resultsScen2020";

          break;

        case "2021":
          tableName = "indicatorsScen2022";

          break;

        case "2022":
          yearColumnName = "year";
          tableName = "fabletargets";
          geoColumnName = "location";

          break;
      }

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
      var tableName = "";
      var yearColumnName = "Year";
      var selectedYear = "2030";

      switch (ScenathonYear) {
        case "2020":
          tableName = '"resultsScen2020"';
          break;

        case "2021":
          tableName = '"indicatorsScen2022"';
          break;

        case "2022":
          geoColumnName = "location";
          tableName = "fabletargets";
          yearColumnName = "year";
          selectedYear = "2025";
          break;
      }

      base =
        'SELECT "' +
        geoColumnName +
        '", ROUND((avg("kcal_feas"))::numeric,0) AS kcal_feasible, ROUND(avg("kcal_mder")::numeric,0) AS target_mder FROM ' +
        tableName +
        ' WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "' +
        yearColumnName +
        '" = ' +
        selectedYear;
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
      var yearColumnName = "Year";
      var tableName = "";
      prefix1 = 'WHERE "iteration"=$1 AND "scenathon_id"=$2';

      var calcLiveCH4ColumnName = "calclivech4";
      var calcLiveN2OColumnName = "calcliven2o";
      var calcCropN2OColumnName = "calccropn2o";
      var calcCropCH4ColumnName = "calccropch4";
      var calcCropCO2ColumnName = "calccropco2";
      var calcalllandco2eColumnName = "calcalllandco2e";

      switch (ScenathonYear) {
        case "2022":
          tableName = "fabletargets";
          yearColumnName = "year";
          geoColumnName = "location";
          break;
        case "2020":
          calcLiveCH4ColumnName = "CalcLiveCH4";
          calcLiveN2OColumnName = "CalcLiveN2O";
          calcCropN2OColumnName = "CalcCropN2O";
          calcCropCH4ColumnName = "CalcCropCH4";
          calcCropCO2ColumnName = "CalcCropCO2";
          calcalllandco2eColumnName = "CalcAllLandCO2e";

          tableName = '"resultsScen2020"';
          break;
        case "2021":
          tableName = '"indicatorsScen2022"';
          break;
      }

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
      var yearColumnName = "Year";

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

      switch (ScenathonYear) {
        case "2020":
          tableName = '"resultsScen2020"';
          netforestchangeColumnName = "NetForestChange";
          protectedAreasForestColumnName = "ProtectedAreasForest";
          protectedAreasForestOtherColumnName = "ProtectedAreasOther";
          protectedAreasOtherNatColumnName = "ProtectedAreasOtherNat";
          calcBiodivLndColumnName = "CalcBiodivLnd";
          protectedLandconstantValue = "12376329.73";

          break;

        case "2021":
          tableName = '"indicatorsScen2022"';
          totalLandColumnName = "totalland";
          biodivTargetColumnName = "biodivtarget";

          break;

        case "2022":
          tableName = "fabletargets";
          geoColumnName = "location";
          yearColumnName = "year";
          prefix1 =
            'WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "' +
            yearColumnName +
            '" >= 2020';

          break;
      }

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

      var tableName = "";
      var geoColumnName = "Country";
      var yearColumnName = "Year";
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

      suffix =
        'GROUP BY "' + yearColumnName + '" ORDER BY "' + yearColumnName + '"';

      switch (ScenathonYear) {
        case "2020":
          tableName = '"resultsScen2020"';

          calcLiveCH4ColumnName = "CalcLiveCH4";
          calcLiveN2OColumnName = "CalcLiveN2O";
          calcCropN2OColumnName = "CalcCropN2O";
          calcCropCH4ColumnName = "CalcCropCH4";
          calcCropCO2ColumnName = "CalcCropCO2";
          calcWFblueColumnName = "CalcWFblue";
          calcAllLandCO2eColumnName = "CalcAllLandCO2e";

          livestockCH4Query =
            'ROUND((SUM("' + calcLiveCH4ColumnName + '")/1000)::numeric,2)';
          livestockN20CH4Query =
            'ROUND((SUM("' + calcLiveN2OColumnName + '")/1000)::numeric,2)';
          cropN20TargetQuery =
            'ROUND((SUM("' + calcCropN2OColumnName + '")/1000)::numeric,2)';
          calcCropCH4TargetQuery =
            'ROUND((SUM("' + calcCropCH4ColumnName + '")/1000)::numeric,2)';
          cropCO2TargetQuery =
            'ROUND((SUM("' + calcCropCO2ColumnName + '")/1000)::numeric,2)';
          ghgAgriTargetQuery =
            'ROUND(AVG("' + ghgAgriTargetColumnName + '")::numeric,2)';
          totalGHGLandQuery =
            'ROUND((AVG("' + calcAllLandCO2eColumnName + '")/1000)::numeric,2)';
          gHGLuTargetQuery =
            'ROUND(AVG("' + ghgLuTargetColumnName + '")::numeric,2)';
          blueWaterQuery =
            'ROUND(sum("' + calcWFblueColumnName + '")::numeric,2)';
          waterTargetrQuery =
            'ROUND(AVG("' + waterTargetColumnName + '")::numeric,2)';

          queriesRequests =
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
          queriesRequests = queriesRequests.concat(", ", prefix3);
          prefix1.concat(" ", prefix2);

          break;

        case "2021":
          tableName = '"indicatorsScen2022"';
          queriesRequests = queriesRequests.concat(", ", prefix3);
          prefix1.concat(" ", prefix2);

          break;

        case "2022":
          tableName = "fabletargets";
          yearColumnName = "year";
          geoColumnName = "location";

          queriesRequests =
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
          suffix =
            'GROUP BY "' +
            yearColumnName +
            '" ORDER BY "' +
            yearColumnName +
            '"';

          break;
      }

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

    default:
      // == 2023 == "2023"

      var pathParts = route.split("/");
      var target = pathParts[0];
      var indicator = pathParts[1];
      var base = "";
      var queries = "";

      console.log("\ntarget: ", target);
      console.log("indicator: ", indicator, "\n");

      switch (target) {
        case "summary":
          queries = 'SELECT * FROM "dashboard2023_summary"';

          break;
        case "trade_report":
          queries =
            'SELECT "name", "year"  AS "Year",  ROUND("import_quantity"::numeric,2) as "Import_quantity", ROUND("export_quantity"::numeric,2) AS "Export_quantity"  FROM "ExtendedTrade2023"  WHERE "product"= $1 AND  "iteration"= $2 AND "scenathon_id"= $3 AND "pathway_id" =$4 ORDER BY "name","Year" ASC';
          break;
        case "greenhouse_gas_emissions":
          switch (indicator) {
            case "cumulative_co2_emissions_from_afolu_2020-2050":
              base =
              'SELECT ROUND((SUM("calccropco2")/1000)::numeric,6) AS "CalcCropCO2", ROUND(((SUM("calcdeforco2")+SUM("calcotherlucco2")+SUM("calcsequestco2")+SUM("calcpeatco2"))/1000)::numeric,6) AS "CalcAllLandCO2e" FROM indicators2023_view WHERE iteration = $1 AND "scenathon_id"=$2 AND "pathway_id" =$3 AND "year" >= 2020';

            if (country != "") {
              base += ' AND "Country" = $4';
            }

            queries = base;
              // var base1 =
              //   'SELECT "iteration", "scenathon_id", SUM("calccropco2")/1000 AS "CalcCropCO2", SUM("calcalllandco2e")/1000 AS "CalcAllLandCO2e" FROM indicators2023_view WHERE "iteration" = $1  AND "scenathon_id" = $2 AND "pathway_id" = $3 AND "year" >= 2020 ';
              // var base2 =
              //   'SELECT "iteration" AS "iteration_2020", (SUM("calccropco2") + SUM("calcalllandco2e")) AS "C02Sum2020" FROM indicators2023_view WHERE "iteration" = $1  AND "scenathon_id" = $2 AND "pathway_id" = $3 AND "year" = 2020';

              // if (country != "") {
              //   base1 += ' AND "Country" = $4';
              //   base2 += ' AND "Country" = $4';
              // }

              // var suffix1 =
              //   'GROUP BY "iteration", "scenathon_id", "pathway_id"';

              // var queries1 = base1.concat(" ", suffix1);
              // var queries2 = base2.concat(" ", suffix1);

              // queries =
              //   'SELECT ((mainTable."CalcCropCO2")*5) as "CalcCropCO2", ((mainTable."CalcAllLandCO2e")*5) as "CalcAllLandCO2e", joinedTable."C02Sum2020" FROM (' +
              //   queries1 +
              //   ") AS mainTable FULL JOIN (" +
              //   queries2 +
              //   ") AS joinedTable ON joinedTable.iteration_2020 = mainTable.iteration";

              break;

            case "total_agricultural_emissions_2050":
              var base1 =
                'SELECT "year", ROUND((SUM("calccropch4")/1000)::numeric,2)  AS "sumcalccropch4_2050", ROUND((SUM("calccropn2o")/1000)::numeric,2)  AS "sumcalccropn2o_2050", ROUND((SUM("calccropco2")/1000)::numeric,2)  AS "sumcalccropco2_2050", ROUND((SUM("calclivech4")/1000)::numeric,2) AS "sumcalclivech4_2050", ROUND((SUM("calcliven2o")/1000)::numeric,2) AS "sumcalcliven2o_2050" FROM indicators2023_view  WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" =$3 AND "year" = 2050 ';
              var base2 =
                'SELECT "year" AS "sum_year" , ROUND((SUM("calccropch4") + SUM("calccropn2o") + SUM("calccropco2") + SUM("calclivech4") + SUM("calcliven2o")/1000)::numeric,2)  AS "sumAll_2050" FROM indicators2023_view  WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" =$3  AND "year" = 2050 ';

              if (country != "") {
                base1 += ' AND "Country" = $4';
                base2 += ' AND "Country" = $4';
              }

              var suffix1 = 'GROUP BY "year"';

              var queries1 = base1.concat(" ", suffix1);
              var queries2 = base2.concat(" ", suffix1);

              queries =
                'SELECT  mainTable."sumcalccropch4_2050", mainTable."sumcalccropn2o_2050", mainTable."sumcalccropco2_2050", mainTable."sumcalclivech4_2050", mainTable."sumcalcliven2o_2050", joinedTable."sumAll_2050" FROM (' +
                queries1 +
                ") AS mainTable FULL JOIN (" +
                queries2 +
                ") AS joinedTable ON joinedTable.sum_year = mainTable.year";

              break;

            case "methane_emissions_from_crops_and_livestock":
              base =
                'SELECT ROUND((SUM("calccropch4_ch4"))::numeric,2) AS "CalcCropCH4",  ROUND((SUM("calclivech4_ch4"))::numeric,2) AS "CalcLiveCH4", "year" AS "Year" FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id"=$2 AND "pathway_id" =$3';

              if (country != "") {
                base += ' AND "Country" = $4';
              }

              suffix = 'GROUP BY "year" ORDER BY "year"';

              queries = base.concat(" ", suffix);

              break;

            case "annual_co2_emissions_from_land_use_change_and_on-farm_energy_use_by_source":
              base =
                'SELECT "year" AS "Year", ROUND((SUM("calccropco2")/1000)::numeric,6) AS "calccropco2", ROUND(((SUM("calcdeforco2")/1000)+(SUM("calcotherlucco2")/1000)+(SUM("calcsequestco2")/1000)+(SUM("calcpeatco2")/1000))::numeric,6) AS "calcalllandco2e"  FROM indicators2023_view WHERE iteration = $1 AND "scenathon_id"=$2 AND "pathway_id" =$3 AND year>2000';

              if (country != "") {
                base += ' AND "Country" = $4';
              }

              suffix = 'GROUP BY "year" ORDER BY "year"';

              queries = base.concat(" ", suffix);

              break;

            case "annual_ghg_emissions_from_crops_and_livestock_in_gt_co2e_by_country":
              base =
                'SELECT "Country", "year" AS "Year", ROUND(((SUM("calccropallco2e")/1000) + (SUM("calcliveallco2e")/1000))::NUMERIC,5) AS sumallco2e FROM indicators2023_view WHERE "iteration"=$1  AND "scenathon_id"=$2 AND "pathway_id" =$3 GROUP BY "Country", "Year" ORDER BY "Country", "Year"';

              if (country != "") {
                base =
                  'SELECT "Country", "year" AS "Year", ROUND(((SUM("calccropallco2e")/1000) + (SUM("calcliveallco2e")/1000))::NUMERIC,5) AS sumallco2e FROM indicators2023_view WHERE "iteration" = $1  AND "scenathon_id"=$2 AND "pathway_id" =$3  AND "Country" = $4 GROUP BY "Country", "Year" ORDER BY "Country", "Year"';
              }

              queries = base;

              break;

            case "annual_co2_emissions_from_land_use_change_and_on-farm_energy_use_by_country":
              base =
                'SELECT "Country", "year" AS "Year", ROUND(((SUM("calcdeforco2")/1000)+(SUM("calcotherlucco2")/1000)+(SUM("calcsequestco2")/1000)+(SUM("calcpeatco2")/1000)+(SUM("calccropco2")/1000))::numeric,6) AS calcalllandco2e FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id"=$2 AND "pathway_id" =$3 AND year>2000';

              if (country != "") {
                base += ' AND "Country" = $4';
              }

              suffix = 'GROUP BY "Country", "Year" ORDER BY "Country", "Year"';
              queries = base.concat(" ", suffix);

              break;
          }
          break; 
        case "biodiversity":
          switch (indicator) {
            case "cropland_area_under_agroecological_practices":
              var base =
                'SELECT "year", (sum(agroecosh*calccropland)/1000) as AgroecologicalPractices, (sum((1-agroecosh)*calccropland)/1000) as NOTAgroecologicalPractices FROM indicators2023_view WHERE "iteration"= $1 AND "scenathon_id"=$2 AND "pathway_id" =$3';

              suffix = ' GROUP BY "year" ORDER BY "year"';

              if (country != "") {
                base += ' AND "Country" = $4';
              }

              queries = base.concat(" ", suffix);

              break;

            case "area_of_land_where_natural_processes_predominate":
              var base =
                'SELECT YEAR, (sum(lnppmatureforest_expost)/1000) AS "LNPPMatureForest", (sum(lnppmatureotherland_expost)/1000) AS "LNPPMatureOtherLand", (sum(lnppnewforest)/1000) AS "LNPPNewForest", (sum(lnppnewotherland)/1000) AS "LNPPNewOtherLand" FROM indicators2023_view WHERE "iteration"=$1 AND "scenathon_id"=$2 AND "pathway_id" =$3';

              suffix = ' GROUP BY "year" ORDER BY "year"';

              if (country != "") {
                base += ' AND "Country" = $4';
              }

              queries = base.concat(" ", suffix);

              break;

            case "total_area_land_inside_protected_areas_or_other_effective_conservation_measures":
              var base =
                'SELECT YEAR, (SUM(ProtectedAreasForest)/1000) AS "ProtectedAreasForest", (sum(ProtectedAreasOtherNat)/1000) AS "ProtectedAreasOtherNat", (SUM(ProtectedAreasOther)/1000) AS "ProtectedAreasOther", (sum(OECMAreas)/1000) AS "OECMAreas" FROM indicators2023_view WHERE "iteration"= $1 AND "scenathon_id"=$2 AND "pathway_id" =$3';

              suffix = ' GROUP BY "year" ORDER BY "year"';

              if (country != "") {
                base += ' AND "Country" = $4';
              }

              queries = base.concat(" ", suffix);

              break;
            case "loss_of_forest":
              var base =
                'SELECT YEAR, (SUM(CalcForest)/1000) AS "CalcForest" FROM indicators2023_view WHERE "iteration"= $1 AND "scenathon_id"=$2 AND "pathway_id" =$3';

              suffix = '  GROUP BY "year" ORDER BY "year"';

              if (country != "") {
                base += ' AND "Country" = $4';
              }

              queries = base.concat(" ", suffix);

              break;
          }

          break;
        case "nitrogen_and_phosphorus":
          switch (indicator) {
            case "nitrogen_application":
              base =
                'SELECT year, (SUM(calcn_agsoils)/1000) AS sumcalcn_agsoils, (SUM(calcn_leftpasture)/1000) AS sumcalcn_leftpasture, (SUM(calcn_synth)/1000) AS sumcalcn_synth FROM "indicators2023_view" WHERE "iteration" = $1 AND "scenathon_id"=$2 AND "pathway_id" =$3';

              if (country != "") {
                base += ' AND "Country" = $4';
              }

              suffix = "GROUP BY year ORDER BY year";

              queries = base.concat(" ", suffix);

              break;

            case "phosphorus_application":
              base =
                'SELECT year, SUM(histp) AS sumhistp, SUM(totalp) AS sumtotalp FROM "indicators2023_view" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" =$3';

              if (country != "") {
                base += ' AND "Country" = $4';
              }

              suffix = "GROUP BY year ORDER BY year";

              queries = base.concat(" ", suffix);

              break;
          }

          break;
        case "food_security":
          switch (indicator) {
            case "average_daily_intake_per_capita_in_2030":
              queries =
                'SELECT "Country", alpha2, ROUND("kcal_feas"::numeric,2) AS "Kcal_feasible", ROUND("kcal_mder"::numeric,0) AS "Target_MDER" FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "year" = $3 AND "pathway_id" =$4 ';

              if (country != "") {
                queries += ' AND "Country" = $5';
              }

              break;

            case "evolution_of_daily_calories_intake_per_capita_by_country":
              queries ='SELECT year, ROUND("kcal_feas"::numeric,2) AS "Kcal_feasible", ROUND("kcal_mder"::numeric,0) AS "Target_MDER", ROUND("kcal_hist"::numeric,2) AS "HistKcal" FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" =$3 ';
              if (country != "") {
                queries += ' AND "Country" = $4 ORDER BY year';
              }else{
                queries += ' ORDER BY year';
              }
              // var base1;
              // var base2;

              // base1 =
              //   'SELECT * FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" =$3 ';

              // base2 =
              //   'SELECT  "year", SUM(ROUND("population"::numeric, 2)) AS "TotalPopulation", (SUM(histkcal)/COUNT(DISTINCT("Country"))) AS "histkcal" FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" =$3 ';

              // if (country != "") {
              //   base1 += ' AND "Country" = $4';
              //   base2 += ' AND "Country" = $4';
              // }

              // base1 += ' AND "year" >= 2000';
              // base2 += ' AND "year" >= 2000 GROUP BY "year" ORDER BY "year"';

              // base =
              //   'SELECT mainTable."Country" AS "Country", mainTable."year" AS "Year",  ROUND(mainTable."population"::numeric, 2) AS "Population", joinedtable."TotalPopulation",ROUND((mainTable."population"/joinedtable."TotalPopulation")::numeric, 2)  AS "CountryPopulationRatio",ROUND(mainTable."kcal_feas"::numeric,2) AS "Kcal_feasible", ROUND(((mainTable."population"* mainTable."kcal_feas")/joinedtable."TotalPopulation")::numeric, 2)  AS "CountryKcalFeasible", ROUND(mainTable."kcal_mder"::numeric,0) AS "Target_MDER", joinedtable."histkcal" AS "histkcal" FROM (' +
              //   base1 +
              //   ") AS mainTable FULL JOIN (" +
              //   base2 +
              //   ") AS joinedTable ON joinedtable.year = mainTable.year";

              // queries = base;
              break;

            case "prevalence_of_undernourishment_in_2030":
                queries =
                  'SELECT "Country", alpha2, ROUND("pou_computed"::numeric,2) AS "Pou_Computed" FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "year" = $3 AND "pathway_id" =$4 ';
  
                if (country != "") {
                  queries += ' AND "Country" = $5';
                }
  
                break;
  
            case "evolution_of_prevalence_of_undernourishment_by_country":
                queries =
                  'SELECT year, ROUND("pou_computed"::numeric,2) AS "Pou_Computed" FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" =$3 ';
  
                if (country != "") {
                  queries += ' AND "Country" = $4 ORDER BY year';
                }else{
                  queries += ' ORDER BY year';
                }
                // var base1;
                // var base2;
  
                // base1 =
                //   'SELECT * FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" =$3 ';
  
                // base2 =
                //   'SELECT  "year", SUM(ROUND("population"::numeric, 2)) AS "TotalPopulation", (SUM(histkcal)/COUNT(DISTINCT("Country"))) AS "histkcal" FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" =$3 ';
  
                // if (country != "") {
                //   base1 += ' AND "Country" = $4';
                //   base2 += ' AND "Country" = $4';
                // }
  
                // base1 += ' AND "year" >= 2000';
                // base2 += ' AND "year" >= 2000 GROUP BY "year" ORDER BY "year"';
  
                // base =
                //   'SELECT mainTable."Country" AS "Country", mainTable."year" AS "Year",  ROUND(mainTable."population"::numeric, 2) AS "Population", joinedtable."TotalPopulation",ROUND((mainTable."population"/joinedtable."TotalPopulation")::numeric, 2)  AS "CountryPopulationRatio",ROUND(mainTable."kcal_feas"::numeric,2) AS "Kcal_feasible", ROUND(((mainTable."population"* mainTable."kcal_feas")/joinedtable."TotalPopulation")::numeric, 2)  AS "CountryKcalFeasible", ROUND(mainTable."kcal_mder"::numeric,0) AS "Target_MDER", joinedtable."histkcal" AS "histkcal" FROM (' +
                //   base1 +
                //   ") AS mainTable FULL JOIN (" +
                //   base2 +
                //   ") AS joinedTable ON joinedtable.year = mainTable.year";
  
                // queries = base;
                break;
  
              
            case "share_of_undernourished":
            case "share_of_obese":
              base =
                'SELECT "Year",  ROUND(((SUM("calcliveallco2e")+(SUM("calccropallco2e")))/1000)::numeric,2) AS "Total_GHG_agric" FROM "indicatorsScen2022" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" =$3';
              suffix = ' GROUP BY "Year" ORDER BY "Year"';

              if (country != "") {
                base += ' AND "Country" = $4';
              }

              queries = base.concat(" ", suffix);
              break;
          }

          break;
        case "water":
          switch (indicator) {
            case "water_use_for_irrigation":
              base = 'SELECT "year" AS "Year", ROUND((SUM("water_requirement")/ 1000)::numeric,5)  AS "calcwfblue" FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id"=$2 AND "pathway_id" =$3 AND "year" >= 2000 ';
                // 'SELECT "year" AS "Year", ROUND((SUM("water_requirement")/ 1000)::numeric,5)  AS "calcwfblue", (SUM(histwaterirrigation)/1000) AS "histwaterirrigation" FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id"=$2 AND "pathway_id" =$3 AND "year" >= 2000 ';

              suffix = 'GROUP BY "year" ORDER BY "year"';

              if (country != "") {
                base += ' AND "Country" = $4';
              }

              queries = base.concat(" ", suffix);

              break;

            case "water_use_for_irrigation_by_country":
              base1 =
                'SELECT "Country", "year" AS "Year", ROUND((SUM("water_requirement")/ 1000)::numeric,5) AS "calcwfblue" FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id"=$2 AND "pathway_id" =$3 AND "year" >= 2000 ';
              base2 =
                'SELECT year, SUM(histwaterirrigation) AS "histwaterirrigation" FROM indicators2023_view WHERE "iteration" = $1 AND "scenathon_id"=$2 AND "pathway_id" =$3 AND "year" >= 2000 ';

              if (country != "") {
                base1 += ' AND "Country" = $4';
                base2 += ' AND "Country" = $4';
              }
              suffix = 'GROUP BY "Country","year" ORDER BY "Country","year"';
              suffix1 = 'group BY "year" ORDER BY "year"';
              base1 = base1.concat(" ", suffix);
              base2 = base2.concat(" ", suffix1);

              queries = base1;

              // queries =
              //   'Select maintable."Country", maintable."Year" AS "Year", maintable."calcwfblue", jointable."histwaterirrigation" FROM (' +
              //   base1 +
              //   ") AS maintable JOIN (" +
              //   base2 +
              //   ') AS jointable ON maintable."Year" = jointable.year';

              break;
          }

          break;
        case "socioeconomics":
          switch (indicator.trim()) {
            case "employment_in_agriculture_eat_food_groups":
              var addcountry = "";

              if (country != "") {
                addcountry = " AND name = $4 ";
              }
              var base1 =
                'SELECT a.year AS year, a.rice AS rice, b.sugar AS sugar, c.roots as roots, d.wheat as wheat, e.legumes AS legumes, f.oil_veg AS oil_veg,g.othr_grains AS othr_grains,h.soybeans AS soybeans,i.nuts_seeds AS nuts_seeds,j.maize AS maize FROM (SELECT year, sum(workersfte::DOUBLE PRECISION) AS "rice" FROM "ExtendedTrade2023" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" = $3 ' +
                addcountry +
                'AND eat_foodgroup = \'rice\' group BY "year" ORDER BY "year") a JOIN (SELECT year, sum(workersfte::DOUBLE PRECISION) AS "sugar" FROM "ExtendedTrade2023" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" = $3 ' +
                addcountry +
                'AND eat_foodgroup = \'sugar\' GROUP BY "year" ORDER BY  "year") b ON a.year = b.year JOIN (SELECT year, sum(workersfte::DOUBLE PRECISION) AS "roots" FROM "ExtendedTrade2023" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" = $3 ' +
                addcountry +
                'AND eat_foodgroup = \'roots\' group BY "year" ORDER BY  "year") c on a.year = c.year JOIN (SELECT year, sum(workersfte::DOUBLE PRECISION) AS "wheat" FROM "ExtendedTrade2023" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" = $3 ' +
                addcountry +
                'AND eat_foodgroup = \'wheat\' group BY "year" ORDER BY  "year") d on a.year = d.year JOIN (SELECT year, sum(workersfte::DOUBLE PRECISION) AS "legumes" FROM "ExtendedTrade2023" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" = $3 ' +
                addcountry +
                'AND eat_foodgroup = \'legumes\' group BY "year" ORDER BY  "year") e on a.year = e.year JOIN (SELECT year, sum(workersfte::DOUBLE PRECISION) AS "oil_veg" FROM "ExtendedTrade2023" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" = $3 ' +
                addcountry +
                'AND eat_foodgroup = \'oil_veg\' group BY "year" ORDER BY "year") f on a.year = f.year JOIN (SELECT year, sum(workersfte::DOUBLE PRECISION) AS "othr_grains" FROM "ExtendedTrade2023" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" = $3 ' +
                addcountry +
                'AND eat_foodgroup = \'othr_grains\' group BY "year" ORDER BY "year") g on a.year = g.year JOIN (SELECT year, sum(workersfte::DOUBLE PRECISION) AS "soybeans" FROM "ExtendedTrade2023" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" = $3 ' +
                addcountry +
                'AND eat_foodgroup = \'soybeans\' group BY "year" ORDER BY "year") h on a.year = h.year JOIN (SELECT year, sum(workersfte::DOUBLE PRECISION) AS "nuts_seeds" FROM "ExtendedTrade2023" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" = $3 ' +
                addcountry +
                'AND eat_foodgroup = \'nuts_seeds\' group BY "year" ORDER BY  "year") i on a.year = i.year JOIN (SELECT year, sum(workersfte::DOUBLE PRECISION) AS "maize" FROM "ExtendedTrade2023" WHERE "iteration" = $1 AND "scenathon_id" = $2 AND "pathway_id" = $3 ' +
                addcountry +
                ' AND eat_foodgroup = \'maize\' group BY "year" ORDER BY "year") j on a.year = j.year';

              queries = base1;
              break;

            case "employment_in_agriculture_crops_vs_livestock":
              var base1 =
                "SELECT year, sum(workersfte::DOUBLE PRECISION) AS crops FROM " +
                '"ExtendedTrade2023" WHERE iteration = $1 AND scenathon_id = $2 AND pathway_id = $3 AND product_type = ' +
                " 'crops'";
              var base2 =
                "SELECT year, sum(workersfte::DOUBLE PRECISION) AS livestock FROM " +
                '"ExtendedTrade2023" WHERE iteration = $1 AND scenathon_id = $2 AND pathway_id = $3 AND product_type = ' +
                " 'livestock'";

              if (country != "" && product != "") {
                base1 += ' AND "name" = $5 AND "product" = $4';
                base2 += ' AND "name" = $5 AND "product" = $4';
              } else {
                if (country != "" && product == "") {
                  console.log("entro con el filtro de country");
                  base1 += ' AND "name" =$4';
                  base2 += ' AND "name" =$4 ';
                } else if (country == "" && product != "") {
                  console.log("entro con el filtro de product");
                  base1 += ' AND "product" = $4';
                  base2 += ' AND "product" = $4';
                }
              }

              base1 += ' GROUP BY  "year" ORDER BY  "year"';
              base2 += ' GROUP BY  "year" ORDER BY  "year"';

              base =
                'SELECT cropsTable.year AS "year", cropsTable.crops AS crops, livestockTable.livestock AS livestock FROM (' +
                base1 +
                ") AS cropsTable FULL JOIN  (" +
                base2 +
                ") AS livestockTable ON cropsTable.year = livestockTable.year ORDER BY  cropsTable.year";
              queries = base;
              break;

            case "total_costs_of_production":
              var base1 = 'SELECT * FROM "ExtendedTrade2023"';
              var base2 = 'SELECT "alpha2", "name" AS CountryName FROM country';

              base =
                'SELECT mainTable."year", SUM(mainTable."workersfte"::DOUBLE PRECISION) AS "SumWorkersFTE", SUM(mainTable."fertilizercost"::DOUBLE PRECISION) AS "SumFertilizerCost", SUM(mainTable."labourcost"::DOUBLE PRECISION) AS "SumLabourCost", SUM(mainTable."machineryrunningcost"::DOUBLE PRECISION) AS "SumMachineryRunningCost", SUM(mainTable."dieselcost"::DOUBLE PRECISION) AS "SumDieselCost", SUM(mainTable."pesticidecost"::DOUBLE PRECISION) AS "SumPesticideCost" FROM (' +
                base1 +
                ") AS mainTable FULL JOIN (" +
                base2 +
                ') AS joinedTable ON joinedTable.alpha2 = mainTable.country WHERE "scenathon_id" = $2 AND "iteration" =$1 AND "pathway_id" =$3';

              if (country != "" && product != "") {
                base += ' AND "product" = $4 AND "countryname" = $5';
              } else {
                if (country != "" && product == "") {
                  base += ' AND "countryname" = $4';
                } else {
                  if (country == "" && product != "") {
                    base += ' AND "product" = $4';
                  }
                }
              }

              var suffix1 =
                'GROUP BY mainTable."year" ORDER BY mainTable."year"';

              queries = base.concat(" ", suffix1);

              break;

            case "get_country_products":
              var base1 =
                'SELECT mainTable."product", SUM(mainTable."workersfte":: DOUBLE PRECISION) AS "sumWorkersFTE" FROM (SELECT * FROM "ExtendedTrade2023") AS mainTable FULL JOIN (SELECT "alpha2", "name" AS  countryname FROM country) AS joinedTable ON joinedTable.alpha2 = mainTable.country WHERE "scenathon_id" = $1 AND "iteration" = $2  AND "pathway_id" =$3';

              if (country != "") {
                base1 += ' AND "countryname" = $4';
              }

              var suffix1 = 'GROUP BY "product"';

              var queries1 = base1.concat(" ", suffix1);

              queries =
                "SELECT * FROM (" +
                queries1 +
                ') AS mainTable2 WHERE "sumWorkersFTE" > 0';

              break;
          }

          break;
      }

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
      ' WHERE "scenathon_id" = ' +
        scenathon_id +
        ' AND  "' +
        productColumnName +
        '" IS NOT NULL'
    );
  }

  query_to_fetch = query_to_fetch.concat(
    ' ORDER BY "' + productColumnName + '"'
  );
  console.log("getProductList: query_to_fetch: ", query_to_fetch);

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

const getCountryListForIteration = async (
  table,
  local_client,
  scenathon_id,
  sub_component_id,
  sub_component_label
) => {
  var country_column = "";

  switch (table) {
    case "fabletargets":
      country_column = "location";
      break;
    default:
      country_column = "Country";
      break;
  }

  // console.log("country_column: ", country_column);

  const conditionPrefix =
    "WHERE " +
    sub_component_label +
    " = " +
    sub_component_id +
    " AND scenathon_id = ";

  const country_list = await getScenathonMetaData(
    local_client,
    country_column,
    table,
    conditionPrefix + scenathon_id
  );

  // console.log("country_list: ", country_list);
  return country_list;
};

const getPathwayCountryListForIteration = async (
  table,
  local_client,
  scenathon_id,
  pathway_id,
  iteration_id
) => {
  var country_column = "Country";

  const conditionPrefix =
    "WHERE pathway_id = " +
    pathway_id +
    " AND scenathon_id = " +
    scenathon_id +
    " AND iteration = " +
    iteration_id;

  const country_list = await getScenathonMetaData(
    local_client,
    country_column,
    table,
    conditionPrefix
  );

  return country_list;
};

const getCountryList = async (
  table,
  local_client,
  scenathon_id,
  sub_component_list,
  sub_component_label
) => {
  countries_object = {};

  console.log("sub_component_list: ", sub_component_list);
  console.log("sub_component_label: ", sub_component_label);

  for (var i = 0; i < sub_component_list.length; i++) {
    const sub_component_id = sub_component_list[i];

    console.log("sub_component_id: ", sub_component_id);

    var country_list = await getCountryListForIteration(
      table,
      local_client,
      scenathon_id,
      sub_component_id,
      sub_component_label
    );

    countries_object[sub_component_id] = country_list;
    // if(country_list.length > 0){
    //   countries_object[iteration_id] = country_list;
    // }
  }

  var response = {};
  response[sub_component_label] = countries_object;

  return response;
};

const getPathwayCountryList = async (
  table,
  local_client,
  scenathon_id,
  pathway_list,
  before_iteration_id,
  before_iteration_id_private
) => {
  countries_object = {};

  console.log("pathway_list: ", pathway_list);

  for (var i = 0; i < pathway_list.length; i++) {
    const pathway_id = pathway_list[i];

    console.log("pathway_id: ", pathway_id);

    const iteration_list = await getScenathonMetaData(
      local_client,
      "iteration",
      "indicators2023_view",
      "WHERE " +
        '"scenathon_id"= ' +
        scenathon_id +
        ' AND "pathway_id" = ' +
        pathway_id
    );

    console.log("iteration_list: ", iteration_list);

    var country_list_per_iteration = {};
    country_list_per_iteration["iteration"] = {};

    var iterationLabel = "";

    for (var j = 0; j < iteration_list.length; j++) {
      const iteration_id = iteration_list[j];
      switch (iteration_id) {
        case before_iteration_id:
          iterationLabel = "Before";
          break;

        case before_iteration_id + 1:
          iterationLabel = "After";
          break;

        case before_iteration_id_private:
          iterationLabel = "Before";
          break;
  
        case before_iteration_id_private + 1:
          iterationLabel = "After";
          break;

        default:
          iterationLabel = "" + iteration_id;
          break;
      }

      console.log("iteration_id: ", iteration_id);
      console.log("iterationLabel: ", iterationLabel);

      var country_list = await getPathwayCountryListForIteration(
        table,
        local_client,
        scenathon_id,
        pathway_id,
        iteration_id
      );

      country_list_per_iteration["iteration"][iteration_id] = {};
      country_list_per_iteration["iteration"][iteration_id]["countries"] =
        country_list;
      country_list_per_iteration["iteration"][iteration_id]["iterationLabel"] =
        iterationLabel;
    }

    countries_object[pathway_id] = country_list_per_iteration;
  }

  var response = {};
  response["pathways"] = countries_object;

  return response;
};

const getScenathonCache = async (local_client) => {
  const years = [2019, 2020, 2021, 2022, 2023];

  console.log("local_client: ", local_client);
  // const years = [2023];

  const tables = [
    //scenathon ids
    '"indicatorsScen2019"',
    '"resultsScen2020"',
    '"indicatorsScen2022"',
    "fabletargets",
    "indicators2023_view",
  ];

  const nettrade_tables = [
    //product tables
    "nettrade2019", //name
    "nettrade", //name
    "nettrade2022", //name
    "fableproducts", //location
    "ExtendedTrade2023", //country_name
  ];

  const scenathon_ids = [5, 6, 7, 8, 9, 10, 16];
  const before = [1, 3, 2, 4, 5, 6, 50];
  const after = [2, 4, 1, 1, 2, 3, 50];

  var year_counter = 0;

  var cache = {};

  for (var i = 0; i < years.length; i++) {
    year_counter = year_counter + 1;

    var table = tables[i];
    var year = years[i];

    console.log("\n*****************");
    console.log("year: ", year);
    console.log("*****************\n");

    var nettrade_table = nettrade_tables[i];

    if (year >= 2022) {
      productColumnName = "product";
    } else {
      productColumnName = "Product";
    }

    var scenathon_id = -1;

    var scenathon_id_list = [];

    if (year != 2019) {
      if (year >= 2023) {
        console.log("ALL FINE year: ", year);
        pathway_label_id_list = await getScenathonMetaData(
          local_client,
          "id",
          "pathways",
          "WHERE year = " + year
        );

        pathway_label_list = await getScenathonMetaData2(
          local_client,
          "name",
          "pathways",
          "WHERE year = " + year
        );

        pathway_ref_list = await getScenathonMetaData(
          local_client,
          "reference",
          "pathways",
          "WHERE year = " + year
        );

        console.log("pathway_label_id_list: ", pathway_label_id_list);
        console.log("pathway_label_list: ", pathway_label_list);
        console.log("pathway_ref_list: ", pathway_ref_list);

        var pathway_ref_id = "";
        const year_string = year.toString();

        if (pathway_ref_list[0].includes(year_string)) {
          pathway_ref_id = pathway_ref_list[0].replace(year_string, "");
          //if(props.type === "1"){
          before_iteration_id = await getScenathonMetaData(
            local_client,
            "dashboard_iteration",
            "scenathon",
            "WHERE id = " + pathway_ref_id
          );
          // }else{
          before_iteration_id_type2 = await getScenathonMetaData(
            local_client,
            "iteration",
            "scenathon",
            "WHERE id = " + pathway_ref_id
          );
          // }

          console.log("before_iteration_id: ", before_iteration_id);
          console.log("before_iteration_id_type2: ", before_iteration_id_type2);
        }
      }

      scenathon_id_list = await getScenathonMetaData(
        local_client,
        "scenathon_id",
        table,
        ""
      );

      if (scenathon_id_list) {
        // console.log('scenathon_id_list exists');

        for (var j = 0; j < scenathon_id_list.length; j++) {
          scenathon_id = scenathon_id_list[j];

          const products_list = await getProductList(
            local_client,
            nettrade_table,
            scenathon_id,
            productColumnName
          );

          console.log("products_list: ", products_list);

          var conditionPrefix = "WHERE scenathon_id = ";

          if (year >= 2023) {
            conditionPrefix += scenathon_id;

            console.log("conditionPrefix: ", conditionPrefix);
            console.log("get pathways for scenathon_id: ", scenathon_id);
            console.log("table: ", table);

            const pathway_list = await getScenathonMetaData(
              local_client,
              "pathway_id",
              table,
              conditionPrefix
            );

            console.log(
              "pathway_list from scenathon_id " + scenathon_id + " : \n",
              JSON.stringify(pathway_list)
            );

            if (pathway_list) {
              // console.log('iteration_list exists');

              var pathways_object = {};
              var products_object = {};

              if (cache[year]) {
                console.log("cache[" + year + "] exists");

                pathways_object = cache[year]["scenathon_id"];
                products_object = cache[year]["products"];
              }

              var table_to_get_countries = table;

              var scenathon_country_object = await getPathwayCountryList(
                table_to_get_countries,
                local_client,
                scenathon_id,
                pathway_list,
                before_iteration_id[0],
                before_iteration_id_type2[0],
              );

              console.log(
                "OLD scenathon_country_object: ",
                scenathon_country_object
              );

              // get the keys and save them in a list
              const pathway_id_list = Object.keys(
                scenathon_country_object["pathways"]
              );

              for (var k = 0; k < pathway_list.length; k++) {
                const pathway_label = pathway_label_list[k];
                scenathon_country_object["pathways"][pathway_id_list[k]][
                  "label"
                ] = pathway_label;
              }

              console.log(
                "NEW scenathon_country_object: ",
                scenathon_country_object
              );

              iterations_object[scenathon_id] = scenathon_country_object;

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
          } else {
            const iteration_list = await getScenathonMetaData(
              local_client,
              "iteration",
              table,
              conditionPrefix + scenathon_id
            );
            
            if (iteration_list) {
              // console.log('iteration_list exists');

              var iterations_object = {};
              var products_object = {};

              if (cache[year]) {
                iterations_object = cache[year]["scenathon_id"];
                products_object = cache[year]["products"];
              }

              var table_to_get_countries = table;

              var scenathon_country_object = await getCountryList(
                table_to_get_countries,
                local_client,
                scenathon_id,
                iteration_list,
                "iteration"
              );

              var scenathon_label = await getScenathonLabel(scenathon_id);
              var iterationsList = Object.keys(
                scenathon_country_object["iteration"]
              );

              var iterationsObject = {};

              for (var k = 0; k < iterationsList.length; k++) {
                const iteration_id = iterationsList[k];

                iterationsObject[iteration_id] = iteration_id;

                // if (year >= 2023) {
                //   //aqui debe ir el if
                //   if (iteration_id == before_iteration_id_type2[0]) {
                //     iterationsObject[iteration_id] = "before_type2";
                //   } else {
                //     if (iteration_id == before_iteration_id_type2[0] + 1) {
                //       iterationsObject[iteration_id] = "after_type2";
                //     }
                //   }
                  
                //   if (iteration_id == before_iteration_id[0]) {
                //     iterationsObject[iteration_id] = "before";
                //   } else {
                //     if (iteration_id == before_iteration_id[0] + 1) {
                //       iterationsObject[iteration_id] = "after";
                //     }
                //   }
                // }
              }

              iterations_object[scenathon_id] = {
                iterations: iterationsObject,
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
        }
      } else {
        console.log("No scenathon id data found for table: " + table);
      }
    } else {
      const products_list = await getProductList(
        (local_client = local_client),
        (nettrade_table = nettrade_table),
        (scenathon_id = null),
        (productColumnName = productColumnName)
      );

      cache[year] = {
        table: table,
        nettrade_table: nettrade_table,
        products: products_list,
        iterations: ["5", "50"],
      };
    }
  }

  return cache;
};

const upateDatabaseCache = async () => {
  const local_client = await getClient();

  cache = await getScenathonCache(local_client);

  await local_client.end();

  console.log("Database Cache Updated");

  fs.writeFileSync("./Api/scenathon_cache" + ".json", JSON.stringify(cache));

  return cache;
};

const getScenathonLabel = async (scenathon_id) => {
  const all_labels = fs.readFileSync("./Api/scenathon_id_labels.json", {
    encoding: "utf8",
    flag: "r",
  });

  const all_labels_object = JSON.parse(all_labels);

  console.log("getScenathonLabel: all_labels_object: ", all_labels_object);
  console.log("getScenathonLabel: scenathon_id: ", scenathon_id);

  var response = all_labels_object["scenathon_id"][scenathon_id]
    ? all_labels_object["scenathon_id"][scenathon_id]
    : "" + scenathon_id;

  console.log("getScenathonLabel: response: ", response);
  return response;
};

module.exports = { respondRequest, upateDatabaseCache };
