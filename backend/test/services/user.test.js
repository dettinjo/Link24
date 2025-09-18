const service = require("../../src/services/user.service");

const User = require("../../src/models/user.model");

var sampleUser;
const sampleEmail = "foo@bar.foo";
const samplePassword = "hashedPassword";
beforeEach(async () => {
    // Create User to work with
    sampleUser = new User({ email: sampleEmail, password: samplePassword });
    await sampleUser.save();
});

describe("UserService ", () => {
    describe("CREATE ", () => {
        test("createUser should create and return user", async () => {
            const user = await service.createUser("foo@bar.foobar", samplePassword);

            const check = await User.findOne({ email: "foo@bar.foobar", password: samplePassword });

            expect(user).not.toBe(null);
            expect(check).not.toBe(null);
            expect(user.id).toBe(check.id);
        });

        test("createUser with already existing email should throw", async () => {
            await expect(
                service.createUser(sampleEmail, samplePassword)
            ).rejects.toThrow();
        });
    });

    describe("READ ", () => {
        test("getUserById should return correct user", async () => {
            const user = await service.getUserById(sampleUser.id);

            expect(user).not.toBe(null);
            expect(user.id).toBe(sampleUser.id);
        });

        test("getUserByEmail should return correct user", async () => {
            const user = await service.getUserByEmail(sampleUser.email);

            expect(user).not.toBe(null);
            expect(user.id).toBe(sampleUser.id);
        });
    });

    describe("UPDATE ", () => {
        test("updateUserById with both params should update user with both params and return updated user", async () => {
            const newEmail = "new@foo.bar";
            const newPass = "newHashedPass";

            const user = await service.updateUserById(sampleUser.id, newEmail, newPass);

            expect(user).not.toBe(null);
            expect(user.email).toBe(newEmail);
            expect(user.password).toBe(newPass);
        });

        test("updateUserById with only password should update only update password and return updated user", async () => {
            const newPass = "newHashedPass";

            const user = await service.updateUserById(sampleUser.id, null, newPass);

            expect(user).not.toBe(null);
            expect(user.email).toBe(sampleUser.email);
            expect(user.password).toBe(newPass);
        });

        test("updateUserById with only email should update only update email and return updated user", async () => {
            const newEmail = "new@foo.bar";

            const user = await service.updateUserById(sampleUser.id, newEmail, null);

            expect(user).not.toBe(null);
            expect(user.email).toBe(newEmail);
            expect(user.password).toBe(sampleUser.password);
        });
    });

    describe("DELETE ", () => {
        test("deleteUserById should delete User and return the deleted User", async () => {
            const user = await service.deleteUserById(sampleUser.id);
            expect(user.id).toBe(sampleUser.id);

            const check = await User.findById(sampleUser.id);
            expect(check).toBe(null);

        });
    });
});