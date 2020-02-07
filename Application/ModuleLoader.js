export default class ModuleLoader {
    constructor(pathToRoot, moduleNameState, moduleState) {
        this.moduleNameState = moduleNameState;
        this.moduleState = moduleState;
        this.dictionary = {};
        this.pathToRoot = pathToRoot;
        this.moduleNameState.adapter.onChange = this.loadModule.bind(this);
    }
    async loadModule(oldValue, newValue) {
        let module;
        if (!this.dictionary.hasOwnProperty(newValue)) {
            module =
                (await import(this.pathToRoot + newValue + '.js')).default;
            this.dictionary[newValue] = module;
        }
        else {
            module = this.dictionary[newValue];
        }
        this.moduleState.value = module;
    }
}
