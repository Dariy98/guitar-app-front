import {Component, OnInit} from '@angular/core';
import {classes, genres, levels} from 'src/app/interfases/constants';
import {Subscription} from 'rxjs';
import {Level} from '../../../interfases/interfaces';
import {finalize} from 'rxjs/operators';
import {HttpEventType} from '@angular/common/http';
import {FilesService} from '../../../services/files.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal-for-add',
  templateUrl: './modal-for-add.component.html',
  styleUrls: ['./modal-for-add.component.css']
})
export class ModalForAddComponent implements OnInit {

  public title = new FormControl('', [Validators.required]);
  public selectedGenre: string;
  public selectedClass: string;
  public selectedLevel: string;
  public uploadProgress: number;
  public fileName = '';
  public genres = genres;
  public classes = classes;
  public levels = levels;
  public loading: boolean;
  private files;
  private description: string;
  private uploadSub: Subscription;

  constructor(
    private filesService: FilesService,
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
    this.selectedGenre = event.value;
  }

  public selectLevel(event) {
    this.selectedLevel = event.value;
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

  public cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  private reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

  private sendFiles() {
    if (this.files) {
      const formData = new FormData();
      for (const key in this.files) {
        if (this.files.hasOwnProperty(key)) {
          formData.append('file', this.files[key]);
        }
      }

      formData.append('title', 'my test title');
      formData.append('description', 'desc');
      formData.append('genre', 'etude');
      formData.append('class', '2');
      formData.append('level', Level.Average);

      this.uploadSub = this.filesService.sendFile(formData)
        .pipe(
          finalize(() => this.reset())
        )
        .subscribe((httpEvent: any) => {
          console.log('httpEvent', httpEvent);

          if (httpEvent.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (httpEvent.loaded / httpEvent.total));
          }
          // if (httpEvent.type === HttpEventType.Response) {
          //   const test = new Uint8Array([httpEvent.body.file.data]);
          //   const blob = new Blob([test], {type: 'image/jpeg'});
          //   const url = window.URL.createObjectURL(blob);
          //   this.imageBlob = url;
          //   // const pwa = window.open(url);
          //   // if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
          //   //   alert('Please disable your Pop-up blocker and try again.');
          //   // }
          // }
        });
    }
  }

  public sendData() {
    console.log('title: ', this.title.value);
    console.log('description: ', this.description);
    console.log('selectedGenre: ', this.selectedGenre);
    console.log('selectedLevel: ', this.selectedLevel);
    console.log('selectedClass: ', this.selectedClass);
  }

}
