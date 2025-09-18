const request = require("supertest");
const app = require("../../src/server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const mongoose = require('mongoose');
const User = require("../../src/models/user.model");

const jwtAuthMock = require("../../src/middlewares/jwt-auth.middleware");
jest.mock("../../src/middlewares/jwt-auth.middleware");
jwtAuthMock.jwtAuth.mockImplementation((req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.token, process.env.BACKEND_JWT_SECRET);
        req.userId = decoded.userId;
        return next();
    } catch (error) {
        return res.sendStatus(403);
    }
});

const agent = request.agent(app);

describe('GET /check ', () => {
    test('with valid token should return 200', async () => {
        const token = jwt.sign({ userId: new mongoose.Types.ObjectId() }, process.env.BACKEND_JWT_SECRET, { expiresIn: "1d" });

        const response = await agent.get("/auth/check").set("token", token);
        expect(response.statusCode).toBe(200);
    });

    test('with invalid token should return 403', async () => {
        const token = jwt.sign({ userId: new mongoose.Types.ObjectId() }, process.env.BACKEND_JWT_SECRET, { expiresIn: "0d" });

        const response = await agent.get("/auth/check").set("token", token);
        expect(response.statusCode).toBe(403);
    });

    test('without token should return 403', async () => {
        const response = await agent.get("/auth/check");
        expect(response.statusCode).toBe(403);
    });
});

describe('POST /login ', () => {
    test('with valid credentials returns 200 and token', async () => {
        const hashedPassword = bcrypt.hashSync("foo", 10);
        const user = new User({ email: "foo@foo.bar", password: hashedPassword });
        await user.save();

        const response = await agent.post("/auth/login").send({ email: "foo@foo.bar", password: "foo" });
        expect(response.statusCode).toBe(200);

        const decodedToken = jwt.verify(response.body.token, process.env.BACKEND_JWT_SECRET);
        expect(decodedToken).not.toBe(null);
        expect(decodedToken.userId).toBe(user.id);
    });

    test('with user not existing returns 401', async () => {
        const response = await agent.post("/auth/login").send({ email: "user@notexisting.foo", password: "foo" });
        expect(response.statusCode).toBe(401);
    });

    test('with wrong password returns 401', async () => {
        const user = new User({ email: "foo@foo.bar", password: bcrypt.hashSync("foo", 10) });
        await user.save();

        const response = await agent.post("/auth/login").send({ email: "foo@foo.bar", password: "bar" });
        expect(response.statusCode).toBe(401);
    });

    test('without email should returns 400', async () => {
        const response = await agent.post("/auth/login").send({ password: "foo" });
        expect(response.statusCode).toBe(400);
    });

    test('without password should returns 400', async () => {
        const response = await agent.post("/auth/login").send({ email: "foo@bar.foo" });
        expect(response.statusCode).toBe(400);
    });

    test('without params should returns 400', async () => {
        const response = await agent.post("/auth/login");
        expect(response.statusCode).toBe(400);
    });
});

describe('POST /register ', () => {
    test('with params should create User and return token', async () => {
        const response = await agent.post("/auth/signup").send({ email: "foo@foo.bar", password: "fooBar123" });
        expect(response.statusCode).toBe(201);

        const userInDb = await User.findOne({ email: "foo@foo.bar" });
        expect(userInDb).not.toBe(null);

        const decodedToken = jwt.verify(response.body.token, process.env.BACKEND_JWT_SECRET);
        expect(decodedToken).not.toBe(null);
        expect(decodedToken.userId).toBe(userInDb.id);

        expect(bcrypt.compareSync("fooBar123", userInDb.password)).toBe(true);
    });

    test('with existing user should return 409', async () => {
        const user = new User({ email: "foo@foo.bar", password: "hashedPassword123" });
        await user.save();

        const response = await agent.post("/auth/signup").send({ email: user.email, password: "fooBar123" });
        expect(response.statusCode).toBe(409);
    });

    test('with weak password should return 400', async () => {
        const response = await agent.post("/auth/signup").send({ email: "foo@foo.bar", password: "weakPass" });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).not.toBe(null);
    });

    test('without params should return 400', async () => {
        const response = await agent.post("/auth/signup");
        expect(response.statusCode).toBe(400);
    });
});