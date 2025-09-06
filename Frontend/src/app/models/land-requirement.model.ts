
export interface LandRequirement
{
    LandRequirementId:number;
    Title:string;
    Description:string;
    Location:string;
    AreaSize:number;
    PostedDate:Date;
    Status:string;
    [key: string]: any;
}