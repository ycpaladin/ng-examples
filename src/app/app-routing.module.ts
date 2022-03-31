import { EmptyComponent } from 'micro-front';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  // { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  // { path: 'demo01', loadChildren: () => import('./pages/demo01/demo01.module').then(m => m.Demo01Module) },
  // { path: 'demo02', loadChildren: () => import('./pages/demo02/demo02.module').then(m => m.Demo02Module) },
  // { path: 'demo03', loadChildren: () => import('./pages/demo03/demo03.module').then(m => m.Demo03Module) },
  // { path: 'demo04', loadChildren: () => import('./pages/demo04/demo04.module').then(m => m.Demo04Module) },
  // {
  //   path: 'demo05',
  //   loadChildren: () => import('./pages/demo05/demo05.module').then(m => m.Demo05Module),

  // },
  // { path: 'demo06', loadChildren: () => import('./pages/demo06/demo06.module').then(m => m.Demo06Module) },
  // { path: 'ngrx-test', loadChildren: () => import('./pages/ngrx-test/ngrx-test.module').then(m => m.NgrxTestModule) },
  // { path: 'data-tree-test', loadChildren: () => import('./pages/data-tree-test/data-tree-test.module').then(m => m.DataTreeTestModule) },
  {
    path: 'app1',
    component: EmptyComponent,
    children: [
      { path: '**', component: EmptyComponent }
    ]
  },
  {
    path: 'app2',
    component: EmptyComponent,
    children: [
      { path: '**', component: EmptyComponent }
    ]
  },
  {
    path: 'app3',
    component: EmptyComponent,
    children: [
      { path: '**', component: EmptyComponent }
    ]
  },
  {
    path: 'app4',
    component: EmptyComponent,
    children: [
      { path: '**', component: EmptyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
