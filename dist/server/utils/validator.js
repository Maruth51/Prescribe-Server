"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginData = void 0;
const isEmpty = (value) => {
    if (value.trim() === '')
        return true;
    else
        return false;
};
exports.validateLoginData = (data) => {
    let errors = { email: "", password: '' };
    if (isEmpty(data.email))
        errors.email = 'Must not be empty';
    if (isEmpty(data.password))
        errors.password = 'Must not be  empty';
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};
//# sourceMappingURL=validator.js.map