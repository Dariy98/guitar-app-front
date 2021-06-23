import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page/home-page.component';
import {HeaderModule} from '../layout/header/header.module';
import {FooterModule} from '../layout/footer/footer.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {TranslateModule} from '@ngx-translate/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    MatSidenavModule,
    MatSelectModule,
    TranslateModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ]
})
export class HomeModule {
}
