const { Router } = require('express');
const router = Router();
const Video = require('../models/video.js')
const requireAuth = require('../requireAuth')
const cloudinary= require('../utill/cloudinary_config') 
const upload= require('../utill/multer_utill_video')

router.post('/upload',upload.single("video"),async (req,res)=>{

    try{
        const result = await cloudinary.uploader.upload(req.file.path,{ 
            folder: `BISAG_VIDEO`,
            resource_type: "video",
            chunk_size: 6000000,

        
        })
        .then(async (result)=>{

            // res.json(result)
            let video = new Video({
                user: req.body.user,
                video: result.secure_url,
                videoId: result.public_id,
            })

            await video.save();
            res.status(200).json(video);
        })
        .catch((err)=>{
            res.status(400).json({msg:err})
        })
    } catch(err){
        res.status(400).json({msg: err})
    }
})

router.get('/getLatest', async (req, res) => {
    const getVideo = await Video.findOne().sort({ _id: -1 });
    res.json(getVideo.video);
  });


module.exports = router;