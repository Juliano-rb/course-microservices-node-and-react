const request = require('supertest')

const app = require('./app')

describe("/posts", ()=>{
    const title = "A post"
    let createdId
    it('POST /posts responds with a Post object with id and title', async ()=>{
        await request.agent(app)
            .post('/posts')
            .send({ title: title })
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response=>{
                createdId = response.body.id
                expect(response.body).toEqual(
                    {
                        id: expect.any(String),
                        title: title
                    }
                )
            })
    })

    it("GET /posts responds with a object with all stored posts", async () => {
      await request
        .agent(app)
        .get("/posts")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual({
            [createdId]: {
              id: createdId,
              title: title,
            },
          });
        });
    });
})