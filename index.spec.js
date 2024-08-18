const request = require('supertest');
const app = require('./index');

let server;

beforeAll(() => {
    server = app.listen(3000, () => console.log('Server running'));
});

afterAll((done) => {
    server.close(done);
});

describe("Test todo methods", () => {
    it("Returns all todos", async () => {
        const response = await request(app).get("/todos").expect(200);
        expect(response.body.length).toBe(3);
    });

    it("Returns a todo with id: 2", async () => {
        const response = await request(app).get("/todos/2").expect(200);
        expect(response.body.title).toBe("Do something else");
    });
});

describe("Test responses from querying an external API", () => {
    it("Should retrieve a random Chuck Norris joke", async () => {
        const jokeResp = await request(app).get("/joke").expect(200);
        const joke = JSON.parse(jokeResp.text);
        expect(joke.value).toBeTruthy();
    });

    it("No two Chuck Norris jokes will be the same", async () => {
        const joke1 = await request(app).get("/joke").expect(200);
        const joke2 = await request(app).get("/joke").expect(200);
        const j1 = JSON.parse(joke1.text);
        const j2 = JSON.parse(joke2.text);
        expect(j1.value === j2.value).toBeFalsy();
    });
});
