import React from 'react';
import ReactDOM from 'react-dom';

/**
 * List of all registered elements.
 *
 * @type {Array}
 */
const documentRegisteredMDLElements = [];

/**
 * MDL Element.
 * This element handles the interaction with the MDL component handler to refresh the document ofter dynamic changes.
 *
 */
class MDLElement extends React.Component {

  /**
   * Add dom node to list and update MDL.
   */
  componentDidMount() {

    documentRegisteredMDLElements.forEach(
      function downGradeElement(node) {
        global.componentHandler.downgradeElements(node);
      }
    );

    this.domNode = ReactDOM.findDOMNode(this);
    documentRegisteredMDLElements.push(this.domNode);
    //global.componentHandler.upgradeElement(domNode, 'MaterialLayout');

    /**
     * @dev Seems, that whole objects (ie. Layout plus menu) need to updates at once. So we downgrade first all elements
     *      and upgrading the whole dom again. Let#s hope that we not produce visual lags here.
     */
    global.componentHandler.upgradeDom();
  }

  /**
   * Remove domNode from list and downgrade the element.
   */
  componentWillUnmount() {
    const index = documentRegisteredMDLElements.indexOf(this.domNode);
    global.componentHandler.downgradeElements(this.domNode);
    documentRegisteredMDLElements.splice(index, 1);
  }

  render() {
    return <div {...this.props} />;
  }
}

export default MDLElement;
