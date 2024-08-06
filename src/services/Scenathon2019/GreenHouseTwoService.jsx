import countries_characteristics from '../../data/countries_characteristics.json';


function responseApi(response) {

    function GreenHouseTwo(nameCountry, data) {


        let characteristic = countries_characteristics[nameCountry];

        if (characteristic !== undefined) {
            this.data = data;
            this.type = characteristic[0]["type"];
            this.label = characteristic[0]["label"];
            this.borderColor = characteristic[0]["borderColor"];
            this.backgroundColor = characteristic[0]["backgroundColor"];
        }



    }

    var AgriCO2e = [];
    var LandCO2e = [];
    var datasetsChart1 = [];
    var datasetsChart2 = [];
    var labels = [];
    var countChartOne = 0;
    var countChartTwo = 0;
    var i = 0;
    var nameCounty = ""
    
    response = response.queryResponse;
    if (response.length !== 0) {
        nameCounty = response[0].name;

        response.forEach(item => {
            i++;
            if (!labels.includes(item.Year)) {
                labels.push(item.Year);
            }

            if (nameCounty !== item.Country || i === response.length) {

                if (countChartOne !== AgriCO2e.length) {
                    if (i === response.length) { AgriCO2e.push(item.AgriCO2e); }
                    var greenHouseOne = new GreenHouseTwo(nameCounty, AgriCO2e);
                    datasetsChart1.push(greenHouseOne);
                }
                if (countChartTwo !== LandCO2e.length) {
                    if (i === response.length) { LandCO2e.push(item.LandCO2e); }
                    var greenHouseTwo = new GreenHouseTwo(nameCounty, LandCO2e);
                    datasetsChart2.push(greenHouseTwo);
                }

                countChartOne = 0;
                countChartTwo = 0;
                nameCounty = item.Country;
                LandCO2e = [];
                AgriCO2e = [];

            }

            AgriCO2e.push(item.AgriCO2e);
            LandCO2e.push(item.LandCO2e);
            countChartOne = item.AgriCO2e === "0.00" || item.AgriCO2e === 0 ? countChartOne + 1 : countChartOne;
            countChartTwo = item.LandCO2e === "0.00" || item.LandCO2e === 0 ? countChartTwo + 1 : countChartTwo;
        });



        var dataChartOne = {
            labels: labels,
            datasets: datasetsChart1
        };


        var dataCharTwo = {
            labels: labels,
            datasets: datasetsChart2
        };

        var dataCharts = {
            chartOne: dataChartOne,
            charTwo: dataCharTwo,
            CSV: response,


        };

    }


    return dataCharts
}


function getGreenHouseTwo(url, props) {

    try {



        const response = fetch(`${process.env.REACT_APP_URL}${url}${JSON.stringify(props)}`)
            .then(res => res.json()).then(responseApi);
        return response;



    } catch (error) {
        console.error(error)
    }
}
export { getGreenHouseTwo }