export function _dotheschemathing() {
    const accountSchema = {
        user: { type: String, default: false },
        displayName: { type: String, default: false },
        uid: { type: String, default: false },
        pass: { type: String, default: false },
        auth: {
            cookie: { type: String, default: false },
            iv: { type: String, default: false },
            key: { type: String, default: false }
        },
        dateCreated: { type: Number, default: false },
        lastLogin: { type: Number, default: 0 },
        email:{type:String, default:false}
    }

    return { accountSchema: accountSchema };
}