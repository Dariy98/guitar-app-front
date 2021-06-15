import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    TranslateModule,
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule {
}
