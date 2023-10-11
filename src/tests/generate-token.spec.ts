import { generateToken } from '../utils/generate-token';

describe('generate token', () => {
  test('with payload', () => {
    expect(generateToken({ id: "0b65cfa0-c50a-4d40-9505-586440ca8d97" })).toBeTruthy();
  });

  test("without payload", () => {
    expect(generateToken({ id: "" })).not.toBeTruthy();
  })
});
