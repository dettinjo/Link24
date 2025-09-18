const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../../src/server");

const mongoose = require('mongoose');
const User = require("../../src/models/user.model");

const jwtAuthMock = require("../../src/middlewares/jwt-auth.middleware");
jest.mock("../../src/middlewares/jwt-auth.middleware");

jwtAuthMock.jwtAuth.mockImplementation((req, res, next) => {
    if (req.headers.token) {
        req.userId = req.headers.token;
        return next();
    } else {
        return res.sendStatus(403);
    }
});


const agent = request.agent(app);

describe('PATCH / ', () => {
    test('with new password should update password hashed and return 200', async () => {
        const user = User({ email: "foo@bar.test", password: "fooBar" });
        await user.save();

        const newPassword = "NewPass123";

        const response = await agent.patch("/user/").set("token", user.id).send({ "password": newPassword });
        expect(response.statusCode).toBe(200);

        const updatedUser = await User.findById(user);
        expect(updatedUser.email).toBe(user.email);
        expect(bcrypt.compareSync(newPassword, updatedUser.password)).toBe(true);
    });

    test('with new email should update email and return 200', async () => {
        const user = User({ email: "foo@bar.test", password: "fooBar" });
        await user.save();

        const updatedEmail = "updated@bar.test";

        const response = await agent.patch("/user/").set("token", user.id).send({ "email": updatedEmail });
        expect(response.statusCode).toBe(200);

        const updatedUser = await User.findById(user.id);
        expect(updatedUser.email).toBe(updatedEmail);
        expect(updatedUser.password).toBe(user.password);
    });

    test('with both params should update both and return 200', async () => {
        const user = User({ email: "foo@bar.test", password: "fooBar" });
        await user.save();

        const newEmail = "updated@bar.test";
        const newPassword = "NewPass123";

        const response = await agent.patch("/user/").set("token", user.id).send({ "email": newEmail, "password": newPassword });
        expect(response.statusCode).toBe(200);

        const updatedUser = await User.findById(user.id);
        expect(bcrypt.compareSync(newPassword, updatedUser.password)).toBe(true);
        expect(updatedUser.email).toBe(newEmail);
    });

    test('with missing token should return 403', async () => {
        const response = await agent.patch("/user/");
        expect(response.statusCode).toBe(403);
    });

    test('with missing params should return 400', async () => {
        const response = await agent.patch("/user/").set("token", new mongoose.Types.ObjectId());
        expect(response.statusCode).toBe(400);
    });
});

describe('DELETE / ', () => {
    test('should delete user from db and return 200', async () => {
        const user = User({ email: "foo@bar.test", password: "fooBar" });
        await user.save();

        const response = await agent.delete("/user/").set("token", user.id);
        expect(response.statusCode).toBe(200);

        const deletedUser = await User.findById(user.id);
        expect(deletedUser).not.toBe(user);
        expect(deletedUser).toBe(null);
    });

    test('with user not in db should return 404', async () => {
        const mongoose = require('mongoose');
        const notExistingId = new mongoose.Types.ObjectId();

        const response = await agent.delete("/user/").set("token", notExistingId);
        expect(response.statusCode).toBe(404);
    });

    test('with missing token should return 403', async () => {
        const response = await agent.delete("/user/");
        expect(response.statusCode).toBe(403);
    });

    test('with missing params should return 400', async () => {

        const response = await agent.patch("/user/").set("token", new mongoose.Types.ObjectId());
        expect(response.statusCode).toBe(400);
    });
});