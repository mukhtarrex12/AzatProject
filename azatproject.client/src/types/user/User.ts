import { UserRole } from "../../enums/UserRole";

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt: string;
}