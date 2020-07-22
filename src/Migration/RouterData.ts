import {PageData} from '@enbock/application-router/Router';
import {Observer} from '@enbock/state-value-observer/ValueObserver';
import {ModulePageData} from '../Application/Application';

export default class RouterData {
  private routerData: Observer<ModulePageData | null>;

  constructor(routerData: Observer<PageData | null>) {
    this.routerData = routerData as Observer<ModulePageData | null>;
  }

  migrateRouterInternalToV102(): void {
    const pageData: PageData | null | any = this.routerData.value;
    if (pageData == null || pageData.rootUrl == undefined) return;

    this.routerData.value = {
      baseUrl: pageData.rootUrl,
      currentUrl: pageData.url,
      name: pageData.name,
      module: pageData.module
    };
  }
}
