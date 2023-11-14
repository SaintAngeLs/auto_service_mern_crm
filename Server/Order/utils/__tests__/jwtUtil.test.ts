import { createJWT, verifyJWT } from "../jwtUtil";

describe('JWT Utility Functions', () => {
  const payload = { userId: '123' };
  const expiresIn = 3600; // 1 hour

  describe('createJWT', () => {
    it('creates a JWT for a payload', () => {
      const token: any = createJWT(payload, expiresIn);
      expect(token).toBeDefined();
      expect(token.split('.').length).toBe(3);
    });
  });

  describe('verifyJWT', () => {
    let token: any;

    beforeAll(() => {
      // Create a token before each test case
      token = createJWT(payload, expiresIn);
    });

    it('verifies a valid JWT and returns the payload', () => {
      const verifiedPayload = verifyJWT(token);
      expect(verifiedPayload).toBeDefined();
      expect(verifiedPayload.userId).toBe(payload.userId);
    });

    it('throws an error for an invalid signature', () => {
      const [header, payload] = token.split('.');
      const invalidToken = `${header}.${payload}.invalidsignature`;
      expect(() => verifyJWT(invalidToken)).toThrow('Invalid Signature');
    });

    it('throws an error for an expired token', () => {
      // Create an expired token for testing
      const expiredToken = createJWT(payload, -3600); // Negative expiry to simulate past time
      expect(() => verifyJWT(expiredToken)).toThrow('Token Expired');
    });

    it('throws an error for a token with missing parts', () => {
      const invalidToken = 'header.payload';
      expect(() => verifyJWT(invalidToken)).toThrow('Invalid Token');
    });
  });
});
