export interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
  }
  
  export enum UserRole {
    Admin = 'Admin',
    Editor = 'Editor',
    Viewer = 'Viewer'
  }
  