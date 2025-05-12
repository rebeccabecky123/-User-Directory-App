import { boolean } from "zod";

export interface User {
    id:number;
    name:string;
    username:string;
    email:string;
    address: address;
    phone:string;
    website: string;
    company: company;
    age: number; 
    role: userRole;

}
export interface address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Geo {
    lat:string;
    lng: string;
}

export interface company {
    name:string;
    catchPhrase: string;
    bs: string;
}

export enum userRole {
    ADMIN = "admin",
    EDITOR = "Edtor",
    VIEWER = "Viewer"
}

export interface UserFormData {
    name: string;
    email: string;
    age: string;
    role: userRole;
}

export type UserActionType = 
{type: 'ADD_USER'; payload: User }
{type: 'SET_USERS'; payload: User []}
{type: 'SET_LOADING'; payload: boolean}
{type: 'SET_ERROR'; payload: string | null};

export interface UserContextType {
    users: User[];
    loading: boolean;
    error: string | null;
    addUser: (user: User) => void;
    dispatch: React.Dispatch<UserActionType>;
}