// const multer = require("multer");

// const path = require("path");

// // const tempDir = path.join(__dirname, "../", "temp");
// const tempDir = path.resolve("temp");

// const multerConfig = multer.diskStorage({
// 	destination: tempDir,
// 	filename: (req, file, cb) => {
// 		const { originalname } = file;
// 		const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
// 		const filename = `${uniquePrefix}_${originalname}`;
// 		cb(null, filename);
// 	},
// });

// const limits = {
// 	fileSize: 1024 * 1024 * 5,
// };

// const upload = multer({
// 	storage: multerConfig,
// 	limits: limits,
// });

// module.exports = upload;

const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
	destination: tempDir,
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({
	storage: multerConfig,
});

module.exports = upload;
