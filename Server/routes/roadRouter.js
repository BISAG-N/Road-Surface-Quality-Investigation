const { Router } = require('express');
const router = Router();
const Road = require('../models/road.js')
const Report = require('../models/report.js')
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
            image: req.body.image,
        })
        
        await road.save().then(async (ans)=>{

            let report = new Report({
            user: req.body.user,
            road: ans._id,
            distress: req.body.distress,
            image: req.body.image,
            severity: req.body.severity
        })
        
        await report.save()
        

        })
        .catch((err)=>{
            console.log(err)
        })

        // let report = new Report({
        //     user: req.body.user,
        //     road: road._id,
        //     distress: req.body.distress,
        //     image: req.body.image,
        // })
        
        // await report.save()
        res.status(200).json(road) 
        

    } catch(err){
        res.status(400).json({msg: err})
    }
})

router.get('/get-report/:id',async (req,res) => {
    const uid = req.params.id;
    const report = await Report.find({user: uid})
                        .populate('user',["fullname","email","category"])
                        .populate('road',["name","district","state"])
                        .then((result)=>{
                            console.log(result)
                            res.status(200).send(result)
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
})



module.exports = router;