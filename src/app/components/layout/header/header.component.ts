import {Component, Input, OnInit} from '@angular/core';
import {ModalForAddComponent} from '../../modal-for-add/modal-for-add/modal-for-add.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) {
  }

  // tslint:disable
  @Input('isRegisterPage') isRegisterPage = false;
  @Input('isLoginPage') isLoginPage = false;

  // tslint:enable

  ngOnInit(): void {
  }

  public onLogout() {
    // TODO add agree modal
    localStorage.removeItem('token');
    this.router.navigate(['/login']).catch(err => console.error({err}));
  }

  public openDialog() {
    const dialogRef = this.dialog.open(ModalForAddComponent, {
      disableClose: true,
      minWidth: 890,
      minHeight: 680,
    });
  }

}
