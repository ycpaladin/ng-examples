import { TestComponent } from './pages/test/test.component';
import { EmptyComponent } from 'micro-front';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  {
    path: 'app1',
    children: [
      { path: '', loadChildren: () => import('./pages/page1/page1.module').then(m => m.Page1Module) },
      { path: 'test', component: TestComponent }
    ]
  },

  { path: '**', component: EmptyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  providers: [
    // { provide: APP_BASE_HREF, useValue: '/app1' }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
