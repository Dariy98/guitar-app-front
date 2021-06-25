import {Component, OnInit} from '@angular/core';
import {classes, genres, levels} from 'src/app/interfases/constants';
import {Subscription} from 'rxjs';
import {HttpEventType} from '@angular/common/http';
import {FilesService} from '../../../services/files.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-for-add',
  templateUrl: './modal-for-add.component.html',
  styleUrls: ['./modal-for-add.component.css']
})
export class ModalForAddComponent implements OnInit {

  public title = new FormControl('', [Validators.required]);
  public genre: string;
  public selectedClass: string;
  public level: string;
  public error: string;
  public fileName = '';
  public genres = genres;
  public classes = classes;
  public levels = levels;
  public loading: boolean;
  public files;
  private description = '';
  private uploadSub: Subscription;

  constructor(
    private filesService: FilesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  public ngOnInit(): void {
  }

  public getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  public select(event) {
    this.selectedClass = event.value;
  }

  public changeDesc(event) {
    this.description = event.value;
  }

  public selectGenre(event) {
    this.genre = event.value;
  }

  public selectLevel(event) {
    this.level = event.value;
  }

  public fileSelected(event) {
    this.files = event.target.files;
    console.log('this.allFiles', this.files);
    if (this.files) {
      for (const key in this.files) {
        if (this.files.hasOwnProperty(key)) {
          this.fileName = this.fileName + this.files[key].name + '; ';
        }
      }
    }
  }

  public sendData() {
    this.loading = true;
    this.error = '';

    if (this.files) {
      const formData = new FormData();
      for (const key in this.files) {
        if (this.files.hasOwnProperty(key)) {
          formData.append('file', this.files[key]);
        }
      }

      formData.append('title', this.title.value);
      formData.append('description', this.description);
      formData.append('genre', this.genre);
      formData.append('class', this.selectedClass);
      formData.append('level', this.level);

      this.uploadSub = this.filesService.sendFile(formData)
        .subscribe(
          (httpEvent) => {
            console.log('httpEvent', httpEvent);

            if (httpEvent.type === HttpEventType.Response && httpEvent.status === 200) {
              this.loading = false;
              this.dialog.closeAll();
              this.snackBar.open('Data is sent', 'Ok', {
                horizontalPosition: 'start',
                verticalPosition: 'top',
              });
              //   const test = new Uint8Array([httpEvent.body.file.data]);
              //   const blob = new Blob([test], {type: 'image/jpeg'});
              //   const url = window.URL.createObjectURL(blob);
              //   this.imageBlob = url;
              //   // const pwa = window.open(url);
              //   // if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
              //   //   alert('Please disable your Pop-up blocker and try again.');
              //   // }
            }
          },
          (error) => {
            this.error = error.error;
            this.loading = false;
          },
          () => {
            this.uploadSub = null;
          }
        );
    }
  }

}
