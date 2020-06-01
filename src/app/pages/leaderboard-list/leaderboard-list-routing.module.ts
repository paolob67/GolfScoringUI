/**
 * @author Paolo Bianchini
 * @author Lorenzo Monaco
 */

/**
 * Imports
 */
import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  LeaderboardListPage
} from './leaderboard-list';
const routes: Routes = [
  {
    path: '',
    component: LeaderboardListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderboardListPageRoutingModule {}
