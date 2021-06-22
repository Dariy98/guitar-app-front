import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page/home-page.component';
import {HeaderModule} from '../layout/header/header.module';
import {FooterModule} from '../layout/footer/footer.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {TranslateModule} from '@ngx-translate/core';
import {MatPaginatorModule} from '@angular/material/paginator';


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
  ]
})
export class HomeModule {
}
