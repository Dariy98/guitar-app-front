import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterFormComponent} from './register-form/register-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {HeaderModule} from '../layout/header/header.module';

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule, // TODO ??
    HeaderModule,
  ],
  exports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  providers: []
})
export class RegistrationModule {
}