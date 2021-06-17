import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page/home-page.component';
import {HeaderModule} from '../layout/header/header.module';
import {FooterModule} from '../layout/footer/footer.module';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
  ]
})
export class HomeModule {
}
