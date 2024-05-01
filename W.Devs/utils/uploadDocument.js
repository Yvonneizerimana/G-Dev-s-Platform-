import multer from 'multer';
const storage=multer.diskStorage({
      destination:(req,file,cb)=>{
        cb(null,"W.Devs/files")
      },
      filename:(req,file,cb)=>{
  cb(null,file.originalname);
      }
});

const upload=multer({storage:storage})

export default upload


