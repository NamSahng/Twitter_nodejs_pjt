import * as authRepository from "../data/auth.js";

import { makeToken, verifyToken } from "../middleware/jwt.js";

// router.post("/signup", authController.createUser);
// router.post("/signup", authController.login);
// router.post("/me", authController.me);

export async function createUser(req, res, next) {
  const { username, password, name, email, url } = req.body;
  const isValid = await authRepository.createUser(
    username,
    password,
    name,
    email,
    url
  );
  if (isValid === true) {
    const token = makeToken(username);
    res.status(201).json({ token, username });
  } else {
    res.status(400).json({ message: `${isValid} is duplicated` });
  }
}

export async function login(req, res, next) {
  const { username, password } = req.body;
  const isUser = await authRepository.loginUser(username, password);
  const token = makeToken(username);
  if (isUser) {
    res.status(201).json({ token, username });
  } else {
    res.status(404).json({ message: `user not found or pwd is wrong` });
  }
}

export async function me(req, res) {
  const { token, username } = req.body;
  const matched = verifyToken(token);
  if (matched) {
    res.status(200).json({ token, username });
  } else {
    res.status(400).json({ message: `invalid token` });
  }
}
