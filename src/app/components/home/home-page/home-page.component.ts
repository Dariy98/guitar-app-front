import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {PaginationService} from '../../../services/pagination.service';
import {Subscription} from 'rxjs';
import {FilesService} from '../../../services/files.service';
import {finalize} from 'rxjs/operators';
import {HttpEventType} from '@angular/common/http';
import {Level} from "../../../interfases/interfaces";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  public genres = [
    {value: 'polyphony', viewValue: 'home.options.polyphony'},
    {value: 'etude', viewValue: 'home.options.etude'},
    {value: 'play', viewValue: 'home.options.play'},
    {value: 'praxis', viewValue: 'home.options.praxis'},
  ];
  public classes = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
  ];
  public levels = [
    {value: 1, viewValue: 'home.options.bad'},
    {value: 2, viewValue: 'home.options.average'},
    {value: 3, viewValue: 'home.options.good'},
  ];
  public selectedGenre: string;
  public selectedClass: string;
  public selectedLevel: string;
  public usersDataLength: number;
  public fileName = '';
  public uploadProgress: number;
  users = []; // TODO other data
  private subscriptions: Subscription[] = [];
  private lastPageIndex: number;
  private firstPaginationSub: Subscription;
  private uploadSub: Subscription;
  private lastResponseUrls;
  private files;

  constructor(
    private paginationService: PaginationService,
    private filesService: FilesService,
  ) {
  }

  public ngOnInit(): void {
    this.firstPaginationSub = this.paginationService.getPaginationData('/users?limit=8')
      .subscribe((res: any) => {
        this.users = res.items;
        this.usersDataLength = res.meta.totalItems;
        this.lastResponseUrls = res.links;
        this.lastPageIndex = 0;
        this.firstPaginationSub.unsubscribe();
      });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public selectGenre(event) {
    this.selectedGenre = event.value;
  }

  public selectClass(event) {
    this.selectedClass = event.value;
  }

  public selectLevel(event) {
    this.selectedLevel = event.value;
  }

  public handlePageEvent(event: PageEvent) {
    let link;

    if (this.lastPageIndex < event.pageIndex) {
      link = this.lastResponseUrls.next;
    } else {
      link = this.lastResponseUrls.previous;
    }

    this.subscriptions.push(
      this.paginationService.getPaginationData(link)
        .subscribe((res: any) => {
          this.users = [...res.items];
          this.lastResponseUrls = res.links;
          this.lastPageIndex = event.pageIndex;
        })
    );
  }

  public onFileSelected(event) {
    this.files = event.target.files;
    console.log('this.files', this.files);

    if (this.files) {
      for (const key in this.files) {
        if (this.files.hasOwnProperty(key)) {
          this.fileName = this.fileName + this.files[key].name + '; ';
        }
      }
    }
  }

  public sendFiles() {
    if (this.files) {
      const formData = new FormData();
      for (const key in this.files) {
        if (this.files.hasOwnProperty(key)) {
          formData.append('file', this.files[key]);
        }
      }

      // TODO title and other
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

  public cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  public reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

}
