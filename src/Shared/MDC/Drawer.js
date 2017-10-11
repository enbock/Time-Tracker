import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as MDC from '@material/drawer';

/**
 * MDC drawer implementation.
 */
class Drawer extends React.Component {
  /**
   * Supported property types.
   */
  static get propTypes() {
    return {
      className: PropTypes.string.isRequired,
      onOpen:    PropTypes.func,
      onClose:   PropTypes.func,
      open:      PropTypes.bool
    };
  }

  /**
   * Proxy open event, if bound.
   * @param event
   */
  onOpen(event) {
    if (this.props.onOpen) {
      this.props.onOpen(event);
    }
  }

  /**
   * Proxy close event, if bound.
   * @param event
   */
  onClose(event) {
    if (this.props.onClose) {
      this.props.onClose(event);
    }
  }

  /**
   * Connect MDC after mount.
   */
  componentDidMount() {
    this.domNode = ReactDOM.findDOMNode(this);
    switch (this.props.className) {
      case 'mdc-persistent-drawer':
        this.drawer = new MDC.MDCPersistentDrawer(this.domNode);
        this.domNode.addEventListener('MDCPersistentDrawer:open', this.onOpen.bind(this));
        this.domNode.addEventListener('MDCPersistentDrawer:close', this.onClose.bind(this));
        break;
      case 'mdc-temporary-drawer':
        this.drawer = new MDC.MDCTemporaryDrawer(this.domNode);
        this.domNode.addEventListener('MDCTemporaryDrawer:open', this.onOpen.bind(this));
        this.domNode.addEventListener('MDCTemporaryDrawer:close', this.onClose.bind(this));
        break;
      default: break;
    }

    if (this.drawer) {
      this.drawer.open = this.props.open;
    }
  }

  /**
   * Destroy drawer on unmount.
   */
  componentWillUnmount() {
    if (this.drawer) {
      this.drawer.destroy();
    }
  }

  /**
   * Update props on drawer component if exists.
   */
  componentDidUpdate()
  {
    if (this.drawer) {
      this.drawer.open = this.props.open;
    }
  }

  /**
   * Generate the output.
   */
  render() {
    // No special adding into dom tree, passing children as own level.
    return this.props.children;
  }
}

export default Drawer;
