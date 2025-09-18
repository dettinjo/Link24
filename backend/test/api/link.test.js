const request = require("supertest");
const app = require("../../src/server");

const mongoose = require('mongoose');
const Link = require("../../src/models/link.model");

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

jwtAuthMock.optionalJwtAuth.mockImplementation((req, res, next) => {
    if (req.headers.token) {
        req.userId = req.headers.token;
        return next();
    } else {
        return next();
    }
});

const agent = request.agent(app);
const mockUserId = new mongoose.Types.ObjectId();

describe('GET /:slug ', () => {
    test('should return link information', async () => {
        const link = Link({ user: mockUserId, original: "http://foo.bar/", slug: "foo" });
        await link.save();

        const response = await agent.get(`/links/${link.slug}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.url).toBe(link.original);

        const dbLink = await Link.findById(link.id);
        expect(dbLink.clicks).toBe(link.clicks + 1);
    });

    test('with unknown slug should return 404', async () => {
        const response = await agent.get(`/links/notExisting`).set("token", mockUserId);
        expect(response.statusCode).toBe(404);
    });
});

describe('GET / ', () => {
    test('should return all links related to the user', async () => {
        await Link.insertMany([
            { user: mockUserId, original: "http://foo.bar/" },
            { user: mockUserId, original: "http://foo.bar/foo", slug: "foobar" },
            { user: new mongoose.Types.ObjectId(), original: "http://foo.bar/" },
            { user: new mongoose.Types.ObjectId(), original: "http://foo.bar/", slug: "foobar2" },
            { original: "http://foo.bar/" },
        ]);

        const response = await agent.get("/links/").set("token", mockUserId);
        expect(response.statusCode).toBe(200);

        const responseLinks = response.body.links;
        expect(responseLinks.length).toBe(2);

        const link = responseLinks.find((link) => link.original == "http://foo.bar/");
        expect(link).not.toBe(null);

        const link2 = responseLinks.find((link) => link.original == "http://foo.bar/foo" && link.slug == "foobar");
        expect(link2).not.toBe(null);
    });


    test('with missing token should return 403', async () => {
        const response = await agent.get("/links/");
        expect(response.statusCode).toBe(403);
    });
});

describe('POST / ', () => {
    describe('without authentication ', () => {
        test('should create link and return it with 201', async () => {
            const query = { url: "http://example.com/unauthenticated" };

            const response = await agent.post("/links/").send({ ...query });
            expect(response.statusCode).toBe(201);
            expect(response.body.original).toBe(query.url);
            expect(response.body.slug.length).toBeGreaterThanOrEqual(7);
            expect(response.body.slug.length).toBeLessThanOrEqual(14);

            const link = await Link.findOne({ original: query.url });
            expect(link).not.toBe(null);
        });

        test('but slug should return 403', async () => {
            const query = {
                slug: "unauthenticated", url: "http://example.com/unauthenticated"
            };

            const response = await agent.post("/links/").send({ ...query });
            expect(response.statusCode).toBe(403);
        });

        test('but expireDays should return 403', async () => {
            const query = {
                expireDays: 1, url: "http://example.com/unauthenticated"
            };

            const response = await agent.post("/links/").send({ ...query });
            expect(response.statusCode).toBe(403);
        });
    });

    describe('with authentication ', () => {
        test('should create link and return it with 201', async () => {
            const query = { url: "http://example.com/authenticated" };

            const response = await agent.post("/links/").set("token", mockUserId).send({ ...query });
            expect(response.statusCode).toBe(201);
            expect(response.body.original).toBe(query.url);
            expect(response.body.slug.length).toBeGreaterThanOrEqual(7);
            expect(response.body.slug.length).toBeLessThanOrEqual(14);

            const link = await Link.findOne({ user: mockUserId, original: query.url });
            expect(link).not.toBe(null);
        });

        test('and slug should create with custom slug', async () => {
            const query = {
                slug: "authenticated", url: "http://example.com/authenticated"
            };

            const response = await agent.post("/links/").set("token", mockUserId).send({ ...query });
            expect(response.statusCode).toBe(201);
            expect(response.body.original).toBe(query.url);
            expect(response.body.slug).toBe(query.slug);

            const link = await Link.findOne({ user: mockUserId, original: query.url, slug: query.slug });
            expect(link).not.toBe(null);
        });

        test('and expire should create with custom expireAt', async () => {
            const query = {
                expireDays: 1, url: "http://example.com/authenticated"
            };

            const response = await agent.post("/links/").set("token", mockUserId).send({ ...query });
            expect(response.statusCode).toBe(201);
            expect(response.body.original).toBe(query.url);

            const moment = require("moment");
            const expiresAt = moment().add(query.expireDays, "days").startOf("day");
            expect(response.body.expiresAt).toBe(expiresAt.toISOString());

            const link = await Link.findOne({ user: mockUserId, original: query.url, expiresAt: expiresAt });
            expect(link).not.toBe(null);
        });

        test('and all params should create link with custom params', async () => {
            const query = {
                expireDays: 1, slug: "authenticated", url: "http://example.com/authenticated"
            };

            const response = await agent.post("/links/").set("token", mockUserId).send({ ...query });
            expect(response.statusCode).toBe(201);
            expect(response.body.original).toBe(query.url);
            expect(response.body.slug).toBe(query.slug);

            const moment = require("moment");
            const expiresAt = moment().add(query.expireDays, "days").startOf("day");
            expect(response.body.expiresAt).toBe(expiresAt.toISOString());

            const link = await Link.findOne({ user: mockUserId, original: query.url, expiresAt: expiresAt });
            expect(link).not.toBe(null);
        });
    });

    test('without url param should return 400', async () => {
        const response = await agent.post("/links/").send();
        expect(response.statusCode).toBe(400);
    });
});

describe('PATCH / ', () => {
    test('with id param and url should return 200 and update link', async () => {
        const link = Link({ user: mockUserId, original: "http://foo.bar/", slug: "foo" });
        await link.save();

        const response = await agent.patch("/links/").set("token", mockUserId).send({ id: link.id, url: "http://bar.foo/" });
        expect(response.statusCode).toBe(200);

        const dbLink = await Link.findById(link.id);
        expect(dbLink.original).not.toBe(link.original);
        expect(dbLink.original).toBe("http://bar.foo/");
    });

    test('with id param and expireDays should return 200 and update link', async () => {
        const link = Link({ user: mockUserId, original: "http://foo.bar/", slug: "foo" });
        await link.save();

        const response = await agent.patch("/links/").set("token", mockUserId).send({ id: link.id, expireDays: 30 });
        expect(response.statusCode).toBe(200);

        const dbLink = await Link.findById(link.id);
        expect(dbLink.expiresAt).not.toBe(link.expiresAt);
    });

    test('with only id param should return 400', async () => {
        const link = Link({ user: mockUserId, original: "http://foo.bar/", slug: "foo" });
        await link.save();

        const response = await agent.patch("/links/").set("token", mockUserId).send({ id: link.id });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).not.toBe(null);
    });

    test('with id param and expireDays in the past should return 400', async () => {
        const link = Link({ user: mockUserId, original: "http://foo.bar/", slug: "foo" });
        await link.save();

        const response = await agent.patch("/links/").set("token", mockUserId).send({ id: link.id, expireDays: -30 });
        expect(response.statusCode).toBe(400);
        expect(response.text).toContain("past");
    });

    test('without id param should return 400', async () => {
        const response = await agent.patch("/links/").set("token", mockUserId).send();
        expect(response.statusCode).toBe(400);
    });

    test('with missing token should return 403', async () => {
        const response = await agent.patch("/links/");
        expect(response.statusCode).toBe(403);
    });

    test('with id not existing param should return 404', async () => {
        const response = await agent.patch("/links/").set("token", mockUserId).send({ id: new mongoose.Types.ObjectId(), url: "https://foo.bar/" });
        expect(response.statusCode).toBe(404);
    });
});

describe('DELETE / ', () => {
    test('with id param should return 200 and delete link', async () => {
        const link = Link({ user: mockUserId, original: "http://foo.bar/", slug: "foo" });
        await link.save();

        const response = await agent.delete("/links/").set("token", mockUserId).send({ id: link.id });
        expect(response.statusCode).toBe(200);

        const dbLink = await Link.findById(link.id);
        expect(dbLink).toBe(null);
    });

    test('with foreign/not existing id param should return 404', async () => {
        const response = await agent.delete("/links/").set("token", mockUserId).send({ id: new mongoose.Types.ObjectId() });
        expect(response.statusCode).toBe(404);
    });

    test('without id param should return 400', async () => {
        const response = await agent.delete("/links/").set("token", mockUserId).send();
        expect(response.statusCode).toBe(400);
    });

    test('with missing token should return 403', async () => {
        const response = await agent.delete("/links/");
        expect(response.statusCode).toBe(403);
    });
});