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


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'leaderboard-list',
        children: [
          {
            path: '',
            loadChildren: () => import('../leaderboard-list/leaderboard-list.module').then(m => m.LeaderboardListModule)
          },
          {
            path: 'leaderboard-mob/:eventId',
            loadChildren: () => import('../leaderboard-mob/leaderboard-mob.module').then(m => m.LeaderboardMobModule)
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
        redirectTo: '/app/tabs/leaderboard-list',
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
