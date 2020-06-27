import Container from "./Application/Container.js";
import { migrateAll } from "./Migration/Migration.js";
migrateAll();
Container.application.attachToContainerNode(document.getElementById('root'));
Container.applicationAction.loadPageConfig();
Container.application.run();
