import { randomBytes } from "node:crypto";
import aes256 from 'aes256';

export function randomUID() {
    let string1 = (Math.floor(Math.random() * 89999999) + 10000000).toString() + (Math.floor(Math.random() * 89999999) + 10000000).toString();
    let string2 = (Math.floor(Math.random() * 89999999) + 10000000).toString() + (Math.floor(Math.random() * 89999999) + 10000000).toString();
    let uid = string1 + string2;
    return uid;
}

export function getrb() {
    randomBytes(128, (err, buf) => {
        console.log(buf);
        var plaintext = 'my plaintext message';
        var buffer = Buffer.from(plaintext);

        var cipher = aes256.createCipher(buf.toString());

        var encryptedPlainText = cipher.encrypt(plaintext);
        var decryptedPlainText = cipher.decrypt(encryptedPlainText);
        console.log(encryptedPlainText, decryptedPlainText);
    })
}















