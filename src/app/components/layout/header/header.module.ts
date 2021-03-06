import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [HeaderComponent],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        TranslateModule,
    ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
