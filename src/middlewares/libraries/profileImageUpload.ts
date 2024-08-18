import multer from "multer"
import path from "path"

import CustomError from "../../helpers/error/CustomError"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../../public/uploads")

    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1] as string

    ;(req as any).savedProfileImage = `image_${
      (req as any).user.id
    }.${extension}`

    cb(null, (req as any).savedProfileImage)
  },
})

const fileFilter = (req: any, file: any, cb: any) => {
  let allowedMimeTypes = ["image/jpg", "image/jpeg"]

  if (!allowedMimeTypes.includes(file.mimetype))
    return cb(
      new CustomError("Plase, provide a valid image file (JPG or JPEG).", 400),
      false
    )

  return cb(null, true)
}

const profileImageUpload = multer({
  storage,
  fileFilter,
})

export default profileImageUpload
