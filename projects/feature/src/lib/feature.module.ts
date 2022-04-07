import { NgModule, ModuleWithProviders } from '@angular/core';
import { FeatureConfig } from './interfaces';



@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ]
})
export class FeatureModule {
  forFeature(moduleName: string, config: FeatureConfig): ModuleWithProviders<FeatureModule> {
    return {
      ngModule: FeatureModule,
      providers: [

      ]
    }
  }
}
