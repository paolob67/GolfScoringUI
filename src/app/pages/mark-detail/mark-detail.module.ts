import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkDetailPage } from './mark-detail';
import { MarkDetailPageRoutingModule } from './mark-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MarkDetailPageRoutingModule
  ],
  declarations: [
    MarkDetailPage,
  ]
})
export class MarkDetailModule { }
