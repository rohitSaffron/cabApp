const express = require('express')
const router = express.Router()


const SideController =require('../controller/SideSeen.controller')

router.post('/siteseen', SideController.AddSites)
router.get('/siteseen', SideController.AllSites)
router.patch('/siteseen/:id', SideController.updateSite)
router.delete('/siteseen/:id', SideController.deletesite)















module.exports=router