import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyComponent } from 'micro-front';

const routes: Routes = [
  {
    path: 'app2',
    children: [
      { path: '', loadChildren: () => import('./pages/page1/page1.module').then(m => m.Page1Module) },
    ]
  },
  { path: '**', component: EmptyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
