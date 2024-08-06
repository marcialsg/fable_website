import ChartCharacteristics from '../../data/ChartCharacteristics.json';

const responseApi = response => {


  function ByTargetCharts(ChartCharacteristics, data) {
    this.data = data;
    this.type = ChartCharacteristics[0]["type"];
    this.label = ChartCharacteristics[0]["label"];
    this.borderColor = ChartCharacteristics[0]["borderColor"];
    this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];

  }

  var labels = [];
  var datos = [];
  var gdp = [];
  var population = [];
  var kcal_hist = [];
  var kcal_targ = [];
  var kcal_feas = [];
  var fat_feas = [];
  var prot_feas = [];
  var kcal_mder = [];
  var histbiodivlnd = [];
  var calcbiodivlnd = [];
  var biodivtarget = [];
  var protectedareasforest = [];
  var protectedareasothernat = [];
  var protectedareasother = [];
  var cropbiodiv = [];
  var histcropland = [];
  var histharvarea = [];
  var histpasture = [];
  var histurban = [];
  var histforest = [];
  var histotherland = [];
  var calccropland = [];
  var calcpasture = [];
  var calcforest = [];
  var calcnewforest = [];
  var calcotherland = [];
  var calcurban = [];
  var totalland = [];
  var forestchange = [];
  var newforestchange = [];
  var netforestchange = [];
  var histcropallco2e = [];
  var histcropco2 = [];
  var histcropn2o = [];
  var histcropch4 = [];
  var calccropallco2e = [];
  var calccropn2o = [];
  var calccropch4 = [];
  var calccropco2 = [];
  var histliveallco2e = [];
  var histliven2o = [];
  var histlivech4 = [];
  var calcliveallco2e = [];
  var calclivech4 = [];
  var calcliven2o = [];
  var calcallagrico2e = [];
  var calcdeforco2 = [];
  var calcotherlucco2 = [];
  var calcsequestco2 = [];
  var calcpeatco2 = [];
  var calcalllandco2e = [];
  var ghgbiofuels = [];
  var histwfgreen = [];
  var histwfblue = [];
  var histwfgrey = [];
  var calcwfgreen = [];
  var calcwfblue = [];
  var calcwfgrey = [];
  var calcsequestaband = [];
  var calcsequestaffor = [];

  var banGDP, banpopulation, bankcal_hist, bankcal_targ, bankcal_feas, banfat_feas, banprot_feas, bankcal_mder, banhistbiodivlnd, banbiodivtarget, bancalcbiodivlnd, banprotectedareasforest,
    banprotectedareasothernat, banprotectedareasother, bancropbiodiv, banhistcropland, banhistharvarea, banhistpasture, banhisturban, banhistforest, banhistotherland, bancalccropland, bancalcpasture,
    bancalcforest, bancalcnewforest, bancalcotherland, bancalcurban, bantotalland, banforestchange, bannewforestchange, bannetforestchange, banhistcropallco2e, banhistcropco2, banhistcropn2o,
    banhistcropch4, bancalccropallco2e, bancalccropn2o, bancalccropch4, bancalccropco2, banhistliveallco2e, banhistliven2o, banhistlivech4, bancalcliveallco2e, bancalclivech4, bancalcliven2o,
    bancalcallagrico2e, bancalcdeforco2, bancalcotherlucco2, bancalcsequestco2, bancalcpeatco2, bancalcalllandco2e, banghgbiofuels, banhistwfgreen, banhistwfblue, banhistwfgrey, bancalcwfgreen,
    bancalcwfblue, bancalcwfgrey, bancalcsequestaband, bancalcsequestaffor;

  response = response.queryResponse;

  console.log("ByTargetChartService.jsx");
  console.log("response:");
  console.log(response);

  if (response.length !== 0) {

    response.forEach(item => {
      labels.push(item.iteration);
      gdp.push(item.gdp);
      if (item.gdp) {
        banGDP = "1";
      } else {
        banGDP = "0";
      }
      population.push(item.population);
      if (item.population) {
        banpopulation = "1";
      } else {
        banpopulation = "0";
      }
      kcal_hist.push(item.kcal_hist);
      if (item.kcal_hist) {
        bankcal_hist = "1";
      } else {
        bankcal_hist = "0";
      }
      kcal_targ.push(item.kcal_targ);
      if (item.kcal_targ) {
        bankcal_targ = "1";
      } else {
        bankcal_targ = "0";
      }
      kcal_feas.push(item.kcal_feas);
      if (item.kcal_feas) {
        bankcal_feas = "1";
      } else {
        bankcal_feas = "0";
      }
      fat_feas.push(item.fat_feas);
      if (item.fat_feas) {
        banfat_feas = "1";
      } else {
        banfat_feas = "0";
      }
      prot_feas.push(item.prot_feas);
      if (item.prot_feas) {
        banprot_feas = "1";
      } else {
        banprot_feas = "0";
      }
      kcal_mder.push(item.kcal_mder);
      if (item.kcal_mder) {
        bankcal_mder = "1";
      } else {
        bankcal_mder = "0";
      }
      histbiodivlnd.push(item.histbiodivlnd);
      if (item.histbiodivlnd) {
        banhistbiodivlnd = "1";
      } else {
        banhistbiodivlnd = "0";
      }
      calcbiodivlnd.push(item.calcbiodivlnd);
      if (item.calcbiodivlnd) {
        bancalcbiodivlnd = "1";
      } else {
        bancalcbiodivlnd = "0";
      }
      biodivtarget.push(item.biodivtarget);
      if (item.biodivtarget) {
        banbiodivtarget = "1";
      } else {
        banbiodivtarget = "0";
      }
      protectedareasforest.push(item.protectedareasforest);
      if (item.protectedareasforest) {
        banprotectedareasforest = "1";
      } else {
        banprotectedareasforest = "0";
      }
      protectedareasothernat.push(item.protectedareasothernat);
      if (item.protectedareasothernat) {
        banprotectedareasothernat = "1";
      } else {
        banprotectedareasothernat = "0";
      }
      protectedareasother.push(item.protectedareasother);
      if (item.protectedareasother) {
        banprotectedareasother = "1";
      } else {
        banprotectedareasother = "0";
      }
      cropbiodiv.push(item.cropbiodiv);
      if (item.cropbiodiv) {
        bancropbiodiv = "1";
      } else {
        bancropbiodiv = "0";
      }
      histcropland.push(item.histcropland);
      if (item.histcropland) {
        banhistcropland = "1";
      } else {
        banhistcropland = "0";
      }
      histharvarea.push(item.histharvarea);
      if (item.histharvarea) {
        banhistharvarea = "1";
      } else {
        banhistharvarea = "0";
      }
      histpasture.push(item.histpasture);
      if (item.histpasture) {
        banhistpasture = "1";
      } else {
        banhistpasture = "0";
      }
      histurban.push(item.histurban);
      if (item.histurban) {
        banhisturban = "1";
      } else {
        banhisturban = "0";
      }
      histforest.push(item.histforest);
      if (item.histforest) {
        banhistforest = "1";
      } else {
        banhistforest = "0";
      }
      histotherland.push(item.histotherland);
      if (item.histotherland) {
        banhistotherland = "1";
      } else {
        banhistotherland = "0";
      }
      calccropland.push(item.calccropland);
      if (item.calccropland) {
        bancalccropland = "1";
      } else {
        bancalccropland = "0";
      }
      calcpasture.push(item.calcpasture);
      if (item.calcpasture) {
        bancalcpasture = "1";
      } else {
        bancalcpasture = "0";
      }
      calcforest.push(item.calcforest);
      if (item.calcforest) {
        bancalcforest = "1";
      } else {
        bancalcforest = "0";
      }
      calcnewforest.push(item.calcnewforest);
      if (item.calcnewforest) {
        bancalcnewforest = "1";
      } else {
        bancalcnewforest = "0";
      }
      calcotherland.push(item.calcotherland);
      if (item.calcotherland) {
        bancalcotherland = "1";
      } else {
        bancalcotherland = "0";
      }
      calcurban.push(item.calcurban);
      if (item.calcurban) {
        bancalcurban = "1";
      } else {
        bancalcurban = "0";
      }
      totalland.push(item.totalland);
      if (item.totalland) {
        bantotalland = "1";
      } else {
        bantotalland = "0";
      }
      forestchange.push(item.forestchange);
      if (item.forestchange) {
        banforestchange = "1";
      } else {
        banforestchange = "0";
      }
      newforestchange.push(item.newforestchange);
      if (item.newforestchange) {
        bannewforestchange = "1";
      } else {
        bannewforestchange = "0";
      }
      netforestchange.push(item.netforestchange);
      if (item.netforestchange) {
        bannetforestchange = "1";
      } else {
        bannetforestchange = "0";
      }
      histcropallco2e.push(item.histcropallco2e);
      if (item.histcropallco2e) {
        banhistcropallco2e = "1";
      } else {
        banhistcropallco2e = "0";
      }
      histcropco2.push(item.histcropco2);
      if (item.histcropco2) {
        banhistcropco2 = "1";
      } else {
        banhistcropco2 = "0";
      }
      histcropn2o.push(item.histcropn2o);
      if (item.histcropn2o) {
        banhistcropn2o = "1";
      } else {
        banhistcropn2o = "0";
      }
      histcropch4.push(item.histcropch4);
      if (item.histcropch4) {
        banhistcropch4 = "1";
      } else {
        banhistcropch4 = "0";
      }
      calccropallco2e.push(item.calccropallco2e);
      if (item.calccropallco2e) {
        bancalccropallco2e = "1";
      } else {
        bancalccropallco2e = "0";
      }
      calccropn2o.push(item.calccropn2o);
      if (item.calccropn2o) {
        bancalccropn2o = "1";
      } else {
        bancalccropn2o = "0";
      }
      calccropch4.push(item.calccropch4);
      if (item.calccropch4) {
        bancalccropch4 = "1";
      } else {
        bancalccropch4 = "0";
      }
      calccropco2.push(item.calccropco2);
      if (item.calccropco2) {
        bancalccropco2 = "1";
      } else {
        bancalccropco2 = "0";
      }
      histliveallco2e.push(item.histliveallco2e);
      if (item.histliveallco2e) {
        banhistliveallco2e = "1";
      } else {
        banhistliveallco2e = "0";
      }
      histliven2o.push(item.histliven2o);
      if (item.histliven2o) {
        banhistliven2o = "1";
      } else {
        banhistliven2o = "0";
      }
      histlivech4.push(item.histlivech4);
      if (item.histlivech4) {
        banhistlivech4 = "1";
      } else {
        banhistlivech4 = "0";
      }
      calcliveallco2e.push(item.calcliveallco2e);
      if (item.calcliveallco2e) {
        bancalcliveallco2e = "1";
      } else {
        bancalcliveallco2e = "0";
      }
      calclivech4.push(item.calclivech4);
      if (item.calclivech4) {
        bancalclivech4 = "1";
      } else {
        bancalclivech4 = "0";
      }
      calcliven2o.push(item.calcliven2o);
      if (item.calcliven2o) {
        bancalcliven2o = "1";
      } else {
        bancalcliven2o = "0";
      }
      calcallagrico2e.push(item.calcallagrico2e);
      if (item.calcallagrico2e) {
        bancalcallagrico2e = "1";
      } else {
        bancalcallagrico2e = "0";
      }
      calcdeforco2.push(item.calcdeforco2);
      if (item.calcdeforco2) {
        bancalcdeforco2 = "1";
      } else {
        bancalcdeforco2 = "0";
      }
      calcotherlucco2.push(item.calcotherlucco2);
      if (item.calcotherlucco2) {
        bancalcotherlucco2 = "1";
      } else {
        bancalcotherlucco2 = "0";
      }
      calcsequestco2.push(item.calcsequestco2);
      if (item.calcsequestco2) {
        bancalcsequestco2 = "1";
      } else {
        bancalcsequestco2 = "0";
      }
      calcpeatco2.push(item.calcpeatco2);
      if (item.calcpeatco2) {
        bancalcpeatco2 = "1";
      } else {
        bancalcpeatco2 = "0";
      }
      calcalllandco2e.push(item.calcalllandco2e);
      if (item.calcalllandco2e) {
        bancalcalllandco2e = "1";
      } else {
        bancalcalllandco2e = "0";
      }
      ghgbiofuels.push(item.ghgbiofuels);
      if (item.ghgbiofuels) {
        banghgbiofuels = "1";
      } else {
        banghgbiofuels = "0";
      }
      histwfgreen.push(item.histwfgreen);
      if (item.histwfgreen) {
        banhistwfgreen = "1";
      } else {
        banhistwfgreen = "0";
      }
      histwfblue.push(item.histwfblue);
      if (item.histwfblue) {
        banhistwfblue = "1";
      } else {
        banhistwfblue = "0";
      }
      histwfgrey.push(item.histwfgrey);
      if (item.histwfgrey) {
        banhistwfgrey = "1";
      } else {
        banhistwfgrey = "0";
      }
      calcwfgreen.push(item.calcwfgreen);
      if (item.calcwfgreen) {
        bancalcwfgreen = "1";
      } else {
        bancalcwfgreen = "0";
      }
      calcwfblue.push(item.calcwfblue);
      if (item.calcwfblue) {
        bancalcwfblue = "1";
      } else {
        bancalcwfblue = "0";
      }
      calcwfgrey.push(item.calcwfgrey);
      if (item.calcwfgrey) {
        bancalcwfgrey = "1";
      } else {
        bancalcwfgrey = "0";
      }
      calcsequestaband.push(item.calcsequestaband);
      if (item.calcsequestaband) {
        bancalcsequestaband = "1";
      } else {
        bancalcsequestaband = "0";
      }
      calcsequestaffor.push(item.calcsequestaffor);
      if (item.calcsequestaffor) {
        bancalcsequestaffor = "1";
      } else {
        bancalcsequestaffor = "0";
      }
    });
    var getdatos;
    console.log(gdp)
    if (banGDP === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["gdp"], gdp);
      datos.push(getdatos);
    } else if (banpopulation === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["population"], population);
      datos.push(getdatos);
    } else if (bankcal_hist === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["kcal_hist"], kcal_hist);
      datos.push(getdatos);
    } else if (bankcal_targ === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["kcal_targ"], kcal_targ);
      datos.push(getdatos);
    } else if (bankcal_feas === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["kcal_feas"], kcal_feas);
      datos.push(getdatos);
    } else if (banfat_feas === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["fat_feas"], fat_feas);
      datos.push(getdatos);
    } else if (banprot_feas === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["prot_feas"], prot_feas);
      datos.push(getdatos);
    } else if (bankcal_mder === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["kcal_mder"], kcal_mder);
      datos.push(getdatos);
    } else if (banhistbiodivlnd === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histbiodivlnd"], histbiodivlnd);
      datos.push(getdatos);
    } else if (bancalcbiodivlnd === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcbiodivlnd"], calcbiodivlnd);
      datos.push(getdatos);
    } else if (banbiodivtarget === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["biodivtarget"], biodivtarget);
      datos.push(getdatos);
    } else if (banprotectedareasforest === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["protectedareasforest"], protectedareasforest);
      datos.push(getdatos);
    } else if (banprotectedareasothernat === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["protectedareasothernat"], protectedareasothernat);
      datos.push(getdatos);
    } else if (banprotectedareasother === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["protectedareasother"], protectedareasother);
      datos.push(getdatos);
    } else if (bancropbiodiv === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["cropbiodiv"], cropbiodiv);
      datos.push(getdatos);
    } else if (banhistcropland === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histcropland"], histcropland);
      datos.push(getdatos);
    } else if (banhistharvarea === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histharvarea"], histharvarea);
      datos.push(getdatos);
    } else if (banhistpasture === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histpasture"], histpasture);
      datos.push(getdatos);
    } else if (banhisturban === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histurban"], histurban);
      datos.push(getdatos);
    } else if (banhistforest === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histforest"], histforest);
      datos.push(getdatos);
    } else if (banhistotherland === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histotherland"], histotherland);
      datos.push(getdatos);
    } else if (bancalccropland === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calccropland"], calccropland);
      datos.push(getdatos);
    } else if (bancalcpasture === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcpasture"], calcpasture);
      datos.push(getdatos);
    } else if (bancalcforest === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcforest"], calcforest);
      datos.push(getdatos);
    } else if (bancalcnewforest === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcnewforest"], calcnewforest);
      datos.push(getdatos);
    } else if (bancalcotherland === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcotherland"], calcotherland);
      datos.push(getdatos);
    } else if (bancalcurban === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcurban"], calcurban);
      datos.push(getdatos);
    } else if (bantotalland === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["totalland"], totalland);
      datos.push(getdatos);
    } else if (bantotalland === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["totalland"], totalland);
      datos.push(getdatos);
    } else if (bantotalland === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["totalland"], totalland);
      datos.push(getdatos);
    } else if (banforestchange === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["forestchange"], forestchange);
      datos.push(getdatos);
    } else if (bannewforestchange === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["newforestchange"], newforestchange);
      datos.push(getdatos);
    } else if (bannetforestchange === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["netforestchange"], netforestchange);
      datos.push(getdatos);
    } else if (banhistcropallco2e === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histcropallco2e"], histcropallco2e);
      datos.push(getdatos);
    } else if (banhistcropco2 === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histcropco2"], histcropco2);
      datos.push(getdatos);
    } else if (banhistcropn2o === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histcropn2o"], histcropn2o);
      datos.push(getdatos);
    } else if (banhistcropch4 === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histcropch4"], histcropch4);
      datos.push(getdatos);
    } else if (bancalccropallco2e === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calccropallco2e"], calccropallco2e);
      datos.push(getdatos);
    } else if (bancalccropn2o === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calccropn2o"], calccropn2o);
      datos.push(getdatos);
    } else if (bancalccropch4 === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calccropch4"], calccropch4);
      datos.push(getdatos);
    } else if (bancalccropco2 === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calccropco2"], calccropco2);
      datos.push(getdatos);
    } else if (banhistliveallco2e === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histliveallco2e"], histliveallco2e);
      datos.push(getdatos);
    } else if (banhistliven2o === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histliven2o"], histliven2o);
      datos.push(getdatos);
    } else if (banhistlivech4 === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histlivech4"], histlivech4);
      datos.push(getdatos);
    } else if (bancalcliveallco2e === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcliveallco2e"], calcliveallco2e);
      datos.push(getdatos);
    } else if (bancalclivech4 === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calclivech4"], calclivech4);
      datos.push(getdatos);
    } else if (bancalcliven2o === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcliven2o"], calcliven2o);
      datos.push(getdatos);
    } else if (bancalcallagrico2e === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcallagrico2e"], calcallagrico2e);
      datos.push(getdatos);
    } else if (bancalcdeforco2 === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcdeforco2"], calcdeforco2);
      datos.push(getdatos);
    } else if (bancalcotherlucco2 === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcotherlucco2"], calcotherlucco2);
      datos.push(getdatos);
    } else if (bancalcsequestco2 === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcsequestco2"], calcsequestco2);
      datos.push(getdatos);
    } else if (bancalcpeatco2 === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcpeatco2"], calcpeatco2);
      datos.push(getdatos);
    } else if (bancalcalllandco2e === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcalllandco2e"], calcalllandco2e);
      datos.push(getdatos);
    } else if (banghgbiofuels === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["ghgbiofuels"], ghgbiofuels);
      datos.push(getdatos);
    } else if (banhistwfgreen === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histwfgreen"], histwfgreen);
      datos.push(getdatos);
    } else if (banhistwfblue === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histwfblue"], histwfblue);
      datos.push(getdatos);
    } else if (banhistwfgrey === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["histwfgrey"], histwfgrey);
      datos.push(getdatos);
    } else if (bancalcwfgreen === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcwfgreen"], calcwfgreen);
      datos.push(getdatos);
    } else if (bancalcwfblue === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcwfblue"], calcwfblue);
      datos.push(getdatos);
    } else if (bancalcwfgrey === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcwfgrey"], calcwfgrey);
      datos.push(getdatos);
    } else if (bancalcsequestaband === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcsequestaband"], calcsequestaband);
      datos.push(getdatos);
    } else if (bancalcsequestaffor === "1") {
      getdatos = new ByTargetCharts(ChartCharacteristics["calcsequestaffor"], calcsequestaffor);
      datos.push(getdatos);
    }

    var data = {
      labels: labels,
      datasets: datos
    };

    return data = {
      Chart: data,
      CSV: response
    };
  }
}

export default function getByTargetCharts(props) {

  try {

    // console.log(props)
    return fetch(`${process.env.REACT_APP_URL}yup${JSON.stringify(props)}`)
      .then(res => res.json()).then(responseApi);


  } catch (error) {
    console.error(error)
  }
}