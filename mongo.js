import mongoose from "mongoose";
import { hashPass, encodeCookie, decodeCookie } from "./tools/crypto.js";
import { _dotheschemathing } from "./tools/schemas.js";
import 'dotenv/config'
const URI = process.env.URI;
const Schemas = _dotheschemathing();

let db = await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

export async function createAccount(user, displayName, pass, uid) {
  let arg = Array.from(arguments);
  if (arg.length !== 4) return [500, "Not enough arguments :("];
  for (let i = 0; i < arg.length; i++) {
    if (!arg[i]) return [500, "Argument not met: " + i];
  }

  if (user.length < 3 || user.length > 24) return [400, "Bad user length"];
  if (pass.length > 64) return [400, "Way too long password bro wth"];
  if (displayName.length > 30) return [400, "Now the display name is too long dummy"];
  if (uid) "ok idk"

  const accountModel = db.model("accounts", Schemas.accountSchema);

  let taken = await accountModel.find({user:"pp"}).exec();
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

  await acc.save();
  return [200, "MAde the account woohoo", auth.cookie];
}

/*
try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = await client.db("admin").command({ ping: 1 });

    console.log(db);
    

    await db.collection('inventory').insertMany([
        {
          item: 'journal',
          qty: 25,
          tags: ['blank', 'red'],
          size: { h: 14, w: 21, uom: 'cm' }
        },
        {
          item: 'mat',
          qty: 85,
          tags: ['gray'],
          size: { h: 27.9, w: 35.5, uom: 'cm' }
        },
        {
          item: 'mousepad',
          qty: 25,
          tags: ['gel', 'blue'],
          size: { h: 19, w: 22.85, uom: 'cm' }
        }
    ]);


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}catch(err){
    console.log(err);
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
}


*/