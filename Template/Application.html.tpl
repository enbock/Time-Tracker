<div class="page-wrapper mdc-typography">
    <div class="content">
        <header class="mdc-toolbar mdc-elevation--z4">
            <div class="mdc-toolbar__row">
                <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
                    <a
                            class="material-icons mdc-toolbar__icon--menu"
                            onClick={this.onMainButtonClick.bind(this)}
                    >menu</a>
                    <span class="mdc-toolbar__title catalog-title">Time Tracker</span>
                </section>
            </div>
        </header>
        <this.components.MainMenu
                class="mdc-temporary-drawer"
                adapter={this.menuAdapter}
                page={this.state.history.page}
                onMenu={this.onMenuChange.bind(this)}
        />

        <main>
            <br/>
            <pre style={{textAlign:"right"}}>
                Root: {this.state.history.root}<br/>
                Page: {this.state.history.page}<br/>
                Path: {this.state.pathname}<br/>
            </pre>
            {this.state.currentComponent}
        </main>
    </div>
</div>
