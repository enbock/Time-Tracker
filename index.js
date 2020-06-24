import Container from "./Application/Container.js";
Container.application.attachToContainerNode(document.getElementById('root'));
Container.applicationAction.loadPageConfig();
Container.application.run();
