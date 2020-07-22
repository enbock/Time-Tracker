import React from 'react';

interface Properties {
  view: any
}

interface State {

}

export default class Settings extends React.Component<Properties, State> {
  render(): React.ReactElement {
    const view: any = this.props.view;

    return <div className="mdc-select">
      <div className="mdc-select__anchor demo-width-class">
        <i className="mdc-select__dropdown-icon" />
        <div className="mdc-select__selected-text">{view}</div>
        <span className="mdc-floating-label">Pick a Food Group</span>
        <div className="mdc-line-ripple" />
      </div>

      <div className="mdc-select__menu mdc-menu mdc-menu-surface demo-width-class">
        <ul className="mdc-list">
          <li className="mdc-list-item mdc-list-item--selected" data-value="" aria-selected="true" />
          <li className="mdc-list-item" data-value="grains">
            Bread, Cereal, Rice, and Pasta
          </li>
          <li className="mdc-list-item" data-value="vegetables">
            Vegetables
          </li>
          <li className="mdc-list-item" data-value="fruit">
            Fruit
          </li>
        </ul>
      </div>
    </div>;
  }
}
