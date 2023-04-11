const { Router } = require('express');
const router = Router();
const Image = require('../models/image.js')
const requireAuth = require('../requireAuth')
const cloudinary= require('../utill/cloudinary_config') 
const upload= require('../utill/multer_utill') 


router.post('/upload',upload.single("image"),async (req,res)=>{

    try{
        const result = await cloudinary.uploader.upload(req.file.path,{ folder: `BISAG` })
        .then(async (result)=>{

            // res.json(result)
            let image = new Image({
                user:req.body.user,
                image: result.secure_url,
                imageId: result.public_id,
            })

            await image.save();
            res.status(200).json(image);
        })
        .catch((err)=>{
            res.status(400).json({msg:err})
        })
    } catch(err){
        res.status(400).json({msg: err})
    }
})

router.get('/getLatest', async (req, res) => {
    const getImage = await Image.findOne().sort({ _id: -1 });
    res.json(getImage.image);
  });

  router.delete("/delete/:id", async (req, res) => {
    try {
      // Find user by id
      let image = await Image.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(image.cloudinary_id);
      // Delete user from db
      await image.remove();
      res.json(image);
    } catch (err) {
      console.log(err);
    }
  });
  

module.exports = router;