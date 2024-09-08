"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.default.Router();
router.post("/login", (res, req) => {
    return res.status(200).send("user logged in");
});
exports.default = router;
//# sourceMappingURL=users.js.map