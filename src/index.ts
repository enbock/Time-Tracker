import Container from './Application/Container';

Container.application.attachToContainerNode(document.getElementById('root'));
Container.applicationAction.loadPageConfig();
Container.application.run();
