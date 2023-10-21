import { api } from "../../lib/axios"

const user = {
  name: "Artur Hossi",
  email: "artur@hossi.com",
  password: "12345678"
};

const ghostUser = {
  name: "",
  email: "",
  password: ""
};

let userIDCreated: string;
let authToken: string;

describe("create user", () => {
  it("created", async () => {
    const response = await api.post("/users", user);
    expect(response.status).toBe(201);
  });

  it("ghost user", async () => {
    const response = await api.post("/users", ghostUser);
    expect(response.status).toBe(500);
  });
});

describe("login auth", () => {
  it("successfull", async () => {
    const response = await api.post("/login", {
      email: "artur@hossi.com",
      password: "12345678"
    });

    authToken = response.data.token;

    expect(response.status).toBe(200);
    expect(authToken).toBeTruthy();
  });

  it("fake email", async () => {
    const response = await api.post("/login", {
      email: "artur@hossi",
      password: "12345678"
    });

    expect(response.status).toBe(500);
  });

  it("invalid password", async () => {
    const response = await api.post("/login", {
      email: "artur@hossi.com",
      password: "1238"
    });

    expect(response.status).toBe(404);
  });

  it("user not found", async () => {
    const response = await api.post("/login", {
      email: "johndoe@gmail.com",
      password: "12345678"
    });

    expect(response.status).toBe(404);
  })
});

describe("list users", () => {
  it("all users", async () => {
    const response = await api.get("/users");
    expect(response.status).toBe(200);
  });

  it("get unique user", async () => {
    const response = await api.get("/user", {
      headers: {
        Authorization: authToken
      }
    });

    userIDCreated = response.data.id;

    expect(response.status).toBe(200);
    expect(response.data).toBeTruthy();
  });

  it("get user without token", async () => {
    const response = await api.get("/user");
    expect(response.status).toBe(401);
  });

  it("get user with invalid token", async () => {
    const response = await api.get("/user", {
      headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxZmVjNmU3LTI0NGQtNDc0Zi1hMmJjLTRkZDE1Njg0MDc1MSIsImlhdCI6MTY5NzQ4MjQ5NiwiZXhwIjoxNjk3NDgzMDk2fQ.BvnAd-kctjkz1YZWxW2GCKJ30FLbea5JlvBHCFkvF3c"
      }
    });

    expect(response.status).toBe(401);
  });
});

describe("delete users", () => {
  it("success", async () => {
    const response = await api.delete(`/users/${userIDCreated}`);
    expect(response.status).toBe(204);
  });

  it("don't exists", async () => {
    const response = await api.delete(`/users/${userIDCreated}`);
    expect(response.status).toBe(500);
  });
});