const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const sideSchema = new Schema({
    stateName:{
        type:String,
        required: [true, 'Please enter stateName'],
    },
    stateImg:{
        type:String,
        required: [true, 'Please enter stateImg'],
    },
    title:{
        type:String,
        required: [true, 'Please enter title'],
    },
    rating:{
        type:String,
    },
    price:{
        type:String,
        required: [true, 'Please enter title'],
    },
    typePark:{
        type:String,
        required: [true, 'Please enter typePark'],
    },
    sightLocation:{
        type:String,
        required: [true, 'Please enter sightLocation'],
    },
    featuresImage:{
        type:String,
        required: [true, 'Please enter featuresImage'],
    },
}, {timestamps:true})

const SideSeen =mongoose.model('SideSeen' , sideSchema)
module.exports= SideSeen;




