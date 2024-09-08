"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidate = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = require("joi");
const types_1 = require("../types");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: types_1.USERROLE,
        default: types_1.USERROLE.STUDENT,
    },
});
const user = (0, mongoose_1.model)("User", userSchema);
exports.userValidate = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required(),
    role: joi_1.default.string(),
});
//# sourceMappingURL=user.js.map