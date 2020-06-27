import Container from "../Router/Container.js";
import RouterData from "./RouterData.js";
export function migrateAll() {
    (new RouterData(Container.observer)).migrateRouterInternalToV102();
}
