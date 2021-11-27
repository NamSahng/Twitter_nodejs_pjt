import jwt from "jsonwebtoken";

const secret = "fSTWh2471^%Vw9dmUyYR$BXL*VJhq&N&";

export function makeToken(username) {
  const token = jwt.sign(
    {
      username,
      isAdmin: false,
    },
    secret,
    { expiresIn: 120 }
  );
  return token;
}

export function verifyToken(token) {
  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {}
  return decoded ? true : false;
}
