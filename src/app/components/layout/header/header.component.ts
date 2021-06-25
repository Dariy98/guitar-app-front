import {Component, Input, OnInit} from '@angular/core';
import {ModalForAddComponent} from '../../modal-for-add/modal-for-add/modal-for-add.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) {
  }

  @Input('isRegisterPage') isRegisterPage = false;
  @Input('isLoginPage') isLoginPage = false;

  ngOnInit(): void {
  }

  public openDialog() {
    const dialogRef = this.dialog.open(ModalForAddComponent, {disableClose: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
