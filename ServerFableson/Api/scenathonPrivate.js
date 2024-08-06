const express = require('express');
const router = express.Router();


const { respondRequestPrivate } = require('./respondRequestPrivate');


router.get('/privatelandcover:combinations', async (req, res) => {

    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privatewNetForesCoverChange:combinations', async (req, res) => {
    
    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privateNforestbycountry:combinations', async (req, res) => {

    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privatebiodiversityByCountry:combinations', async (req, res) => {

    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privatefreshwater:combinations', async (req, res) => {

    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privateqFreshwaterBycountry:combinations', async (req, res) => {
    
    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privateGlobalghgEtarget:combinations', async (req, res) => {

    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privateZerohunger:combinations', async (req, res) => {

    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privateLowdietary:combinations', async (req, res) => {

    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privatetradeReport:combinations', async (req, res) => {

    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privateprotectedAreas:combinations', async (req, res) => {
    
    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privatetarget5:combinations', async (req, res) => {
    
    console.log('target5');
    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privategas2:combinations', async (req, res) => {

    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privatealltargetsy21:combinations', async (req, res) => {

    console.log('alltargetsy21');
    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);
    
});

router.get('/privatetargets4and6:combinations', async (req, res) => {

    console.log('targets4and6');
    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});

router.get('/privateyup:combinations', async (req, res) => {

    const {responseStatus, responseMessage}  = await respondRequestPrivate(req);
    res.status(responseStatus).json(responseMessage);

});


module.exports = router;