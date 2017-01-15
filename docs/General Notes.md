## Component Style

- Functional components have to be defined in es5 style in order for components to be pickedu by the react devtools.
  - this might change at some point in mob-x

```javascript
// Good
const Menu = function Menu(props) {
  // return ...
```

```javascript
// sadly... this is bad, I would prefer to use es6...
const Menu = props => {
  // return ...
}
```

## Stores / Application Data
- Stores are es6 classes built with mobX
- These stores are passed into a `<Provider>` -- a component via `react-mobx`.
- This provider allows any component to `inject` a store as needed.

```javascript
// Here the menu component is made an observer AND passed the store as PROPS.
export default inject('omeStore', 'uiStore')(observer(Menu));

// This can also happen in the function signature:
const Menu = inject('omeStore', 'uiStore')(observer function Menu() {
  // ...
}));
```