import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  ScoreSignPage
} from './score-sign';

const routes: Routes = [
  {
    path: '',
    component: ScoreSignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreSignPageRoutingModule {}
