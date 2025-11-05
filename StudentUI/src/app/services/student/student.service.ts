import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { updateStudentRequest } from '../../api-models/updateStudentRequest';
import { addStudentRequest } from '../../api-models/addStudentRequest';
import { Student } from '../../api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:7256';

  constructor(private httpClient: HttpClient) {
  }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/Students');
  }

  getStudent(studentId: string | null | undefined): Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/students/' + studentId);
  }

  updateStudent(studentId: string | null | undefined, studentRequest: Student): Observable<Student> {
    const updateStudentRequest: updateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
      nationalId: studentRequest.nationalId,
      department: studentRequest.department,
      studentNumber: studentRequest.studentNumber,
      enrollmentDate: studentRequest.enrollmentDate
    };
    return this.httpClient.put<Student>(this.baseApiUrl + '/students/' + studentId, updateStudentRequest);
  }

  addStudent(studentRequest: Student): Observable<Student> {
    const addStudentRequest: addStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
      nationalId: studentRequest.nationalId,
      department: studentRequest.department,
      studentNumber: studentRequest.studentNumber,
      enrollmentDate: studentRequest.enrollmentDate
    };
    return this.httpClient.post<Student>(this.baseApiUrl + '/students/add', addStudentRequest);
  }

  getImagePath(relativePath:string) {
    return `${this.baseApiUrl}/${relativePath}`;
  }

  uploadImage(studentId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("profileImage", file)
    return this.httpClient.post(this.baseApiUrl + '/students/' + studentId + '/upload-image' , formData, {
      responseType: 'text'
    });
  }

  deleteStudent(studentId: string): Observable<Student> {
    return this.httpClient.delete<Student>(this.baseApiUrl + '/students/' + studentId);
  }
}
