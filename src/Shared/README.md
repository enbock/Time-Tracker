# Shared domain
... contains code, which are needed but isn't real part of the project.

May later will moved some part of the shared domain to extra library
projects.

## Router
The router is and adapter between  [History API] and [React].

It hat 3 properties, which are needed to work:
* `onChange` - Function
* `pathname` - String
* `state` - Object

The handler function in `onChange` will be called, when the [History API]
massages a change. That is e.g. happened when the user clicks arrows of the 
browser history.

Over the `pathname` controls the application, which page is in address line
presented. A change of `pathname` leads into a new entry on the browser
history. When the `pathname` is changed, will the `state` also given to the
history API. That state will received on the `onChange` call.     
*Notice:* `pathname` and `state` should always changed together.

### Example
```typescript jsx
class MyComponent extends React.Coomponent {
    constructor(props, context, updater) {
        super(props, context, updater);
        this.state = {
            route: '/',
            routeState: {}
        }
    }
    
    componentWillMount() {
        setTimeout(
            () => {
                this.setState(
                    {
                        route: '/test/',
                        routeState: {foo: 'bar'}
                    }
                );
            },
            10000
        );
    }
        
    onRouterChange(event) {
        console.log("Route change to", event.pathname, "with state", event.state);
    }
    
    render()
    {
        return <Router 
            onChange={this.onRouterChange.bind(this)} 
            pathname={this.state.route} 
            state={this.state.routeState}  
        />;
    }
}
```

##




[History API]: https://developer.mozilla.org/en-US/docs/Web/API/History_API
[React]: https://reactjs.org/
