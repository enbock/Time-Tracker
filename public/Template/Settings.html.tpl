<div class="settings-card-container">
    <Style src="/Style/Settings.css" />
    <div class="mdc-card__horizontal-block">
        <div class="mdc-card__actions mdc-typography--body2 hint">
            {this.view.labels.settingsBoxTitle}
        </div>
    </div>
    <div class="mdc-card">
        <div class="settings-block">
            <MDC.Select onChange={this.onSelectionChange.bind(this)} id="language">
                <div class="mdc-select" role="listbox">
                    <div class="mdc-select__surface" tabIndex="0">
                        <div class="mdc-select__label mdc-select__label--float-above">
                            <i class="material-icons" aria-hidden="true">language</i>
                            {this.view.labels.languageSelectionTitle}
                        </div>
                        <div class="mdc-select__selected-text">
                            {this.view.labels[this.view.activeLanguage]}
                        </div>
                        <div class="mdc-select__bottom-line"></div>
                    </div>
                    <div class="mdc-simple-menu mdc-select__menu">
                        <ul class="mdc-list mdc-simple-menu__items">
                            <li
                                    class="mdc-list-item"
                                    role="option"
                                    id="de_DE"
                                    tabIndex="0"
                                    {...(this.state.language === 'de_DE' ? {'aria-selected':'true'} : {})}
                            >
                                {this.view.labels.german}
                            </li>
                            <li
                                    class="mdc-list-item"
                                    role="option"
                                    id="en_US"
                                    tabIndex="0" {...(this.state.language === 'en_US' ? {'aria-selected':'true'} : {})}
                            >
                                {this.view.labels.english}
                            </li>
                        </ul>
                    </div>
                </div>
            </MDC.Select>
        </div>
        <div class="settings-block">
            <MDC.Select onChange={this.onSelectionChange.bind(this)} id="color">
                <div class="mdc-select" role="listbox">
                    <div class="mdc-select__surface" tabIndex="0">
                        <div class="mdc-select__label mdc-select__label--float-above">
                            <i class="material-icons" aria-hidden="true">palette</i>
                            {this.view.labels.colorSelectionTitle}
                        </div>
                        <div class="mdc-select__selected-text">
                            {this.view.labels[this.view.activeTheme]}
                        </div>
                        <div class="mdc-select__bottom-line"></div>
                    </div>
                    <div class="mdc-simple-menu mdc-select__menu">
                        <ul class="mdc-list mdc-simple-menu__items">
                            <li
                                    class="mdc-list-item"
                                    role="option"
                                    id="google"
                                    tabIndex="0"
                                    {...(this.view.activeTheme === 'google' ? {'aria-selected':'true'} : {})}
                            >
                                {this.view.labels.google}
                            </li>
                            <li
                                    class="mdc-list-item"
                                    role="option"
                                    id="codefrog"
                                    tabIndex="0"
                                    {...(this.view.activeTheme === 'codefrog' ? {'aria-selected':'true'} : {})}
                            >
                                {this.view.labels.codefrog}
                            </li>
                        </ul>
                    </div>
                </div>
            </MDC.Select>
        </div>
    </div>
</div>
