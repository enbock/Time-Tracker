import React from 'react';

export default class Model {
  module: typeof React.Component | null;

  constructor() {
    this.module = null;
  }
}