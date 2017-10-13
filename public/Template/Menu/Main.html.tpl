<MDC.Drawer class="mdc-temporary-drawer" open={this.state.open} onClose={this.closeMenu.bind(this)}>
    <aside class={this.props.className}>
        <nav class={this.props.className + "__drawer"}>
            <div class={this.props.className + "__toolbar-spacer"}></div>
            <div class="mdc-list-group">
                <nav class="mdc-list">
                    <a
                            ref="settingsMenu"
                            class={(this.props.page == 'settings' ? this.props.className + "--selected mdc-list--theme-dark" : "") + " mdc-list-item"}
                    >
                        <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">settings applications</i> Anwendungseinstellungen
                    </a>
                </nav>
            </div>
        </nav>
    </aside>
</MDC.Drawer>
