const request = require("supertest");

const app = require("./app");

describe("Comments service", () => {
  const postId = 123
  const content = "Great post!";

  const createComment = (agent) => {
    return agent
      .post(`/posts/${postId}/comments`)
      .send({ content })
      .expect("Content-Type", /json/)
      .expect(201);
  }

  let createdId;
  test("POST /posts/:id/comments responds with a list with the comment created", async () => {
    await createComment(request.agent(app))
    .then((response) => {
      console.log()
      createdId = response.body.id;
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            content: content,
          }),
        ])
      );
    });
  });

  test("GET /posts/:id/comments responds with a object with all stored posts", async () => {
    await request
      .agent(app)
      .get(`/posts/${postId}/comments`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        console.log(response.body)
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              content: content,
            }),
          ])
        );
      });
  });

  test("After creating 2 comments, should return an array with 2 comments", async () => {
    await createComment(request.agent(app))
    await request
      .agent(app)
      .get(`/posts/${postId}/comments`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        console.log(response.body);
        expect(response.body).toHaveLength(2)
      });
  });
});
