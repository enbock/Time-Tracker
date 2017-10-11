# [MDC]-React Shared library
This library decouple the [MDC] active components from the project.

Target is not to rebuild the whole [MDC] system. The idea is to have only the
`MDC*`-Class-Usage collected in this library. The HTML(JSX) tag should
completely placed in the project domain.

*Notice:* This library will extend with the usage of MDC elements in this project.

# Usages
## Drawer
Connects the drawer component.
```
import {Drawer} from './MDC';

... snipp ...

<div className="mdc-temporary-drawer">
    <Drawer className="mdc-temporary-drawer" open={} onOpen={} onClose={}>
        <!-- content of drawer -->
    </Drawer>
</div>
```
For class names and other details see [@material/drawer].


[MDC]: https://material.io/components/
[@material/drawer]: https://material.io/components/web/catalog/drawers/
