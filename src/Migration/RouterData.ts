import {IPageData} from '@enbock/application-router/Router';
import {IObserver} from '@enbock/state-value-observer/Observer';
import {IModulePageData} from '../Application/Application';

export default class RouterData {
  private routerData: IObserver<IModulePageData | null>;

  constructor(routerData: IObserver<IPageData | null>) {
    this.routerData = routerData as IObserver<IModulePageData | null>;
  }

  migrateRouterInternalToV102(): void {
    const pageData: IPageData | null | any = this.routerData.value;
    if (pageData == null || pageData.rootUrl == undefined) return;

    this.routerData.value = {
      baseUrl: pageData.rootUrl,
      currentUrl: pageData.url,
      name: pageData.name,
      module: pageData.module
    };
  }
}
