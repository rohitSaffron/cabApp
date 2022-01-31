const SideSeen =require('../models/SideSeen')




const AddSites =async (req, res)=>{
   try{
       let rating = Math.random() * (5 - 4) + 4;

   
    let Site = new SideSeen({
      stateName: req.body.statename,
      stateImglink: req.body.stateImglink,
      title: req.body.title,
      rating:rating ,
      price: req.body.price ,
      typePark: req.body.typePark ,
      sightLocation: req.body.sightLocation,
      featuresImagelink: req.body.featuresImagelink
    });

   
    Site.save()
    .then((site) => {
      res.json({
        massage:'Site Added SuccessFully'
      })
      
    })
    .catch(err=>{
        res.json({
            massage:'Something Went Wronge',
            err
        })
    })

   }
   catch{
       res.json({
           massage:'there is error plz Do it again'
       })

   }
}





const AllSites = async (req, res) => {
   try {
    const Siteseen = await SideSeen.find({})
   
    res.json(Siteseen).status(200);
   } catch (error) {
       console.error(err)
   }
}


const updateSite= async (req,res)=>{
try{

    let data = req.body;
    let id = req.params.id;
  
    const details = await SideSeen.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  
    res.json({
      massage:'Site Updated Successfully'
    }).status(200);

}catch{
    res,json(err)

}


}


const deletesite = async (req, res, next) => {
    let id = req.params.id
  try {
    SideSeen.findByIdAndDelete({_id:id}, function (err, docs) {
      if (err) {
       res.json({
         err,
         id,
         massage:'Something Went wrong'
       }).status(400)
      } else {
        res.json({
          massage:'Site Deleted Successfull'
        }).status(200)
      }
    });
  } catch (err) {
    res.json({
      err,
      massage:'hiii'
    }).status(500)
  }
};

















module.exports = {
    AllSites,
    updateSite,
    deletesite,
    AddSites,
   
   
  };

  
  






















