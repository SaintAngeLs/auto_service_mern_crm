import { createJWT, verifyJWT } from '../jwtUtil'; 

describe('JWT Utilities', () => {
  const payload = { userId: '123' };
  const expiresIn = 60; // expiresIn time in seconds
  let token: any;

  beforeAll(() => {
    // Mock Date.now to return a fixed timestamp
    jest.spyOn(Date, 'now').mockImplementation(() => 1500000000000);
  });

  afterAll(() => {
    // Restore the original Date.now function
    jest.restoreAllMocks();
  });

  it('should create a JWT', () => {
    token = createJWT(payload, expiresIn);
    expect(token).toBeDefined();
    expect(token.split('.')).toHaveLength(3); // Header, Payload, Signature
  });

  it('should verify a valid JWT', () => {
    const decoded = verifyJWT(token);
    expect(decoded).toBeDefined();
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.exp).toBeGreaterThan(Date.now() / 1000);
  });

  it('should throw an error for an invalid JWT', () => {
    const invalidToken = 'invalid.token';
    expect(() => {
      verifyJWT(invalidToken);
    }).toThrow("Invalid Token");
  });

  it('should throw an error for an invalid signature', () => {
    const [header, payload] = token.split('.');
    const invalidSignatureToken = `${header}.${payload}.invalidsignature`;
    expect(() => {
      verifyJWT(invalidSignatureToken);
    }).toThrow("Invalid Signature");
  });

  it('should throw an error for an expired JWT', () => {
    // Create a token that is already expired
    const expiredToken = createJWT(payload, -1); // negative expiresIn to indicate past time
    expect(() => {
      verifyJWT(expiredToken);
    }).toThrow("Token Expired");
  });
});
