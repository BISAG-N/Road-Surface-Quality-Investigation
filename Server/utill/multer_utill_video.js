const multer = require('multer')
const path = require("path")

module.exports = multer({
    storage: multer.diskStorage({ 
        filename: function(req, file, callback) {
            callback(null, Date.now() + file.originalname);
          }
    }),
    limits: {
        fieldNameSize: 200,
        fileSize: 30 * 1024 * 1024,
    },
    fileFilter: (req,file,cb) =>{
        // console.log(file)
        let ext = path.extname(file.originalname);
        if(ext !== ".mp4" ){
            cb(new Error("File type is not supported",false));
            return;
        }
        cb(null,true);
    },
});