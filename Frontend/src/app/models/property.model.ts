import { User } from "./user.model";

export interface Property
{
    PropertyId?:number;
    Title :string;
    Description:string;
    Location:string;
    AreaSize:number;
    Price:number;
    PostedDate:Date | null;
    Status:string;
    NumberOfOwners:number;
    IsDtcpApproved:boolean;
    UserId?:number;
    User?:User;
    [key: string]: any;
}