import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'demo01', loadChildren: () => import('./pages/demo01/demo01.module').then(m => m.Demo01Module) },
  { path: 'demo02', loadChildren: () => import('./pages/demo02/demo02.module').then(m => m.Demo02Module) },
  { path: 'demo03', loadChildren: () => import('./pages/demo03/demo03.module').then(m => m.Demo03Module) },
  { path: 'demo04', loadChildren: () => import('./pages/demo04/demo04.module').then(m => m.Demo04Module) },
  {
    path: 'demo05',
    loadChildren: () => import('./pages/demo05/demo05.module').then(m => m.Demo05Module),

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
