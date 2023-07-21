//Node js stuff!!!
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { randomUID, getrb } from "./tools/cookies.js"
import { createAccount } from './mongo.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.listen(process.env.PORT || 5000);

app.use(express.static(__dirname + "/web"));

app.post("/signup", async(req, res) => {
    let userData = req.body;
    if(!userData?.user || !userData?.pass || !userData?.email)return res.status(400).send({"W":"No username/password/email"});

    let user = userData.user?.replace(/\s/g, '').toLowerCase();
    let displayName = userData?.user.replace(/\s\s+/g, ' ');
    let pass = userData?.pass;
    let email = userData?.email; //verify!!
    let uid = randomUID();

    if(email.length > 254)return res.status(400).send({"W":"is your email really that long damn"});
    if (user.length < 3) return res.status(400).send({ "W": "too short of a name (min 3 charactrers)" });
    if (user.length > 24 || displayName.length > 30) return res.status(400).send({ "W": "too long of a name (max 24 username, 30 display)" });

    let response = await createAccount(user, displayName, pass, uid);
    console.log(response);

    //max age 1 week
    if(response[2])res.cookie("_authUU", Buffer.from(response[2]).toString("base64"), {maxAge: 604800000, httpOnly: true});

    return res.status(response[0]).send({ "W": response[1] });
})
