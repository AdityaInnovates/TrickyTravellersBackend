import multer from "multer";
import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Crypto from "crypto";

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: async (req: any, file: any) => {
    return {
      folder: "images",
      public_id: Crypto.randomBytes(13).toString("base64").slice(0, 13),
    };
  },
});
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});
export default upload;
