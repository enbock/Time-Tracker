import View from './View';

export default class Presenter {
  /**
   * @param {Translator} translator
   */
  constructor(translator) {
    this.translator = translator;
  }

  /**
   * @return View
   */
  present() {
    const view = new View();

    view.labels = {
      title: this.translator.translate('title')
    };

    return view;
  }
}
