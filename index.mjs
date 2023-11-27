import { App } from "@tinyhttp/app";
import sirv from "sirv";
import os from "os";
import { renderFile as eta } from "eta";
import { promises as fs } from "node:fs";
import path from "node:path";
import { formidable } from "formidable";

const PORT = 8000;

const notifications = [
	// {
	//   type: 'info',
	//   title: 'Info',
	//   message: 'Hello, world!'
	// },
	// {
	//   type: 'danger',
	//   title: 'Error',
	//   message: 'Hello, world!'
	// },
	// {
	//   type: 'success',
	//   title: 'Success',
	//   message: 'Hello, world!'
	// },
];

function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return "0 Bytes";

	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	const k = 1024;
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return (
		parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
	);
}

async function getFilesInUploads() {
	const uploadsDir = path.join(process.cwd(), "uploads");
	const files = await fs.readdir(uploadsDir);

	return await Promise.all(
		files.map(async (file) => {
			const filePath = path.join(uploadsDir, file);
			const stats = await fs.stat(filePath);

			return {
				filename: file,
				dateModified: stats.mtime,
				size: formatBytes(stats.size),
				downloadPath: `/uploads/${file}`,
			};
		}),
	);
}

function getLocalIpAddress() {
	const interfaces = os.networkInterfaces();

	for (const interfaceName in interfaces) {
		const interface_ = interfaces[interfaceName];
		for (const iface of interface_) {
			if (iface.family === "IPv4" && !iface.internal) {
				return iface.address;
			}
		}
	}

	return "Unknown";
}

new App()
	.engine("eta", eta)
	.set("view engine", "eta")
	.use("public", sirv(`${process.cwd()}/public`))
	.use("uploads", sirv(`${process.cwd()}/uploads`))
	.get("/", (req, res) => {
		getFilesInUploads().then((files) => {
			void res.render("index", { files: files, notifications: notifications });
		});
	})
	.post("/upload", (req, res) => {
		const form = formidable({
			uploadDir: `uploads`,
			keepExtensions: true,
			createDirsFromUploads: true,
			allowEmptyFiles: false,
			minFileSize: 0,
			maxTotalFileSize: 1024 * 1024 * 1024 * 4,
			maxFileSize: 1024 * 1024 * 1024 * 4,
			filename(name, ext, part, form) {
				const { originalFilename } = part;
				return originalFilename;
			},
			filter: function ({ name, originalFilename, mimetype }) {
				return Boolean(originalFilename);
				// keep only images
				// return mimetype?.includes("image");
			},
		});
		form
			.parse(req)
			.then(({ fields, files }) => {
				void res.status(200).send("File uploaded");
			})
			.catch((err) => {
				console.error(err);
				void res
					.header("Content-Type", "application/text")
					.status(500)
					.send(err);
			});
	})
	.listen(PORT, () => {
		console.log(`Server running at PORT ${PORT}`);
		console.log(`Local http://${getLocalIpAddress()}:${PORT}`);
	});
