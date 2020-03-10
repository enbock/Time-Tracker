export default class ActiveTranslatorAdapter {
    constructor(baseAdapter, manager, activeTranslator) {
        this.activeTranslator = activeTranslator;
        this.baseAdapter = baseAdapter;
        this.manager = manager;
    }
    onChange(oldValue, newValue) {
        this.manager.getTranslator(newValue).then((translator) => {
            this.activeTranslator.value = translator;
            this.baseAdapter.onChange(oldValue, newValue);
        });
    }
}
