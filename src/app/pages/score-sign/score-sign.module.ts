import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';
import {
  IonicModule
} from '@ionic/angular';

import {
  ScoreSignPage
} from './score-sign';
import {
  ScoreSignPageRoutingModule
} from './score-sign-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoreSignPageRoutingModule
  ],
  declarations: [
    ScoreSignPage,
  ]
})
export class ScoreSignModule {}
