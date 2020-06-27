import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { Employee } from 'src/models/employee';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  employeeList:Employee[];
  employeeForm: FormGroup;
  displayedColumns: string[] = ['employee_name', 'employee_age', 'employee_salary','actions'];
  dataSource:any;
  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {

    this.employeeForm = this.formBuilder.group({
      employeeName: [''],
      employeeSalary: [''],
      employeeAge: ['']

    });

    this.loadEmployees();
    this.dataSource.paginator = this.paginator;
  }

  createEmployee() {
    const employee:any = {
      name: this.employeeForm.get('employeeName').value,
      salary: parseInt(this.employeeForm.get('employeeSalary').value,10),
      age: parseInt(this.employeeForm.get('employeeAge').value,10)
    }

    this.employeeService.createEmployee(employee).subscribe( data=>{
      if(data.status === 'success') {
        console.log('employee creation successful',data.data);
      }else{

      }
    });
  }

async  loadEmployees() {
  const response = await this.employeeService.getEmployees().toPromise();
  this.employeeList = response.data;
  this.dataSource = new MatTableDataSource<Employee>(this.employeeList);
  }

  deleteEmployee(obj :Employee){
    let empId = obj.id;
    console.log('deleted sucessfull')
    this.employeeService.deleteEmployeeById(empId).subscribe(
      data =>{
        if(data.status == "success"){
          console.log('deleted sucessfull')
        }
      }
    );
  }
  updateEmployee(obj :Employee){
    const employee:any = {
      name: this.employeeForm.get('employeeName').value,
      salary: parseInt(this.employeeForm.get('employeeSalary').value,10),
      age: parseInt(this.employeeForm.get('employeeAge').value,10)
    }
    let empId = obj.id;
    console.log('deleted sucessfull')
    this.employeeService.updateEmployeeById(employee,empId).subscribe(
      data =>{
        if(data.status == "success"){
          console.log('update sucessfull')
        }
      }
    );
  }
}
