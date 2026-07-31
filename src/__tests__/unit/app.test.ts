import request from "supertest";
import { describe, it, afterAll, vi } from "vitest";
import "class-transformer";
import "class-validator";
import "typeorm";
import { app, serverHandle } from "../../app.js";

vi.mock("typeorm", async (importOriginal) => {
  const actual = await importOriginal<typeof import("typeorm")>();
  return {
    ...actual,
    DataSource: class Mock {
      initialize = vi.fn();
      getRepository = vi.fn();
    },
  };
});

describe("App", () => {
  it("should respond with 200 for liveness check", async () => {
    await request(app).get("/liveness").expect(200);
  });
  afterAll(async () => {
    (await serverHandle).close();
  });
});
