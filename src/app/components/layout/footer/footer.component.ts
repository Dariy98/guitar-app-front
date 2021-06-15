import {Component, OnInit} from '@angular/core';
import {LANGUAGE} from '../../../app.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  public toggleLanguage(lang: string) {
    LANGUAGE.next(lang);
  }

}
