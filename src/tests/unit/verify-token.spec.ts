import { verifyToken } from "../../utils/verify-token";
import { generateToken } from "../../utils/generate-token";

describe("verify token", () => {
  it("valid token", () => {
    const token = generateToken({ 
      id: "0b65cfa0-c50a-4d40-9505-586440ca8d97" 
    });

    expect(verifyToken(token)).toBeTruthy();
  });

  it("ivalid token", () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiNjVjZmEwLWM1MGEtNGQ0MC05NTA1LTU4NjQ0MGNhOGQ5NyIsImlhdCI6MTY5NzAxNzMwNiwiZXhwIjoxNjk3MDE3MzM2fQ.2UlF-G4jdaYl25t-4ep6pTZsYsH40admdV747UHDt_c";
    const falsyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    expect(verifyToken(token)).toBeFalsy();
    expect(verifyToken(falsyToken)).not.toBeTruthy();
    expect(verifyToken("")).not.toBeTruthy();
  });
})