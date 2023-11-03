

const secretString = '31415926535898_superSuperSupeSecret%frifsoidjfnakls%Key'; // This should be a very long and complex secret, preferably stored in a secure environment.
const secret = Hex.parse(secretString);

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
  hmacSHA256
  const encodedHeader = Uint8Array(
    libs.converters.stringToBytes(JSON.stringify(header))
  );
  const stringifiedPayload = JSON.stringify({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + expiresIn
  });
  const encodedPayload = libs.base64.fromByteArray(
    libs.converters.stringToBytes(stringifiedPayload)
  );

  const signature = libs.crypto.hmacSha256(secret, libs.converters.stringToBytes(encodedHeader + '.' + encodedPayload));
  const encodedSignature = libs.base64.fromByteArray(signature);

  return encodedHeader + '.' + encodedPayload + '.' + encodedSignature;
};
};

export const verifyJWT = (token: string): any => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  if (!encodedHeader || !encodedPayload || !signature) {
    throw new Error("Invalid Token");
  }

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

  const cipherParams = cryptoLib.AES.encrypt(encodedHeader + '.' + encodedPayload, secret);
  const base64String = cipherParams.toString();
  const urlSafeExpectedSignature = urlSafeBase64Encode(base64String);

  if (urlSafeExpectedSignature !== signature) {
    throw new Error("Invalid Signature");
  }

  const payload = JSON.parse(urlSafeBase64Decode(encodedPayload));

  if (payload.exp && Date.now() / 1000 > payload.exp) {
    throw new Error("Token Expired");
  }

  return payload;
};


function urlSafeBase64Encode(str: string): string {
  return cryptoLib.enc.Base64.parse(str).toString(cryptoLib.enc.Base64);
}

function urlSafeBase64Decode(str: string): string {
  return cryptoLib.enc.Base64.parse(str).toString(cryptoLib.enc.Utf8);
}


