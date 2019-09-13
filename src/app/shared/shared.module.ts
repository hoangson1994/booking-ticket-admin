import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslatePipe } from './pipes/translate.pipe';
import { CustomImageUploadComponent } from './components/custom-image-upload/custom-image-upload.component';
import { RegionSelectorComponent } from './selector/region-selector/region-selector.component';
import { VehicleCategorySelectorComponent } from './selector/vehicle-category-selector/vehicle-category-selector.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [
    TranslatePipe,
    CustomImageUploadComponent,
    RegionSelectorComponent,
    VehicleCategorySelectorComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BrowserModule,
    BrowserAnimationsModule,
    TranslatePipe,
    CustomImageUploadComponent,
    RegionSelectorComponent,
    VehicleCategorySelectorComponent,
  ]
})
export class SharedModule { }
