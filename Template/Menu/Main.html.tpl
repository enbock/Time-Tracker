<MDC.Drawer class="mdc-temporary-drawer" open={this.props.open} onClose={this.onClose.bind(this)}>
    <aside class={this.props.className}>
        <nav class={this.props.className + "__drawer"}>
            <div class={this.props.className + "__toolbar-spacer"}></div>
            <div class="mdc-list-group">
                <nav class="mdc-list">
                    <a
                            ref="menuInbox"
                            class={(this.props.page == 'inbox' ? this.props.className + "--selected " : "") + "mdc-list-item"}
                    >
                        <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
                    </a>
                    <a
                            ref="menuStar"
                            class={(this.props.page == 'star' ? this.props.className + "--selected " : "") + "mdc-list-item"}
                    >
                        <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Star
                    </a>
                </nav>
            </div>
        </nav>
    </aside>
</MDC.Drawer>
