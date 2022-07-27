import nc from "next-connect";
// import onError from "../../common/errormiddleware";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const handler = nc({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
      console.log(error);
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});


const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

handler.use(upload.array('theFiles'));

handler.post((req, res) => {
  let filename = req.files[0]['filename']
  res.status(200).send({ data: filename});
});

export default handler;


// import nc from "next-connect";
// import onError from "../../common/errormiddleware";
// import multer from "multer";
// import path from "path";
//
//
// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };
//
// const handler = nc(onError);
//
// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
//
// let upload = multer({
//   storage: storage,
// });
//
// let uploadFile = upload.single("file");
// handler.use(uploadFile);
// handler.post(async (req, res) => {
//   //console.log("req.file", req.file);
//   //console.log("req.body", req.body);
//   let url = "http://" + req.headers.host;
//   let filename = req.file.filename;
//   let result = await executeQuery("insert into upload(pic) values(?)", [
//     filename,
//   ]);
//   result = await executeQuery(
//     `select * from upload where pic_id=${result.insertId}`
//   );
//   res.status(200).send({
//     result: result,
//     url: url + "/public/" + req.file.filename,
//   });
// });
//
// export default handler;

// export default function handler(req, res) {
//   const form = formidable();
//   form.parse(req, (err, fields, files) => {
//     if (!files.demo) {
//       res.status(400).json({ error: "No file uploaded" });
//       return;
//     }
//
//     try {
//       upload.array("theFiles"),
//         //(req, res, err) => {
//         //  if (err) {
//         //    res.status(500).json({ error: err.message });
//         //  } else {
//         //    res.status(200).json({ fields, files });
//         //  }
//         //},
//         async () => {
//           res.status(200).json({ data: "success" });
//         };
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: error.message });
//     }
//   });
// }
//
// export const config = {
//  api: {
//    bodyParser: false, // Disallow body parsing, consume as stream
//  },
// };
