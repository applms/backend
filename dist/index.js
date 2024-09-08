"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const app = (0, express_1.default)();
const users_1 = require("./routes/users");
mongoose_1.default
    .connect(process.env.URL_DATABASE || "")
    .then(() => console.log("Connect success to MongoDB"))
    .catch(() => console.log("Could not Connect to MongoDB"));
app.use(express_1.default.json());
app.use("/api/users", users_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port ", port));
//# sourceMappingURL=index.js.map