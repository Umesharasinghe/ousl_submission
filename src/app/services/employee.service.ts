import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/models/employee';
import { EmployeeResponse } from 'src/models/employeeResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httPclient:HttpClient) { }

  getEmployees(): Observable<EmployeeResponse>{
      return this.httPclient.get<EmployeeResponse>('http://dummy.restapiexample.com/api/v1/employees');
  }

  createEmployee(body:any): Observable<any>{
      return this.httPclient.post('http://dummy.restapiexample.com/api/v1/create',body);
  }

  deleteEmployeeById(empId: number): Observable<any>{
    return this.httPclient.delete(`http://dummy.restapiexample.com/api/v1/delete/${empId}`);
  }

  updateEmployeeById(body:Employee,empId: number): Observable<any>{
    return this.httPclient.put(`http://dummy.restapiexample.com/api/v1/update/${empId}`,body);
  }
}
