import { generateToken } from '../utils/generate-token';

describe('generate token', () => {
  it('with payload', () => {
    const token = generateToken({ 
      id: "0b65cfa0-c50a-4d40-9505-586440ca8d97" 
    });

    expect(token).toBeTruthy();
  });

  // it("without payload", () => {
  //   expect(generateToken({ id: "" })).not.toBeTruthy();
  // })
});
