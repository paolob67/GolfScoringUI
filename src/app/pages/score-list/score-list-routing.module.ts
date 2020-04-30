import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScoreListPage } from './score-list';
const routes: Routes = [
  {
    path: '',
    component: ScoreListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreListPageRoutingModule {}
