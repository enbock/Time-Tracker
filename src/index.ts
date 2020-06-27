import Container from './Application/Container';
import {migrateAll} from './Migration/Migration';

migrateAll();

Container.application.attachToContainerNode(document.getElementById('root'));
Container.applicationAction.loadPageConfig();
Container.application.run();
