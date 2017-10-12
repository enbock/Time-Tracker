<div class="page-wrapper mdc-typography">
    <div class="content">
        <header class="mdc-toolbar mdc-elevation--z4">
            <div class="mdc-toolbar__row">
                <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
                    <a
                            class="material-icons mdc-toolbar__icon--menu"
                            onClick={this.onMenuButtonClick.bind(this)}
                    >menu</a>
                    <span class="mdc-toolbar__title catalog-title">Time Tracker</span>
                </section>
            </div>
        </header>
        <this.components.MainMenu
                class="mdc-temporary-drawer"
                open={this.state.menuOpen}
                onClose={this.onMenuClose.bind(this)}
                page={this.state.history.page}
                onMenu={this.onMenuClick.bind(this)}
        />

        <main>
            <br />
            <div style={{textAlign:"right"}}>
            Page: {this.state.history.page}<br />
            Component: {this.state.currentComponent}
            </div>
        </main>
    </div>
</div>
