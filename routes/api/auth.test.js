// const {
// 	describe,
// 	beforeAll,
// 	afterAll,
// 	beforeEach,
// 	afterEach,
// 	test,
// 	expect,
// } = require("jest");
const mongoose = require("mongoose");
const request = require("supertest");

const dotenv = require("dotenv");
dotenv.config();

const app = require("../../app");
const User = require("../../models/user");

const { DB_HOST_TEST, PORT } = process.env;

describe("test register route", () => {
	let server = null;
	beforeAll(async () => {
		await mongoose.connect(DB_HOST_TEST);
		server = app.listen(PORT);
	});

	afterAll(async () => {
		await mongoose.connection.close();
		server.close();
	});

	beforeEach(() => {});

	afterEach(async () => {
		await User.deleteMany({});
	});

	test("test register with correct data", async () => {
		const signupData = {
			email: "simonovievgenii@gmail.com",
			password: "123456",
		};
		const { statusCode, body } = await request(app)
			.post("/users/register")
			.send(signupData);

		console.log(body);

		expect(statusCode).toBe(201);
		expect(body.user.email).toBe(signupData.email);
		expect(body.user.subscription).toBe("starter");

		const user = await User.findOne({ email: signupData.email });
		expect(user.email).toBe(signupData.email);
	});
});
