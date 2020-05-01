import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreDetailPage } from './score-detail';
import { ScoreDetailPageRoutingModule } from './score-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ScoreDetailPageRoutingModule
  ],
  declarations: [
    ScoreDetailPage,
  ]
})
export class ScoreDetailModule { }
