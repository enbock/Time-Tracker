export default class ModuleLoader {
    constructor(pathToRoot, moduleState) {
        this.moduleState = moduleState;
        this.dictionary = {};
        this.pathToRoot = pathToRoot;
    }
    async loadModule(modulePath) {
        let module;
        if (!this.dictionary.hasOwnProperty(modulePath)) {
            const filePath = (this.pathToRoot + modulePath + '.js').replace('.././', '../');
            module = (await import(filePath)).default;
            this.dictionary[modulePath] = module;
        }
        else {
            module = this.dictionary[modulePath];
        }
        this.moduleState.value = module;
    }
}
