const express = require('express')
const router = express.Router()

const CabController=require('../controller/Cab.controller')


router.post('/addCab', CabController.cabAdd)
router.get('/allcabs/:id', CabController.allcabsofuser)
router.get('/allcabuser', CabController.allCab)
router.put('/editcab/:id',CabController.editcab)
router.delete('/:id' , CabController.deleteCab)
router.post('/inetrquery', CabController.internationalquery)











module.exports=router