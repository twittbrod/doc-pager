import { User as UserModel } from "../models/users";

export async function login(name: string, password: string): Promise<any> {
    if (!name || !password)
        throw new Error('The Username or password that you  entered doesnt match any account');
    
    let user: Document = await UserModel.findOne({ name: name });
    
    if (!user || !(await user.comparePassword(password)))
        throw new Error('Invalid username or password');
    
    return user.id;
}