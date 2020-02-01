import TopAppBarModel from '../TopAppBar/TopAppBarModel';

export default class ApplicationModel {
  text: string;
  topAppBar: TopAppBarModel;

  constructor() {
    this.topAppBar = new TopAppBarModel();
    this.text = '';
  }
}