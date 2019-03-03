import * as MDC from '@material/drawer';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

class Drawer extends React.Component {
  static get propTypes() {
    return {
      className: PropTypes.string.isRequired,
      onOpen: PropTypes.func,
      onClose: PropTypes.func,
      open: PropTypes.bool
    };
  }

  /**
   * @param event
   */
  onOpen(event) {
    if (this.props.onOpen) {
      this.props.onOpen(event);
    }
  }

  /**
   * @param event
   */
  onClose(event) {
    if (this.props.onClose) {
      this.props.onClose(event);
    }
  }

  componentDidMount() {
    this.domNode = ReactDOM.findDOMNode(this);
    switch (this.props.className) {
      case 'mdc-drawer--persistent':
        this.drawer = new MDC.MDCPersistentDrawer(this.domNode);
        this.domNode.addEventListener('MDCPersistentDrawer:open', this.onOpen.bind(this));
        this.domNode.addEventListener('MDCPersistentDrawer:close', this.onClose.bind(this));
        break;
      case 'mdc-drawer--temporary':
        this.drawer = new MDC.MDCTemporaryDrawer(this.domNode);
        this.domNode.addEventListener('MDCTemporaryDrawer:open', this.onOpen.bind(this));
        this.domNode.addEventListener('MDCTemporaryDrawer:close', this.onClose.bind(this));
        break;
      default:
        break;
    }

    if (this.drawer) {
      this.drawer.open = this.props.open;
      /**
       * Interaction with MDC could be via adapter...but currently I use the refs-List of React to take the click
       * events of the drawer elements.
       *
       console.log("Adapter", this.drawer.foundation_.adapter_);
       this.drawer.foundation_.adapter_.registerDrawerInteractionHandler('click', (event) => console.log('?!!>> ', event));
       */
    }
  }

  componentWillUnmount() {
    if (this.drawer) {
      this.drawer.destroy();
    }
  }

  componentDidUpdate() {
    if (this.drawer) {
      this.drawer.open = this.props.open;
    }
  }

  render() {
    return this.props.children;
  }
}

export default Drawer;
