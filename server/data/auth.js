import { getUsers } from "../db/database.js";
import MongoDB from "mongodb";

const ObjectId = MongoDB.ObjectId;

export async function findByUsername(username) {
  return getUsers()
    .findOne({ username })
    .then((data) => {
      // const user = { ...data, id: data._id };
      // console.log(user);
      return mapOptionalUser(data);
    });
}

export async function findById(id) {
  return getUsers()
    .findOne({ _id: ObjectId(id) })
    .then(mapOptionalUser);
}

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((data) => {
      // console.log(data.insertedId.toString());
      return data.insertedId.toString();
    });
}

function mapOptionalUser(user) {
  // user가 null 일 경우 그냥 null 반환
  return user ? { ...user, id: user._id } : user;
}
