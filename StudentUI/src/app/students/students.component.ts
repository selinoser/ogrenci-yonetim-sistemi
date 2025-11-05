import { Component, inject, ViewChild } from '@angular/core';
import { Student } from '../api-models/ui-models/student.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { MatAnchor } from "@angular/material/button";
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from "../layout/header/header.component";
import { StudentService } from '../services/student/student.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  imports: [MatTableModule, CommonModule, MatPaginatorModule, MatSortHeader, MatSortModule, FormsModule, MatIconModule, RouterLink, MatAnchor, HeaderComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
  students: Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'studentNumber', 'department', 'dateOfBirth', 'email', 'mobile', 'gender.description', 'edit'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterString: string = "";
  constructor(private studentService: StudentService, private snackbar: MatSnackBar) {
  }


  getStudents() {
    this.studentService.getStudents().subscribe(
      (success) => {
        this.students = success;
        this.dataSource = new MatTableDataSource<Student>(this.students);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch(property) {
            case 'gender.description' : return item.gender.description;
            default: return property
          }
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {

      }
    )
  }

  ngOnInit() {
    this.getStudents();
  }

  filterStudents(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      return data.gender.description.toLocaleLowerCase().includes(filter)
      || data.firstName.toLocaleLowerCase().includes(filter)
      || data.lastName.toLocaleLowerCase().includes(filter)
      || data.dateOfBirth.substring(0,10).includes(filter)
      || data.email.toLocaleLowerCase().includes(filter)
      || data.studentNumber.toLocaleLowerCase().includes(filter)
      || data.department.toLocaleLowerCase().includes(filter)
      || data.mobile.toString().toLocaleLowerCase().includes(filter)
    } 
  }


  readonly dialog = inject(MatDialog);
  onDelete(id: any) {
    const dialogRef =  this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
        this.getStudents();
    });
  }
}
