import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { empVM } from '../Models/employee';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DBOperation } from '../Helpers/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HR_Management';
  employeeForm: FormGroup = new FormGroup({});
  employees: empVM[] = [];
  buttonText: string = "Save";
  operation: DBOperation;

  constructor(private _fb: FormBuilder, private _empService: EmployeeService, private _toastr: ToastrService) { }

  ngOnInit() {
    this.setEmpForm();
    this.allEmployees();

  }

  setEmpForm() {
    this.buttonText = "Save";
    this.operation = DBOperation.create;
    this.employeeForm = this._fb.group({
      id: [0],
      empDept: ['', Validators.required],
      empName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      mobile: ['', [Validators.required, Validators.minLength(11)]],
      gender: ['', Validators.required],
      joiningDate: ['', Validators.required],
      email: ['', Validators.required],
      salary: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', [Validators.required, Validators.minLength(8)]],
      empStatus: [false, Validators.requiredTrue]



    })
  }
  formSubmit() {
    console.log(this.employeeForm.value);
    if(this.employeeForm.invalid){
      return;
    }
    switch(this.operation){

      case DBOperation.create:
        this._empService.addEmployee(this.employeeForm.value).subscribe(res => {
          this._toastr.success("Employee Added Successfully!","Employee Registration");
          this.allEmployees();
          this.resetBtn();
        })

      break;

      case DBOperation.update:
        this._empService.updateEmployee(this.employeeForm.value).subscribe(res => {
          this._toastr.success("Employee Updated Successfully!","Employee Registration");
          this.allEmployees();
          this.resetBtn();
        })

      break;
    }
  }

  get f() {

    return this.employeeForm.controls;
  }

  resetBtn() {
    this.employeeForm.reset();
    this.buttonText = "Save";
  }

  cancelBtn() {
    this.employeeForm.reset();
    this.buttonText = "Save";
  }

  allEmployees() {
    this._empService.getAllEmployees().subscribe((response: empVM[]) => {
      this.employees = response;


    })
  }

  Edit(empid: number){

    this.buttonText = "Update";
    this.operation = DBOperation.update;

    let empData = this.employees.find((e: empVM)=> e.id === empid );
    this.employeeForm.patchValue(empData);
  }

  Delete(empid: number){
    //alert(empid)
    

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._empService.deleteEmployees(empid).subscribe(res => {
          this.allEmployees();
          this._toastr.success("Employee Deleted Successfully!", "Employee Registration");
        })
        // swalWithBootstrapButtons.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }


}
