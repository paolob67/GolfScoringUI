import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  PlayerDetailPage
} from './player-detail';
const routes: Routes = [
  {
    path: '',
    component: PlayerDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerDetailPageRoutingModule {}
