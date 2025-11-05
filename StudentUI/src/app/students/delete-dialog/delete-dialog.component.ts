import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { StudentService } from '../../services/student/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  constructor(private readonly studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public studentId: any,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {}

  onDelete() {
    this.studentService.deleteStudent(this.studentId).subscribe(
      (success) => {
        this.snackbar.open("Öğrenci başarılı bir şekilde silindi.", undefined)
        setTimeout(() => {
          this.router.navigateByUrl('students')
        }, 1000);
      },
      (err) => {
        this.snackbar.open("Öğrenci silinemedi", undefined)
      });
  }

}
