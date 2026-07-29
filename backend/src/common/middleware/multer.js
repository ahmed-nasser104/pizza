import multer from "multer";

export const upload = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      const uniquName = Date.now() + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniquName + file.originalname);
    },
  });

  const upload = multer({ storage: storage });
  return upload;
};
