const multer = require("multer");
const fs = require("fs");
const Logger = require("../logger");
const MIME_TYPE_MAP= {
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg',
    'application/pdf':'pdf'
  }
  
const getStorage = (location = null) =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            const newDestination = `./uploads/${location}/`;
            // console.log('dest file')
            let stat = null;
            try {
                stat = fs.statSync(newDestination);
            } catch (err) {
                fs.mkdirSync(newDestination);
            }
            if (stat && !stat.isDirectory()) {
                throw new Error(
                    'Directory cannot be created because an inode of a different type exists at "' +
                    dest +
                    '"'
                );
            }

            cb(null, newDestination);
        },
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString() + file.originalname);
        }
    });




const filter = (mimetypes, file, cb) => {
    if (mimetypes.test(file.mimetype))
        cb(null, true)
    else {
        cb(new Error(`Invalid file type. Required: ${mimetypes}`), false)
        // mimetypes.replace(/^\/?|\/?$/, "")

    }

}


const upload = (location, type = null) =>
    multer({
        storage: getStorage(location),
        fileFilter: (req, file, cb) => {
            Logger.info(file.mimetype);
            if (type === 'excel') {
                if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
                    return cb(new Error('Wrong extension type. Required xls/xlsx'));
                }
                cb(null, true);
            }
            else {
              Logger.info("ssss1")
              
                    const name = file.originalname.split(' ').join('-');
                    const ext = MIME_TYPE_MAP[file.mimetype];
                    console.log('file namr==',name[0]+'-'+Date.now()+'.'+ext)
                    file.originalname=name[0]+'-'+Date.now()+'.'+ext;
                    Logger.info("ssss1",file)
                    filter(/image\/jpeg|image\/jpg|image\/png/, file, cb);
                
            }
        },
        onError: function (err, next) {
            Logger.info('FILE UPLOAD ERROR', err)
        }
    });

module.exports = { upload };