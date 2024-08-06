const food = {
    domain: "Food security",
    color: "#e4e4e4",
    indicators: [
        {
            name: "Daily average intake per capita",
            threshold: "Between 10% and 30% higher than than MDER",
            time: "From 2030 on",
            result: "Rwanda below 10% in …; Colombia above 30% for year XX",
            achievement: true
        },

        {
            name: "Share of undernourished",
            threshold: "Less than 5% of total population",
            time: "From 2030 on",
            result: "result comments",
            achievement: false
        },

        {
            name: "Share of obese",
            threshold: "Less than 5% of total population",
            time: "From 2030 on",
            result: "result comments",
            achievement: false
        }

    ]
    
}

const biodiversity = {
    domain: "Biodiversity",
    color: "#e4e4e4",
    indicators: [
        {
            name: "Change in share of land where natural processes predominate since 2020",
            threshold: "At least 15%",
            time: "By 2030",
            result: "result comments",
            achievement: true
        },

        {
            name: "Loss of existing land where natural processes predominate",
            threshold: "Zero area loss",
            time: "From 2030 on",
            result: "result comments",
            achievement: false
        },

        {
            name: "Share of land inside protected areas",
            threshold: "At least 30%",
            time: "From 2030 on",
            result: "result comments",
            achievement: false
        },
        {
            name: "Loss of forest",
            threshold: "Zero area loss",
            time: "From 2030 on",
            result: "result comments",
            achievement: true
        },

        {
            name: "Cropland area under agroecological practices",
            threshold: "At least 50%",
            time: "From 2030 on",
            result: "result comments",
            achievement: false
        }

    ]
    
}

const ghg = {
    domain: "Global GHG Emissions",
    color: "#e4e4e4",
    indicators: [
        {
            name: "Agricultural CH4 emissions",
            threshold: "Reduce by at least 10.3 Mt CH4 from 2020 levels",
            time: "By 2030",
            result: "result comments",
            achievement: true
        },

        {
            name: "Agricultural CH4 emissions",
            threshold: "Reduce by at least 28.2 Mt CH4 from 2020 levels",
            time: "By 2050",
            result: "result comments",
            achievement: true
        },

        {
            name: "CO2 emissions from AFOLU",
            threshold: "< -1.3 Gt CO2",
            time: "From 2030 on",
            result: "result comments",
            achievement: false
        },

        {
            name: "Cumulative CO2 emissions from AFOLU",
            threshold: "<= 40 Gt CO2",
            time: "2020 to 2050",
            result: "result comments",
            achievement: false
        }

    ]
    
}
 
export {
    food, biodiversity, ghg
}





 