import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {PaginationService} from '../../../services/pagination.service';
import {Subscription} from 'rxjs';

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
  private subscriptions: Subscription[] = [];
  private lastPageIndex: number;
  private firstPaginationSub: Subscription;
  private lastResponseUrls;

  users = [];

  constructor(
    private paginationService: PaginationService,
  ) {
  }

  public ngOnInit(): void {
    this.firstPaginationSub = this.paginationService.testPagination('/users?limit=8')
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
      this.paginationService.testPagination(link)
        .subscribe((res: any) => {
          this.users = [...res.items];
          this.lastResponseUrls = res.links;
          this.lastPageIndex = event.pageIndex;
        })
    );
  }

}
