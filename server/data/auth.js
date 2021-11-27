import "express-async-errors";
import bcrypt from "bcrypt";

let user_DB = [
  {
    username: "abc",
    password: bcrypt.hashSync("1234", 10),
    name: "abc",
    email: "a@naver.com",
    url: null,
  },
  {
    username: "abcd",
    password: bcrypt.hashSync("1234", 10),
    name: "abcd",
    email: "abcd@naver.com",
    url: null,
  },
];

export async function createUser(username, password, name, email, url) {
  // check user
  const new_user = {
    username,
    password: bcrypt.hashSync(password, 10),
    name,
    email,
    url,
  };
  const username_idx = user_DB.findIndex((user) => user.username === username);
  if (username_idx !== -1) return "username";
  const email_idx = user_DB.findIndex((user) => user.email === email);
  if (email_idx !== -1) return "email";
  user_DB.push(new_user);
  return true;
}

export async function loginUser(username, password) {
  const user_idx = user_DB.findIndex((user) => user.username === username);
  if (user_idx === -1) return false;
  return bcrypt.compareSync(password, user_DB[user_idx].password);
}
