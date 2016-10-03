import {Schema, model} from "mongoose";

let schema = Schema({
    description: String,
});
export var Messages = model('Canned_messages', schema);
