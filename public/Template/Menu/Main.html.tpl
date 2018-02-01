<MDC.Drawer class="mdc-drawer--temporary" open={this.state.open} onClose={this.closeMenu.bind(this)}>
    <aside class="mdc-drawer mdc-drawer--temporary mdc-typography">
        <Style src="/Style/Menu/Main.css"/>
        <nav class="mdc-drawer__drawer">
            <div class="mdc-drawer__toolbar-spacer" style={{borderColor:'rgba(0,0,0,0)'}}></div>
            <nav class="mdc-drawer__content mdc-list">
                <a
                        ref="settingsMenu"
                        class={"mdc-list-item " + (this.props.page == 'settings' ? "mdc-list-item--activated mdc-list--theme-dark" : "")}
                >
                    <i class="mdc-list-item__graphic material-icons" aria-hidden="true">settings</i>
                    {this.lang.translate('settings')}
                </a>
            </nav>
        </nav>
    </aside>
</MDC.Drawer>
