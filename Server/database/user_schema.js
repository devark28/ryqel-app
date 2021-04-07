// Imports

let mongoose = require("mongoose");

// Initialisations

mongoose.connect("mongodb+srv://teta:mongo-mdb%2Bpass.2020@cluster0.bndcy.mongodb.net/accounts", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database Status: Online"));
let schema = mongoose.Schema;

let account_data_schema = new schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_token: {
        type: String,
        required: true
    }
}, { collection: "users" });

let account_data = mongoose.model("account", account_data_schema);

module.exports = account_data;