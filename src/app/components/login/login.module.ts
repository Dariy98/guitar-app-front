import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {LoginPageComponent} from './login-page/login-page.component';
import {HeaderModule} from '../layout/header/header.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {FooterModule} from '../layout/footer/footer.module';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    HeaderModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    TranslateModule,
    FooterModule,
  ]
})
export class LoginModule {
}
