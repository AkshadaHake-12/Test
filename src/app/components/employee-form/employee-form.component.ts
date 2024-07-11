import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee = { employee_name: '', employee_salary: '', employee_age: '' };
  id: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.employeeService.getEmployee(this.id).subscribe((data: any) => {
          this.employee = data.data;
        },
      (error)=>{
        alert('Failed to fetch employees data. Please try again later.');
      });
      }
    });
  }

  saveEmployee(): void {
    if (this.id) {
      this.employeeService.updateEmployee(this.id, this.employee).subscribe((res) => {
        this.router.navigate(['/employees']);
      },
       (error)=>{
        alert('Failed to Update employees data. Please try again later.');
      });
    } else  {
      this.employeeService.createEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/employees']);
      },
      (error)=>{
        alert('Failed to Save employees data. Please try again later.');
      });
    }
  }
}
