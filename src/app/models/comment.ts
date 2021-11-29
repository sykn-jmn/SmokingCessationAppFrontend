import { User } from "../user";

export interface Comment{
    id:number,
    comment:string,
    replies: Comment[],
    repliedFrom: Comment,
    dateTime:string,
    user:User
}