import multer from "multer";
import path from "path";

const multerConfig = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    let validExt = process.env.ALLOWED_FILES.split("|");
    if (!validExt.includes(ext))
      cb(new Error("File type not supported"), false);

    cb(null, true);
  },
});

export default multerConfig;
