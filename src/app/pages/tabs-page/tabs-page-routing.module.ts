import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  TabsPage
} from './tabs-page';
import {
  LeaderboardPage
} from '../leaderboard/leaderboard';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'leaderboard-mob/:eventId/:roundNum',
        children: [
          {
            path: '',
            loadChildren: () => import('../leaderboard-mob/leaderboard-mob.module').then(m => m.LeaderboardMobModule)
          }
        ]
      },
      {
        path: 'leaderboard',
        children: [
          {
            path: '',
            loadChildren: () => import('../leaderboard/leaderboard.module').then(m => m.LeaderboardModule)
          }
        ]
      },
      {
        path: 'scores',
        children: [
          {
            path: '',
            loadChildren: () => import('../score-list/score-list.module').then(m => m.ScoreListModule)
          },
          {
            path: 'event/:eventId/:roundNum',
            loadChildren: () => import('../event/event.module').then(m => m.EventModule)
          },
          {
            path: 'score-details/:scoreId/:eventId/:roundNum/:holeNum/:holeValues',
            loadChildren: () => import('../score-detail/score-detail.module').then(m => m.ScoreDetailModule)
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../map/map.module').then(m => m.MapModule)
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/leaderboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
