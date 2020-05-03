import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarkDetailPage } from './mark-detail';

const routes: Routes = [
  {
    path: '',
    component: MarkDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarkDetailPageRoutingModule { }
