import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectiveExampleComponent } from './directive-example.component';

const routes: Routes = [{ path: '', component: DirectiveExampleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectiveExampleRoutingModule { }
