import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  LeaderboardMobPage
} from './leaderboard-mob';
const routes: Routes = [
  {
    path: '',
    component: LeaderboardMobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderboardMobPageRoutingModule {}
