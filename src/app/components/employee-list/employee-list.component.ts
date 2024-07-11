import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  displayedColumns: string[] = ['name', 'salary', 'age', 'actions'];
  hasRecords: boolean = false; // Track if records are present

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((data: any) => {
      this.employees = data.data;
      this.hasRecords = this.employees.length > 0; // Update flag based on data
    },
    (error)=>{
      alert('Failed to Get employees data. Please try again later.');
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe((res) => {
      setTimeout(()=>{
        this.getEmployees();
      },60000)
    },
    (error)=>{
      alert('Failed to Get employees data. Please try again later.');
    });
  }

  editEmployee(id: number): void {
    this.router.navigate(['/employee/edit', id]);
  }
}
