<MDC.Drawer class="mdc-temporary-drawer" open={this.state.open} onClose={this.closeMenu.bind(this)}>
    <aside class="mdc-temporary-drawer">
        <Style src="/css/Menu/Main.css"/>
        <nav class="mdc-temporary-drawer__drawer">
            <div class="mdc-temporary-drawer__toolbar-spacer"></div>
            <div class="mdc-list-group">
                <nav class="mdc-list">
                    <a
                            ref="settingsMenu"
                            class={(this.props.page == 'settings' ? "mdc-temporary-drawer--selected mdc-list--theme-dark" : "") + " mdc-list-item"}
                    >
                        <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">settings applications</i> Anwendungseinstellungen
                    </a>
                </nav>
            </div>
        </nav>
    </aside>
</MDC.Drawer>
