import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'profilePic') {
    if (file.mimetype === 'image/png') {
      return cb(new Error('PNG files are not allowed for profilePic'), false);
    }
  }
  if (file.fieldname === 'resume') {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed for resume'), false);
    }
  }
  cb(null, true);
};

const uploadMiddleware = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }  
});

export default uploadMiddleware;
