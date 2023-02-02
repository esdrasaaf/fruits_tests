import app from "index";
import supertest from "supertest";
import fruits from "data/fruits";
import fruitsRepository from "repositories/fruits-repository";

beforeEach(() => {
  fruits.length = 0;
});

const server = supertest(app);

describe("GET /fruits", () => {
  it("should respond with status 200 and fruits data", async () => {
    fruitsRepository.insertFruit({
      name: "Banana",
      price: 5
    });
    const response = await server.get("/fruits");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      {
        id: response.body[0].id,
        name: response.body[0].name,
        price: response.body[0].price,
      }
    ]);
  });

  describe("/:id", () => {
    it("should respond with status 404 when fruit doesn't exits", async () => {
      const response = await server.get("/fruits/1");
      expect(response.status).toEqual(404);
    });
  });
});

describe("POST /fruits", () => {
  it("should respond with status 201 if the body is correct", async () => {
    const body = {
      name: "Morango",
      price: 9
    };
    const response = await server.post("/fruits").send(body);

    expect(response.status).toBe(201);
  });
});
