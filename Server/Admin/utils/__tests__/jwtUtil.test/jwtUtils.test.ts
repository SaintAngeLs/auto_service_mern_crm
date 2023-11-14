import {createJWT, verifyJWT} from '../../jwtUtil'




describe('JWT Utilities', () => {
    const payload = { userId: '123' };
    const expiresIn = 60; // 1 minute
  
    it('should create a JWT', () => {
      const token = createJWT(payload, expiresIn);
      expect(token).toBeDefined();
      expect(token.split('.').length).toBe(3); // Header, Payload, and Signature
    });
  
    it('should verify a valid JWT', () => {
      // Mock Date.now to a fixed timestamp to prevent timing issues in tests
      jest.spyOn(Date, 'now').mockImplementation(() => 150000000000000000000); // example timestamp
  
      const token = createJWT(payload, expiresIn);
      const decoded = verifyJWT(token);
      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe(payload.userId);
  
      // Restore the original Date.now after the test
      jest.restoreAllMocks();
    });
  
    it('should throw an error for an invalid JWT', () => {
      const token = 'invalid.token';
      expect(() => verifyJWT(token)).toThrow("Invalid Token");
    });
  
    it('should throw an error for an expired JWT', () => {
      jest.spyOn(Date, 'now').mockImplementation(() => 1500000000000 + (expiresIn * 1000) + 1);
  
      const token = createJWT(payload, -1);
      expect(() => verifyJWT(token)).toThrow("Token Expired");
  
      jest.restoreAllMocks();
    });
  });