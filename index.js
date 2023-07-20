//Node js stuff!!!
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import { randomUID, getrb } from "./tools/cookies.js"
import { createAccount } from './mongo.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.cookieParser());
app.listen(process.env.PORT || 5000);

app.use(express.static(__dirname + "/web"));

app.post("/signup", async(req, res) => {
    let userData = req.body;
    if(!userData.user || !userData.pass)return res.send({"couldn't find any":"username orpassword"});
    let userJSON = JSON.parse(fs.readFileSync("users.json"));
    let takenUsers = Object.keys(userJSON.users);

    let user = userData.user?.replace(/\s/g, '').toLowerCase();
    let displayName = userData?.user.replace(/\s\s+/g, ' ');
    let pass = userData?.pass;
    let uid = randomUID();


    if (user.length < 3) return res.status(401).send({ "too short": "of a name (min 3 charactrers)" });
    if (user.length > 24 || displayName.length > 30) return res.status(401).send({ "too long": "of a name (max 24 username, 30 display)" });

    //if (takenUsers.indexOf(userData.user?.toLowerCase().replace(/\s/g, '')) !== -1) return res.status(400).send({ "Username already taken buckaroo": userData });

    //userJSON.users[userData.user?.toLowerCase().replace(/\s/g, '')] = { "password": userData.pass, displayName: userData.user.replace(/\s\s+/g, ' '), uid: randomUID() };

    //fs.writeFileSync("users.json", JSON.stringify(userJSON));

    let response = await createAccount(user, displayName, pass, uid);

    if(response[2])

    res.status(200).send({ "W": userData });
})
