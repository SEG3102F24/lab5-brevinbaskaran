import { Injectable } from '@angular/core';
import { Firestore, collectionData, addDoc, collection, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from './model/employee';  

@Injectable({
  providedIn: 'root'
})
export class EmployeeDbService {

  private employeesCollection = collection(this.firestore, 'employees');  

  constructor(private firestore: Firestore) {}

  // Fetch all employees
  getEmployees(): Observable<Employee[]> {
    return collectionData(this.employeesCollection, { idField: 'id' }) as Observable<Employee[]>;
  }

  // Add new employee
  addEmployee(employee: Employee): Promise<void> {
    return addDoc(this.employeesCollection, employee)
      .then(() => console.log('Employee added successfully'))
      .catch(error => console.error('Error adding employee: ', error));
  }

  // Update employee by id
  updateEmployee(employee: Employee, id: string): Promise<void> {
    const employeeDocRef = doc(this.firestore, `employees/${id}`);
    return updateDoc(employeeDocRef, { ...employee })
      .then(() => console.log('Employee updated successfully'))
      .catch(error => console.error('Error updating employee: ', error));
  }

  // Delete employee by id
  deleteEmployee(id: string): Promise<void> {
    const employeeDocRef = doc(this.firestore, `employees/${id}`);
    return deleteDoc(employeeDocRef)
      .then(() => console.log('Employee deleted successfully'))
      .catch(error => console.error('Error deleting employee: ', error));
  }
}
