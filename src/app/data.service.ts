import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { empVM } from '../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb(){ 
    let employees: empVM[] = [
      {id:1, empDept:'Accounts', empName:'Hadi', mobile:'03005210099', gender:'Male',joiningDate:'2019-03-14', email:'hadi786@gmail.com',salary:50000,password:'123',empStatus:true},
      {id:2, empDept:'Accounts', empName:'Hamza', mobile:'03005210091', gender:'Male',joiningDate:'2023-03-14', email:'hamza786@gmail.com',salary:80000,password:'1234',empStatus:true},
      {id:3, empDept:'Accounts', empName:'Haider', mobile:'03005210092', gender:'Male',joiningDate:'2010-04-16', email:'haider786@gmail.com',salary:100000,password:'12345',empStatus:true}
    ];

    return {employees};

  }
}
