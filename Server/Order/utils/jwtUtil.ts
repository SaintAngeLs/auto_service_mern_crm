import crypto from 'crypto';

const secret = '31415926535898_superSuperSuperSuperSuperSuperSuperSecret%frifsoidjfnakls%Key'; // This should be a very long and complex secret, preferably stored in a secure environment.

export const createJWT = (payload: object, expiresIn: number): string => {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');
  const encodedPayload = Buffer.from(JSON.stringify({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + expiresIn
  })).toString('base64');

  const signature = crypto
    .createHmac('sha256', secret)
    .update(encodedHeader + '.' + encodedPayload)
    .digest('base64');

  return encodedHeader + '.' + encodedPayload + '.' + signature;
};

export const verifyJWT = (token: string): any => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  if (!encodedHeader || !encodedPayload || !signature) {
    throw new Error("Invalid Token");
  }

  // Verify Signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(encodedHeader + '.' + encodedPayload)
    .digest('base64');

  if (expectedSignature !== signature) {
    throw new Error("Invalid Signature");
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());

  if (payload.exp && Date.now() / 1000 > payload.exp) {
    throw new Error("Token Expired");
  }

  return payload;
};
