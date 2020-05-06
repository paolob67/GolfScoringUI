import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ScoreListPage } from './score-list';
import { ScoreListPageRoutingModule } from './score-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ScoreListPageRoutingModule
  ],
  declarations: [ScoreListPage],
})
export class ScoreListModule {}
