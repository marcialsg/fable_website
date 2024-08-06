const express = require("express");
const router = express.Router();

const { respondRequest } = require("./respondRequest");

router.get("/landcover:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";

  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/wNetForesCoverChange:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";

  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/Nforestbycountry:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/biodiversityByCountry:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/freshwater:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/qFreshwaterBycountry:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/GlobalghgEtarget:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/Zerohunger:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/Lowdietary:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/tradeReport:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/protectedAreas:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/target5:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/gas2:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/alltargetsy21:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/targets4and6:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

router.get("/yup:combinations", async (req, res) => {
  var responseStatus = 200;
  var responseMessage = "";
  try {
    var { responseStatus, responseMessage } = await respondRequest(req);
  } catch (err) {
    responseStatus = 500;
    responseMessage = err.message;
  }

  res.status(responseStatus).json(responseMessage);
});

module.exports = router;
