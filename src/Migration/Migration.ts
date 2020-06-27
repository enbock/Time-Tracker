import Container from '../Router/Container';
import RouterData from './RouterData';

export function migrateAll() {
  (new RouterData(Container.observer)).migrateRouterInternalToV102();
}
