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
        />

        <main>
            <h1 class="mdc-typography--display1">Hello World!</h1>
        </main>
    </div>
</div>
