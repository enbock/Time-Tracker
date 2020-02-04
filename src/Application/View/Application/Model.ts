import TopBarModel from '../TopBar/Model';

export default class Model {
  text: string;
  topAppBar: TopBarModel;

  constructor() {
    this.topAppBar = new TopBarModel();
    this.text = '';
  }
}