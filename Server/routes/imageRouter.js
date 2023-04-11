const { Router } = require('express');
const router = Router();
const requireAuth = require('../requireAuth')
const cloudinary= require('../utill/cloudinary_config') 
const upload= require('../utill/multer_utill') 


router.post('/image',upload.single("image"),async (req,res)=>{

    try{
        const result = await cloudinary.uploader.upload(req.file.path,{ folder: `BISAG` })
        .then((result)=>{

            res.json(result)
        })
        .catch((err)=>{
            res.status(400).json({msg:err})
        })
    } catch(err){
        res.status(400).json({msg: err})
    }
})

router.get('/loda',(req,res)=>{
    res.status(404).json({loda: 'lodaloda'})
})

module.exports = router;