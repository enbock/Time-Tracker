import {migrateAll} from './Migration';
import RouterData from './RouterData';

jest.mock('./RouterData');
jest.mock('../Router/Container', () => () => ({observer: 'data'}));

describe(migrateAll, function (): void {
  it('Migrate data', function () {
    const migrateRouterInternalToV102: jest.Mock = jest.fn();
    (RouterData as jest.Mock).mockImplementation(() => ({migrateRouterInternalToV102: migrateRouterInternalToV102}));

    migrateAll();

    expect(migrateRouterInternalToV102).toHaveBeenCalled();
  });
});
