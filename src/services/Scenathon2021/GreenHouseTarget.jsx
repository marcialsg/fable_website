import ChartCharacteristics from '../../data/ChartCharacteristics.json';

const getPathWaysList = async (pathways) => {
 
    const pathWayList = [];
    
    for(var i = 0; i < Object.keys(pathways).length; i++) {
        
        const pathwayElement_index = Object.keys(pathways)[i];
  
        const pathwayElement = pathways[pathwayElement_index]["label"];
  
        pathWayList.push(pathwayElement);

    }
  
    return pathWayList;
  
  };
  
const responseApi = async (response) => {

    function GreenHouse(ChartCharacteristics, data) {

        this.data = data;
        this.type = ChartCharacteristics[0]["type"];
        this.label = ChartCharacteristics[0]["label"];
        this.borderColor = ChartCharacteristics[0]["borderColor"];
        this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];

    }

    function GreenHouseTarget(ChartCharacteristics, data) {
        this.data = data;
        this.type = ChartCharacteristics[0]["type"];
        this.label = ChartCharacteristics[0]["label"];
        this.fill = ChartCharacteristics[0]["fill"];
        this.radius = ChartCharacteristics[0]["radius"];
        this.borderColor = ChartCharacteristics[0]["borderColor"];
        this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];
        this.pointBorderColor = ChartCharacteristics[0]["pointBorderColor"];
        this.pointBackgroundColor = ChartCharacteristics[0]["pointBackgroundColor"];
        this.pointHoverBackgroundColor = ChartCharacteristics[0]["pointHoverBackgroundColor"];
        this.pointHoverBorderColor = ChartCharacteristics[0]["pointHoverBorderColor"];
        this.yAxisID = ChartCharacteristics[0]["yAxisID"];

    }

    var labels = [];

    //--------------target 4 chart one-------------------

    var livestock_CH4 = [];
    var livestock_N20 = [];
    var crop_N20 = [];
    var crop_CH4 = [];
    var crop_CO2 = [];
    var ghg_agri_targets = [];
    var datasetsTargetFour = [];

    //--------------target 4 chart two-------------------
    var total_GHG_land = [];
    var ghg_lu_target = [];
    var datasetsTargetFourCharTwo = [];

    //--------------target 6-------------------

    var blueWater = [];
    var water_target = [];
    var datasetsTargetSix = [];

    // console.log('GreenHouseTarget response: \n' + JSON.stringify(response))
    

    var pathways = response.pathways;

    response = response.queryResponse;

    if (response.length !== 0) {

        response.forEach(item => {
            if (!labels.includes(item.Year)) {
                labels.push(item.Year);
            }

            //target 4 chart one
            livestock_CH4.push(item.Livestock_CH4);
            livestock_N20.push(item.Livestock_N20);
            crop_N20.push(item.Crop_N20);
            crop_CH4.push(item.Crop_CH4);
            crop_CO2.push(item.Crop_CO2);
            ghg_agri_targets.push(item.ghg_agri_target);

            //target 4 chart two
            total_GHG_land.push(item.total_GHG_land);
            ghg_lu_target.push(item.GHG_LU_target);

            //target six
            blueWater.push(item.BlueWater)
            water_target.push(item.water_target)


        });

        //target four chart one
        var grenHouse = new GreenHouseTarget(ChartCharacteristics["ghg_agri_targets"], ghg_agri_targets);
        datasetsTargetFour.push(grenHouse);
        grenHouse = new GreenHouse(ChartCharacteristics["Livestock_CH4"], livestock_CH4);
        datasetsTargetFour.push(grenHouse);
        grenHouse = new GreenHouse(ChartCharacteristics["Livestock_N20"], livestock_N20);
        datasetsTargetFour.push(grenHouse);
        grenHouse = new GreenHouse(ChartCharacteristics["Crop_N20"], crop_N20);
        datasetsTargetFour.push(grenHouse);
        grenHouse = new GreenHouse(ChartCharacteristics["Crop_CH4"], crop_CH4);
        datasetsTargetFour.push(grenHouse);
        grenHouse = new GreenHouse(ChartCharacteristics["Crop_CO2"], crop_CO2);
        datasetsTargetFour.push(grenHouse);

        //target four chart two
        grenHouse = new GreenHouseTarget(ChartCharacteristics["GHG_LU_target"], ghg_lu_target);
        datasetsTargetFourCharTwo.push(grenHouse);
        grenHouse = new GreenHouse(ChartCharacteristics["total_GHG_land_bar"], total_GHG_land);
        datasetsTargetFourCharTwo.push(grenHouse);


        //target six 
        grenHouse = new GreenHouseTarget(ChartCharacteristics["water_target"], water_target);
        datasetsTargetSix.push(grenHouse);
        grenHouse = new GreenHouse(ChartCharacteristics["BlueWater"], blueWater);
        datasetsTargetSix.push(grenHouse);

    }

    var dataTargetFour = {
        labels: labels,
        datasets: datasetsTargetFour,
        CSV: response

    };

    var dataTargetFourCharTwo = {
        labels: labels,
        datasets: datasetsTargetFourCharTwo
    };

    var dataTargetSix = {
        labels: labels,
        datasets: datasetsTargetSix
    };

    var dataGreenHouse = {
        targetFour: dataTargetFour,
        targetFourCharTwo: dataTargetFourCharTwo,
        targetSix: dataTargetSix,
        Pathways: await getPathWaysList(pathways),
        TradeAdjustments: pathways
    }


    // console.log('GreenHouseTarget dataGreenHouse: ', dataGreenHouse);
    return dataGreenHouse;

}

export default function getGreenHouseTargets(props) {
    try {

        return fetch(`${process.env.REACT_APP_URL}targets4and6${JSON.stringify(props)}`)
            .then(res => res.json()).then(responseApi);


    } catch (error) {
        console.error(error)
    }
}
