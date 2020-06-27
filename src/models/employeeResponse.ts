import { Employee } from './employee';

export interface EmployeeResponse{
  status?:string;
  data?: Employee[];
}
