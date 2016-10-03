import {Messages} from "./canned-messages-model";
import { User as UserModel,Roles} from "../models/users";



export async function create(body) {
    return await Messages.create({ description: body.description });
}

export async function list() : Promise<any> {
     return await Messages.find({}, {description : 1}); 
}

export async function read(messageId) {
    return await Messages.findById(messageId);
}

export async function update(messageId, message) {
    return await Messages.findByIdAndUpdate(messageId,{$set:{description:message}},{new:true}).exec();
}

export async function remove(messageId) {
    return await Messages.findOneAndRemove(messageId).exec();
}
