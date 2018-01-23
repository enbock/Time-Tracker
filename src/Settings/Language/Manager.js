import React from 'react';
import PropTypes from 'prop-types';
import emptyFunction from 'fbjs/lib/emptyFunction';
import Translator from './Translator';

/**
 * Language manager.
 *
 * Handles set setup domains and switch setting centrally.
 */
class Manager extends React.Component {
  /**
   * Constructor.
   *
   * @param {Object} props
   * @param {Object} context
   * @param {Object} updater
   */
  constructor(props, context, updater) {
    super(props, context, updater);

    this.domainList = {};
  }

  /**
   * Define properties.
   *
   * @returns {Object}
   */
  static get propTypes() {
    return {
      language:  PropTypes.string.isRequired,
      languages: PropTypes.array.isRequired
    };
  }

  /**
   * Default adapter to interact with outer world.
   *
   * @returns {Object}
   */
  static get defaultAdapter() {
    return {
      getDomain: emptyFunction,
      onChange:  emptyFunction
    };
  }

  /**
   * Update handler.
   * @param {Object} nextProps
   */
  componentWillUpdate(nextProps) {
    if (this.props.language !== nextProps.language) {
      updateDomains(nextProps.language);
    }
  }

  /**
   * Create translator.
   *
   * @param {Object} adapter Interaction adapter.
   *
   * @return {Translator}
   */
  setup(adapter) {
    const domain = adapter.getDomain();

    if (!this.domainList.hasOwnProperty(domain)) {
      this.domainList[domain] = new Translator(adapter);
      this.domainList[domain].onChange(this.props.language);
    }

    return this.domainList[domain];
  }

  /**
   * Update translators.
   *
   * @param language
   */
  updateDomains(language) {
    for (let domain in this.domainList) {
      this.domainList[domain].onChange(language);
    }
  }

  /**
   * No output of this component.
   *
   * @returns {null}
   */
  render() {
    return null;
  }
}

export default Manager;
