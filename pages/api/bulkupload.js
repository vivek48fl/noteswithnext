import nextConnect from "next-connect";
import multer from "multer";
import csv from "async-csv";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const apiRoute = nextConnect({
	onError(error, req, res) {
		res.status(501).json({
			error: `Sorry something Happened! ${error.message}`,
		});
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

apiRoute.use(upload.single("attachment"));

apiRoute.post(async (req, res) => {
	const { buffer } = req.file;
	let userIds = [];
	console.log(buffer);
	const rows = await csv.parse(buffer);
	//console.log(rows);
	//skip first row
	const data = rows.slice(1);

	const result = data.map((row) => {
		return {
			email: row[0],
			password: row[1],
			plan: row[2],
			orderAmount: row[3],
		};
	});
	//console.log(result);

	const client = await clientPromise;
	const db = await client.db("test");
	//const bulk = collection.initializeUnorderedBulkOp();
	for (var i = 0; i < result.length; i++) {
		const user = await db
			.collection("demoUser")
			.findOne({ email: result[i].email });
		if (!user) {
			//const hashedPassword = await hashPassword(result[i].password);
			const user_obj = {
				email: result[i].email,
				password: result[i].password,
				createdAt: Date.now(),
			};
			userIds.push(user_obj);
			console.log(
				"user object before insertion into Mongo DB" +
					JSON.stringify(user_obj)
			);
			try {
				if (
					(user_obj.email != "" || user_obj.email != undefined) &&
					user_obj.password.length >= 8
				) {
					user_obj.email = user_obj.email.trim();
					const response = await db
						.collection("demoUser")
						.insertOne(user_obj);
				}
			} catch (e) {
				continue;
			}

			var subscriptionDays = 0;
			var endDate = 0;

			if (
				result[i].orderAmount === "99" ||
				result[i].orderAmount === 99
			) {
				subscriptionDays = 90;
				endDate = Date.now() + subscriptionDays * 24 * 60 * 60 * 1000;
				result[i].plan = "basic";
			} else if (
				result[i].orderAmount === "149" ||
				result[i].orderAmount === 149
			) {
				subscriptionDays = 180;
				endDate = Date.now() + subscriptionDays * 24 * 60 * 60 * 1000;
				result[i].plan = "essential";
			} else {
				subscriptionDays = 365;
				endDate = Date.now() + subscriptionDays * 24 * 60 * 60 * 1000;
				result[i].plan = "premium";
			}

			// add the following data to subscription collection
			try {
				const data = {
					userId: ObjectId(response.insertedId),
					startDate: Date.now(),
					endDate: endDate,
					orderAmount: result[i].orderAmount,
					subscriptionDays: subscriptionDays,
					plan: result[i].plan,
					paymentType: "cash",
				};
				await db.collection("subscriptions").insertOne(data);
				userIds.push(response.insertedId);
			} catch (e) {
				continue;
			}
		} else {
			continue;
		}
	}

	res.send({
		success: true,
		message: "Accounts added successfully",
		userIds: userIds,
		toatalEntries: result.length,
		createdAccounts: userIds.length,
	});
});
export default apiRoute;

export const config = {
	api: {
		bodyParser: false,
	},
};
