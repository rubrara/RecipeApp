import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DropdownDirective],
  imports: [ReactiveFormsModule, HttpClientModule],
  exports: [CommonModule, DropdownDirective, HttpClientModule],
})
export class SharedModule {}
