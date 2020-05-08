import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree/tree.component';



@NgModule({
  declarations: [TreeComponent],
  imports: [
    CommonModule
  ],
  exports: [TreeComponent]
})
export class SharedModule {
  // static forRoot(provider: Provider): ModuleWithProviders {
  //   return {
  //     providers: [provider],
  //     ngModule: SharedModule
  //   };
  // }
}
