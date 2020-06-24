
export default class Settings extends React.Component {
    render() {
        const view = this.props.view;
        return React.createElement("div", { className: "mdc-select" },
            React.createElement("div", { className: "mdc-select__anchor demo-width-class" },
                React.createElement("i", { className: "mdc-select__dropdown-icon" }),
                React.createElement("div", { className: "mdc-select__selected-text" }, view),
                React.createElement("span", { className: "mdc-floating-label" }, "Pick a Food Group"),
                React.createElement("div", { className: "mdc-line-ripple" })),
            React.createElement("div", { className: "mdc-select__menu mdc-menu mdc-menu-surface demo-width-class" },
                React.createElement("ul", { className: "mdc-list" },
                    React.createElement("li", { className: "mdc-list-item mdc-list-item--selected", "data-value": "", "aria-selected": "true" }),
                    React.createElement("li", { className: "mdc-list-item", "data-value": "grains" }, "Bread, Cereal, Rice, and Pasta"),
                    React.createElement("li", { className: "mdc-list-item", "data-value": "vegetables" }, "Vegetables"),
                    React.createElement("li", { className: "mdc-list-item", "data-value": "fruit" }, "Fruit"))));
    }
}
