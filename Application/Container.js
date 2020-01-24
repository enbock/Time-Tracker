import ModelFactory from "./Model/ModelFactory.js";
class Container {
    constructor() {
        this.container = {
            ModelFactory: new ModelFactory()
        };
    }
    get ModelFactory() {
        return this.container.ModelFactory;
    }
}
export default new Container();
