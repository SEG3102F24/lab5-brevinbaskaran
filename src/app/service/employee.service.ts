import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesCollection = collection(this.firestore, 'employees');

  constructor(private firestore: Firestore) {}

  // Fetch list from Firestore
  getEmployees(): Observable<Employee[]> {
    return collectionData(this.employeesCollection, { idField: 'id' }) as Observable<Employee[]>;
  }

  // Add the new employee to Firestore
  addEmployee(employee: Employee): Promise<void> {
    // Had to change so date is stored in a correct format for display 
    return addDoc(this.employeesCollection, { 
      ...employee,
      dateOfBirth: employee.dateOfBirth.toISOString() // Convert to string 
    }).then(() => {
      console.log('Employee added successfully');
    }).catch((error) => {
      console.error('Error adding employee: ', error);
    });
  }
}
