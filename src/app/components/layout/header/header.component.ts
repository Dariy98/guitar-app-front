import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  @Input('isRegisterPage') isRegisterPage = false;
  @Input('isLoginPage') isLoginPage = false;

  ngOnInit(): void {
  }

}
