import {MDCSelect} from '@material/select';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * MDC Select implementation.
 */
class Select extends React.Component {

  /**
   * Supported property types.
   */
  static get propTypes() {
    return {
      onChange: PropTypes.func.isRequired,
      id: PropTypes.string.isRequired
    };
  }

  /**
   * Apply change information.
   */
  onChange() {
    let selectedOptions = [], index;

    // Convert options to array
    const options = this.select.selectedOptions;
    for (index = 0; index < options.length; index++) {
      selectedOptions[index] = options[index].id;
    }

    const event = {
      name: this.props.id,
      selectedOptions: selectedOptions,
      selectedIndex: this.select.selectedIndex,
      value: this.select.value
    };
    this.props.onChange(event);
  }

  /**
   * Connect MDC after mount.
   */
  componentDidMount() {
    this.domNode = ReactDOM.findDOMNode(this);
    this.boundChange = this.onChange.bind(this);
    this.select = new MDCSelect(this.domNode);
    this.select.listen('MDCSelect:change', this.boundChange);
  }

  /**
   * Disconnect from MDC.
   */
  componentWillUnmount() {
    this.select.unlisten('MDCSelect:change', this.boundChange);
    this.select.destroy();
    this.select = undefined;
  }

  /**
   * Generate the output.
   */
  render() {
    // No special adding into dom tree, passing children as own level.
    return this.props.children;
  }
}

export default Select;
