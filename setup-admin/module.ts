import { User as UserModel,Roles} from "../models/users";

export async function setupAdmin() : Promise<any> {
    return await UserModel.findOne({role:'admin'})
}

export async function addAdmin(body) {
    return await UserModel.create({name:body.name,password:body.password,role:Roles[Roles.admin]});
}


