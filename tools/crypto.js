import bcrypt from 'bcrypt';
import "dotenv/config";
import crypto from 'node:crypto';

export function hashPass(p) {
    let hash = bcrypt.hashSync(p, 10);
    return hash;
}

export function encodeCookie(uid, iv, key) {
    iv = iv || crypto.randomBytes(16);
    key = key || crypto.randomBytes(32);
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(uid, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    let auth = { iv: iv.toString("hex"), key: key.toString("hex"), cookie: encrypted };
    return auth;
}

export function decodeCookie(auth) {
    let iv = Buffer.from(auth.iv, "hex");
    let key = Buffer.from(auth.key, "hex");
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(auth.cookie, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
}


