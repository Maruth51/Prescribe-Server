"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signup = exports.Login = void 0;
const firebase = require("firebase");
const config_1 = require("./utils/config");
const validator_1 = require("./utils/validator");
firebase.initializeApp(config_1.default);
exports.Login = (req, res) => {
    const { email = '', password = '' } = req.body;
    const user = { email, password };
    console.log(req.body, user);
    const { valid, errors } = validator_1.validateLoginData(user);
    if (!valid)
        return res.status(400).json(errors);
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((data) => {
        var _a;
        return (_a = data.user) === null || _a === void 0 ? void 0 : _a.getIdToken();
    }).then((token) => {
        res.json({ token });
    }).catch((error) => {
        console.error(error);
        return res.status(403).json({ error: 'wrong credentials, please try again' });
    });
};
exports.Signup = (req, res) => {
    const { email = '', password = '' } = req.body;
    const user = { email, password };
    console.log(req.body, user);
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((data) => {
        var _a;
        return (_a = data.user) === null || _a === void 0 ? void 0 : _a.getIdToken();
    }).then((token) => {
        res.json({ token });
    }).catch((error) => {
        console.error(error);
        return res.status(403).json({ error });
    });
};
//# sourceMappingURL=user.js.map