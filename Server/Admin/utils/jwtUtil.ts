import * as tsCryptoLib from './Crypto-lib/Crypto-ts/src/HmacSHA256';
import { Base64, Hex, Utf8, Word32Array, Word64Array } from './Crypto-lib/Crypto-ts/src';

const secretString = '31415926535898_superSuperSupcret%frifsoidjfnakls%Key'; // This should be a very long and complex secret, preferably stored in a secure environment.
const secret: Word32Array = Utf8.parse(secretString);

export const createJWT = (payload: object, expiresIn: number): string => {
  
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

 
  // const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');
  // const encodedPayload = Buffer.from(JSON.stringify({
  //   ...payload,
  //   exp: Math.floor(Date.now() / 1000) + expiresIn
  // })).toString('base64');
  // const signature = crypto
  //   .createHmac('sha256', secret)
  //   .update(encodedHeader + '.' + encodedPayload)
  //   .digest('base64');

  // const signature = cryptoLib.AES.encrypt(encodedHeader + '.' + encodedPayload, secret).toString();
  // return encodedHeader + '.' + encodedPayload + '.' + signature;
  
  const stringifiedHeader = JSON.stringify(header);
  // Test failing:
  // const encodedHeader = Base64.parse(stringifiedHeader);

  const stringifiedPayload = JSON.stringify({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + expiresIn
  });

  // Test failing:
  // const encodedPayload = Base64.parse(stringifiedPayload);

  const encodedHeader = Base64.stringify(Utf8.parse(stringifiedHeader));
  const encodedPayload = Base64.stringify(Utf8.parse(stringifiedPayload));


  const signature = tsCryptoLib.HmacSHA256(encodedHeader + '.' + encodedPayload, secret);
  const encodedSignature = urlSafeBase64Encode(signature);

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
};


export const verifyJWT = (token: string): any => {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error("Invalid Token");
  }

  // const [encodedHeader, encodedPayload, encodedSignature] = parts;

  // if (!encodedHeader || !encodedPayload || !signature) {
  //   throw new Error("Invalid Token");
  // }

  // Verify Signature
  // const expectedSignature = cryptoLib.AES.decrypt(encodedHeader + '.' + encodedPayload, secret).toString();

  // if (expectedSignature !== signature) {
  //   throw new Error("Invalid Signature");
  // }

  // const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());
  // Verify Signature
  
  // if (urlSafeExpectedSignature !== signature) {
  //   throw new Error("Invalid Signature");
  // }

  // const payload = JSON.parse(urlSafeBase64Decode(encodedPayload));


  // if (payload.exp && Date.now() / 1000 > payload.exp) {
  //   throw new Error("Token Expired");
  // }

  // return payload;


  const [encodedHeader, encodedPayload, encodedSignature] = parts;

  if (!encodedHeader || !encodedPayload || !encodedSignature) {
    throw new Error("Invalid Token");
  }

  const expectedSignature = tsCryptoLib.HmacSHA256(encodedHeader + '.' + encodedPayload, secret);
  const expectedEncodedSignature = urlSafeBase64Encode(expectedSignature);

  if (expectedEncodedSignature !== encodedSignature) {
    throw new Error("Invalid Signature");
  }

  // Test failure:
  // const payloadString = urlSafeBase64Decode(encodedPayload).toString();
  // const payload = JSON.parse(payloadString);

  const payloadString = Utf8.stringify(urlSafeBase64Decode(encodedPayload));
  const payload = JSON.parse(payloadString);

  if (payload.exp && Date.now() / 1000 > payload.exp) {
    throw new Error("Token Expired");
  }

  return payload;
};


function urlSafeBase64Encode(wordArray: Word32Array): string {
  // Assuming toString(Base64) converts the Word32Array to a Base64 string
  const base64String = wordArray.toString(Base64); // This needs to be checked against the actual library
  // Make it URL safe by replacing '+' with '-' and '/' with '_'
  return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function urlSafeBase64Decode(str: string): Word32Array {
  // Add the required '=' padding back based on the string length
  const padding = 4 - (str.length % 4);
  if (padding < 4) {
    str += "=".repeat(padding);
  }
  // Replace URL-safe characters back to the original Base64 characters
  const base64String = str.replace(/-/g, '+').replace(/_/g, '/');
  // Assuming parse() converts the Base64 string to Word32Array
  return Base64.parse(base64String); // This needs to be checked against the actual library
}
