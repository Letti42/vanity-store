import mongoose from "mongoose";
import { hashPass, encodeCookie, decodeCookie } from "./tools/crypto.js";
import { _dotheschemathing } from "./tools/schemas.js";
import 'dotenv/config'
const URI = process.env.URI;

var db = await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schemas = _dotheschemathing();
const accountModel = db.model("accounts", Schemas.accountSchema);

export async function createAccount(user, displayName, pass, uid) {
  let arg = Array.from(arguments);
  if (arg.length !== 4) return [500, "Not enough arguments :("];
  for (let i = 0; i < arg.length; i++) {
    if (!arg[i]) return [500, "Argument not met: " + i];
  }

  if (user.length < 3 || user.length > 24) return [400, "Bad user length"];
  if (pass.length > 64) return [400, "Way too long password bro wth"];
  if (displayName.length > 30) return [400, "Now the display name is too long dummy"];
  if (uid) "ok idk";

  let taken = await accountModel.find({user:user}).exec();
  console.log(taken);
  if(taken.length)return [400, "Username already taken"];

  pass = hashPass(pass);
  let auth = encodeCookie(uid);

  const acc = new accountModel();
  acc.user = user;
  acc.displayName = displayName;
  acc.pass = pass;
  acc.uid = uid;
  acc.dateCreated = Date.now();
  acc.auth = auth;

  console.log("Creating account "+displayName);

  await acc.save();
  return [200, "MAde the account woohoo", auth.cookie];
}
