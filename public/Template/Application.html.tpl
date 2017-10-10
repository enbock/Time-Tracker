<div class="page-wrapper mdc-typography">
    <this.components.MainMenu open={this.state.menuOpen}/>
    <div class="content">
        <header class="mdc-toolbar mdc-elevation--z4">
            <div class="mdc-toolbar__row">
                <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
                    <a onClick={this.onMenuButtonClick.bind(this)} class="demo-menu material-icons mdc-toolbar__icon--menu">menu</a>
                    <span class="mdc-toolbar__title catalog-title">Time Tracker</span>
                </section>
            </div>
        </header>

        <main class="demo-main">
            <h1 class="mdc-typography--display1">Hello World!</h1>
        </main>
    </div>

</div>
