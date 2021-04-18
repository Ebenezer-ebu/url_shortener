const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);


// beforeAll(done => {
//   done()
// })

// afterAll(done => {
//   // Closing the DB connection allows Jest to exit successfully.
//   mongoose.connection.close()
//   done()
// })

describe("GraphQL", () => {
  // Test to get shorten url
  test("Returns a shorten url from the initial url from the argument", async (done) => {
    const result = await request
      .post("/graphql")
      .send({
        query:
          '{url(longUrl: "https://www.notion.so/Backdrop-Junior-Backend-Engineer-Application-aada9ae1c47c4786bac327938c4a5f25") { shortUrl } }',
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(result.body.data.url).toBeInstanceOf(Object);
      expect(result.body.data.url).toHaveProperty("shortUrl");
      done();
  });

  //  Tests for inValid long url input
  test("Returns error message for in valid url ", async (done) => {
    const result = await request
      .post("/graphql")
      .send({
        query:
          '{url(longUrl: "wwwww.notion.so/Backdrop-Junior-Backend-Engineer-Application-aada9ae1c47c4786bac327938c4a5f25") { shortUrl }  }',
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
    console.log(result.text);
    const parsedJson = JSON.parse(result.text);
    expect(result.body.errors).toBeInstanceOf(Object);
    expect(result.body.data.url).toBeNull();
    expect(parsedJson).toHaveProperty("errors");
    expect(parsedJson.errors[0].message).toEqual("invalid long url");
    done();
  });
});