import {IObserver} from '@enbock/state-value-observer/Observer';
import {IModulePageData} from '../Application/Application';
import RouterData from './RouterData';

describe(RouterData, function (): void {
  it('Migrate nothing without data', function (): void {
    const routerData: { value: null } = {value: null};
    (new RouterData(routerData)).migrateRouterInternalToV102();
    expect(routerData.value).toBeNull();
  });

  it('Migrate from v1.0.1 to v1.0.2', function (): void {
    const routeData: IObserver<IModulePageData | null> | any = {
      value: {
        name: 'name',
        rootUrl: 'rootUrl',
        url: 'url',
        module: 'module'
      }
    };

    (new RouterData(routeData)).migrateRouterInternalToV102();

    expect(routeData.value).toEqual(
      {
        name: 'name',
        baseUrl: 'rootUrl',
        currentUrl: 'url',
        module: 'module'
      }
    );
  });

  it('Do not migrate from v1.0.1 to v1.0.2 with current data', function (): void {
    const currentData: IModulePageData = {
      name: 'name',
      baseUrl: 'rootUrl',
      currentUrl: 'url',
      module: 'module'
    };
    const routeData: IObserver<IModulePageData | null> | any = {value: currentData};

    (new RouterData(routeData)).migrateRouterInternalToV102();

    expect(routeData.value).toBe(currentData);
  });
});
