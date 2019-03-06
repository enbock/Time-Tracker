# Live time JSX Loader
This base class is a loader of HTML templates in runtime.

## Installation
To able to convert must be loaded the [Babel for Browser]:
```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```
So, `global.Babel` is now available.

The JSX loader setup React into `global.React`.     
So be sure that no other part of the project is using the the that both
global keys. 

## Usage
### via inheritance
Usage of the LiveJSX loader an base class of the component is preferred.
```typescript jsx
import Component from 'LiveJSX';

class MyComponent extends Component {
    static get template() {
        return '..../path/to/template.html.tpl';
    }
    
    onTemplateMounted(domNode) {
        console.log("JSX Loaded in", domNode);
    }
}
```

### via JSX
```typescript jsx
import React from 'react';
import LiveJSX from 'LiveJSX';

class MyComponent extends Rect.Component {
    render() {
        return (
            <LiveJSX template="..../path/to/template.html.tpl" />
        );
    }
}
```

[Babel for Browser]: https://github.com/babel/babel-standalone#usage
