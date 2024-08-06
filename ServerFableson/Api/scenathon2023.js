const express = require("express");
const router = express.Router();

const { respondRequest } = require("./respondRequest");

var target_data = require("./2023_target_data.json");

router.get("/update_cache", async (req, res) => {
  //console.log("req.params: ", req.params);
  const { responseStatus, responseMessage } = await respondRequest(req);
  res.status(responseStatus).json(responseMessage);
});


for (var i = 0; i < target_data.target_data.length; i++) {
  const target_item = target_data.target_data[i];
  const target = target_item.targetDomain;

  var route = "";

  if (target === "Summary" || target === "Trade Report") {

    route = "/" +  target.toLowerCase().replace(/\s/g, "_");

    if(route === "/trade_report"){
      route = route + ":combinations";
    }

    router.get(route, async (req, res) => {
      const { responseStatus, responseMessage } = await respondRequest(req);
      res.status(responseStatus).json(responseMessage);
    });

    // console.log("added route: ", route);

  } else {
    for (var j = 0; j < target_item.indicators.length; j++) {
      const indicator = target_item.indicators[j];

      const apiUrl =
        "/" +
        target.toLowerCase().replace(/\s/g, "_") +
        "/" +
        indicator.toLowerCase().replace(":","").replace(/\s/g, "_") +
        "/";

      route = apiUrl + ":combinations";

      // console.log("added route: ", route);

      router.get(route, async (req, res) => {
        //console.log("req.params: ", req.params);
        const { responseStatus, responseMessage } = await respondRequest(req);
        res.status(responseStatus).json(responseMessage);
      });
    }
  }

  //console.log("\n\n");


}

module.exports = router;