import { User } from "../user";
import { Comment } from "./comment";

export interface Post{
    id:number,
    user:User,
    title:string,
    body:string,
    dateTime:string,
    comments:Comment[]
}