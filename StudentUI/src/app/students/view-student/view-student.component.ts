import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Student } from '../../api-models/ui-models/student.model';
import { GenderService } from '../../services/gender/gender.service';
import { Gender } from '../../api-models/ui-models/gender.model';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { IMaskModule } from 'angular-imask';
import { NumbersOnlyDirective } from '../../directives/NumbersOnlyDirective';
import { HeaderComponent } from '../../layout/header/header.component';
import { StudentService } from '../../services/student/student.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-view-student',
  imports: [RouterModule, MatIconModule, MatAnchor, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule,
    CommonModule, MatMomentDateModule, IMaskModule, NumbersOnlyDirective, HeaderComponent],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent {

  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    },
    nationalId: '',
    department: '',
    studentNumber: '',
    enrollmentDate: ''

  }

  genderList: Gender[] = [];
  isNewStudent = false;
  header = "";
  displayProfileImageUrl = "";


  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');
      //studentId add ise eklemeye göre 
      if (this.studentId === "add") {
        this.isNewStudent = true;
        this.header = "Öğrenci Ekle";
        this.setImage();
      } else {
        this.isNewStudent = false;
        this.header = "Öğrenciyi Düzenle";
        this.studentService.getStudent(this.studentId).subscribe(
          (success) => {
            this.student = success;
            this.setImage();
          },
          (err) => {
            this.setImage();
          }
        )
      }

      this.genderService.getGenderList().subscribe(
        (success) => {
          this.genderList = success;
        },
        (err) => {

        }
      )
    })
  }

  onUpdate() {
    this.studentService.updateStudent(this.student.id, this.student).subscribe(
      (success) => {
        this.snackbar.open("Öğrenci başarılı bir şekilde güncellendi.", undefined)
        this.router.navigateByUrl('students');
      },
      (err) => {
        this.snackbar.open("Öğrenci güncellenemedi!!!", undefined)
      },
    )
  }

  onAdd() {
    this.studentService.addStudent(this.student).subscribe(
      (success) => {
        this.snackbar.open("Öğrenci başarılı bir şekilde eklendi.", undefined)
        setTimeout(() => {
          this.router.navigateByUrl(`students/${success.id}`);
        }, 2000);

      },
      (err) => {
        this.snackbar.open("Öğrenci eklenemedi!!!", undefined)
      },
    )
  }

  setImage() {
    if (this.student.profileImageUrl) {
      this.displayProfileImageUrl = this.studentService.getImagePath(this.student.profileImageUrl);
    } else {
      this.displayProfileImageUrl = "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png";
    }
  }

  uploadImage(event: any) {



    if (this.studentId) {
      const file: File = event.target.files[0];
      this.studentService.uploadImage(this.studentId, file).subscribe((success) => {
        this.student.profileImageUrl = success;
        this.setImage();
        this.snackbar.open("Başarılı bir şekilde resim güncellendi.", undefined)
      },
        (err) => {

        })
    }
  }

  readonly dialog = inject(MatDialog);
  onDeleteDialog() {
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: this.student.id
    });
  }
}
