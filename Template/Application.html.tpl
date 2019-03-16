<div class="page-wrapper mdc-typography">
    <Style src="/Style/Application.css" />
    <div class="content">
        <header class="mdc-toolbar mdc-elevation--z4">
            <div class="mdc-toolbar__row">
                <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
                    <a
                            class="material-icons mdc-toolbar__menu-icon"
                            onClick={this.onMainButtonClick.bind(this)}
                    >menu</a>
                    <span class="mdc-toolbar__title catalog-title">{this.view.labels.title}</span>
                </section>
            </div>
        </header>

        {this.props.mainMenu}

        <main>
            {this.state.currentComponent}
            <br />
            <pre style={{textAlign:"right"}}>
                Root: {this.state.history.root}<br />
                Page: {this.state.history.page}<br />
                Path: {this.state.pathname}<br />
                TTI: {window.performance.timing.domInteractive - window.performance.timing.requestStart}ms
            </pre>
        </main>
    </div>
</div>
