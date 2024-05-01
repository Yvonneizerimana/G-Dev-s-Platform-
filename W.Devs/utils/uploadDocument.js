import multer from 'multer';
import path from 'path';

const storage=multer.diskStorage({
      destination:(req,file,cb)=>{
        cb(null,"W.Devs/files")
      },
      filename:(req,file,cb)=>{
  cb(null,file.originalname);
      }
});
const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (fileExtension === '.pdf') {
      cb(null, true); // Accept the file
  } else {
      cb(new Error('Only PDF files are allowed')); // Reject the file
  }
};

// Set up multer middleware with file filter
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter});

export default upload


