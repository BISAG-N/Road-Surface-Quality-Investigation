const multer = require('multer')
const path = require("path")

module.exports = multer({
    storage: multer.diskStorage({ 
        filename: function(req, file, callback) {
            callback(null, Date.now() + file.originalname);
          }
    }),
    fileFilter: (req,file,cb) =>{
        // console.log(file)
        let ext = path.extname(file.originalname);
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
            cb(new Error("File type is not supported",false));
            return;
        }
        cb(null,true);
    },
});