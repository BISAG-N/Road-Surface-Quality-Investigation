const { Router } = require('express');
const router = Router();
const Road = require('../models/road.js')
const requireAuth = require('../requireAuth')
const axios = require('axios')


router.post('/store',async (req,res)=>{

    try{
        console.log(req.body)
        let road = new Road({
            user: req.body.user,
            name: req.body.name,
            district: req.body.district,
            state: req.body.state,
            distress: req.body.distress,
            image: req.body.image,
            imageId: req.body.imageId,
        })
        
        await road.save();
        res.status(200).json(road) 
        

    } catch(err){
        res.status(400).json({msg: err})
    }
})

// router.get('/getLatest', async (req, res) => {
//     const getImage = await Image.findOne().sort({ _id: -1 });
//     res.json(getImage.image);
//   });

//   router.delete("/delete/:id", async (req, res) => {
//     try {
//       // Find user by id
//       let image = await Image.findById(req.params.id);
//       // Delete image from cloudinary
//       await cloudinary.uploader.destroy(image.cloudinary_id);
//       // Delete user from db
//       await image.remove();
//       res.json(image);
//     } catch (err) {
//       console.log(err);
//     }
//   });
  

module.exports = router;