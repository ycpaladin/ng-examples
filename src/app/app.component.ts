import { Component } from '@angular/core';
import { GlobalEventDispatcher, Planet, SwitchModes } from 'micro-front';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;

  title = 'ngx-planet';

  activeAppNames: string[] = [];

  get loadingDone() {
    return this.planet.loadingDone;
  }

  constructor(
    // private customSettingsService: CustomSettingsService,
    private planet: Planet,
    private globalEventDispatcher: GlobalEventDispatcher,
    // private thyDialog: ThyDialog,
    // private thyNotify: ThyNotifyService,
    // public appRootContext: AppRootContext
  ) { }

  ngOnInit() {
    this.planet.setOptions({
      switchMode: SwitchModes.coexist,
      errorHandler: error => {
        //   this.thyNotify.error(`错误`, '加载资源失败');
        console.error(error);
      },
      //   debugFactory: debug
    });

    //   this.appRootContext.setName(`my name is app root context`);

    //   this.planet.setPortalAppData({
    //       appRootContext: this.appRootContext
    //   });

    const appHostClass = 'thy-layout';

    //   const settings = this.customSettingsService.get();
    this.planet.registerApps([
      {
        name: 'app1',
        hostParent: '#app-host-container',
        hostClass: appHostClass,
        routerPathPrefix: /\/app1|app4/, // '/app1',
        resourcePathPrefix: '/static/app1/',
        //   preload: settings.app1.preload,
        //   switchMode: settings.app1.switchMode,
        loadSerial: true,
        stylePrefix: 'app1',
        // prettier-ignore
        scripts: [
          'main.js',
          // 'polyfills.js'
        ],
        styles: ['styles.css'],
        manifest: '/static/app1/assets-manifest.json',
        extra: {
          name: '应用1',
          color: '#ffa415'
        }
      },
      {
        name: 'app2',
        hostParent: '#app-host-container',
        hostClass: appHostClass,
        routerPathPrefix: '/app2',
        resourcePathPrefix: '/static/app2/',
        //   preload: settings.app2.preload,
        //   switchMode: settings.app2.switchMode,
        // sandbox: true,
        loadSerial: true, // 不加这个会出错误
        stylePrefix: 'app2',
        // prettier-ignore
        scripts: [
          'main.js'
        ],
        styles: ['styles.css'],
        manifest: '/static/app2/assets-manifest.json',
        extra: {
          name: '应用2',
          color: '#66c060'
        }
      },
      {
        name: 'app3',
        hostParent: '#app-host-container',
        hostClass: appHostClass,
        routerPathPrefix: '/app3',
        resourcePathPrefix: '', // /static/app3/  # React 的manifest 对应的值不能有前缀
        //   preload: settings.app2.preload,
        //   switchMode: settings.app2.switchMode,
        // sandbox: true,
        loadSerial: true, // 不加这个会出错误
        stylePrefix: 'app3',
        // prettier-ignore
        scripts: [
          'main.js'
        ],
        styles: ['styles.css'],
        manifest: '/static/app3/assets-manifest.json',
        extra: {
          name: '应用3',
          color: '#66c060'
        }
      },
      {
        name: 'app4',
        hostParent: '#app-host-container',
        hostClass: appHostClass,
        routerPathPrefix: '/app4',
        resourcePathPrefix: '', // /static/app3/  # React 的manifest 对应的值不能有前缀
        //   preload: settings.app2.preload,
        //   switchMode: settings.app2.switchMode,
        // sandbox: true,
        loadSerial: true, // 不加这个会出错误
        stylePrefix: 'app4',
        // prettier-ignore
        scripts: [
          'src/main.js'
        ],
        styles: ['styles.css'],
        manifest: '/static/app4/manifest.json',
        extra: {
          name: '应用3',
          color: '#66c060'
        }
      },
      {
        name: 'app5',
        hostParent: '#app-host-container',
        hostClass: appHostClass,
        routerPathPrefix: '/app5',
        resourcePathPrefix: '/static/app5/', // /static/app3/  # React 的manifest 对应的值不能有前缀
        //   preload: settings.app2.preload,
        //   switchMode: settings.app2.switchMode,
        // sandbox: true,
        loadSerial: true, // 不加这个会出错误
        stylePrefix: 'app5',
        scripts: [
          'app.js',
          'chunk-vendors.js'
        ],
        styles: ['app.css'],
        manifest: '/static/app5/assets-manifest.json',
        extra: {
          name: '应用5',
          color: '#66c060'
        }
      },
      {
        name: 'app6',
        hostParent: '#app-host-container',
        hostClass: appHostClass,
        routerPathPrefix: '/app6',
        resourcePathPrefix: '/static/app6/', // /static/app3/  # React 的manifest 对应的值不能有前缀
        //   preload: settings.app2.preload,
        //   switchMode: settings.app2.switchMode,
        // sandbox: true,
        loadSerial: true, // 不加这个会出错误
        stylePrefix: 'app6',
        scripts: [
          'app.js',
          'chunk-vendors.js'
        ],
        styles: ['app.css'],
        manifest: '/static/app6/assets-manifest.json',
        extra: {
          name: '应用5',
          color: '#66c060'
        }
      }
    ]);

    this.planet.start();

    // this.globalEventDispatcher.register('openADetail').subscribe(event => {
    //     this.thyDialog.open(ADetailComponent);
    // });

    // this.planet.appsLoadingStart.subscribe(event => {
    //     this.activeAppNames = event.shouldLoadApps.map(item => item.name);
    //     console.log(`active app names: ${this.activeAppNames.join(',')}`);
    // });
  }
}
