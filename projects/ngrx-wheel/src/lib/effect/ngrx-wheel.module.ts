import { NgModule, ModuleWithProviders, Type, Inject, Injector } from '@angular/core';
import { ROOT_EFFECT } from './token';


@NgModule()
export class NgrxWheelEffectModule {
  static forRoot(rootEffects: Type<any>[] = []): ModuleWithProviders<NgrxWheelEffectModule> {
    return {
      ngModule: NgrxWheelEffectModule,
      providers: [
        rootEffects,
        { provide: ROOT_EFFECT, useFactory: createEffect, deps: [Injector, rootEffects] }
      ]
    }
  }
}


/**
 * 收集所有的Effect实例
 * @param injector
 * @param effectGroups
 * @returns
 */
function createEffect(injector: Injector, effectGroups: Type<any>[]) {
  // const mergedEffects: Type<any>[] = [];
  // for (const effectGroup of effectGroups) {
  //   mergedEffects.push(...effectGroup);
  // }

  return effectGroups.map(effect => injector.get(effect))
}
