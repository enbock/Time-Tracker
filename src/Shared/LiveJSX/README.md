# Live time JSX Loader
This base class is a loader of HTML templates in runtime.

## Installation
To able to convert must be loaded the [Babel for Browser]:
```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```
So, `global.Babel` is now available. You can also load via `fetch` and
add it into the `LiveJsx/Api/Babel`(see [Initialization](#initialization)).

The JSX loader setup React into `global.React`.     
So be sure that no other part of the project is using the the that both
global keys. 

## Initialization
We have 2 elements, which need to be created first. The Ajax loader and
the Babel converter:
```javascript
const converter = new Babel({presets: ['react']});
const loader = new Ajax(process.env.PUBLIC_URL || '', converter);
```
At least we need to make the Babel library available for the converter:
```javascript
converter.Babel = global.Babel;
```
If you have loaded the babel library via `fetch` then just apply the
loader function on the `converter`:
```typescript jsx
const converter = new Babel({presets: ['react']});
fetch(process.env.PUBLIC_URL + '/lib/babel.min.js')
  .then(response => response.text())
  .then(
    data => {
      // eslint-disable-next-line
      const babel = new Function(data);
      babel.apply(converter);

      startApplication();
    }
  )
;
```

## Usage
### via inheritance
Usage of the LiveJSX loader as base class of the component:
```typescript jsx
import Component from 'LiveJSX';

class MyComponent extends Component {
    static get template() {
        return '..../path/to/template.html.tpl';
    }
    
    onTemplateMounted() {
        console.log("JSX Loaded");
    }
}
```
And use it like:
```typescript jsx
class MyView extends React.Component {
    render() {
        return <MyComponent templateLoader={this.props.templateLoader} />;
    }
}
````

#### Template path via props
You can set the template also via props:
```typescript jsx
import Component from 'LiveJSX';

class MyComponent extends Component {
    onTemplateMounted(domNode) {
        console.log("JSX Loaded");
    }
}
```
And use it like:
```typescript jsx
class MyView extends React.Component {
    render() {
        return <MyComponent 
            template="..../path/to/template.html.tpl"
            templateLoader={this.props.templateLoader}
        />;
    }
}
````

### direct via JSX
```typescript jsx
import React from 'react';
import LiveJSX from 'LiveJSX';

class MyComponent extends React.Component {
    render() {
        return (
            <LiveJSX 
                template="..../path/to/template.html.tpl"
                templateLoader={this.props.templateLoader}
            />
        );
    }
}
```

[Babel for Browser]: https://github.com/babel/babel-standalone#usage
