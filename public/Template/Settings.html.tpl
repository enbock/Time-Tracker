<div class="settings-card-container">
    <div class="mdc-card__horizontal-block">
        <div class="mdc-card__actions mdc-typography--body2 hint">
            Sprache und Farbe
        </div>
    </div>
    <div class="mdc-card">
        <div class="settings-block">
            <div class="settings-label mdc-list-item">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">language</i>
                <div class="mdc-list-item__text">Sprache</div>
            </div>
            <div class="settings-content mdc-list-item">
                <MDC.Select onChange={this.onSelectionChange.bind(this)} name="language">
                    <div class="mdc-select" role="listbox" tabIndex="0">
                        <span class="mdc-select__selected-text">Deutsch</span>
                        <div class="mdc-simple-menu mdc-select__menu">
                            <ul class="mdc-list mdc-simple-menu__items">
                                <li class="mdc-list-item" role="option" id="german" tabIndex="0">
                                    Deutsch
                                </li>
                                <li class="mdc-list-item" role="option" id="english" tabIndex="0">
                                    Englisch
                                </li>
                            </ul>
                        </div>
                    </div>
                </MDC.Select>
            </div>
        </div>
        <div class="settings-block">
            <div class="settings-label mdc-list-item">
                <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">palette</i>
                Farbschema
            </div>
            <div class="settings-content mdc-list-item">
                <MDC.Select onChange={this.onSelectionChange.bind(this)} name="color">
                    <div class="mdc-select" role="listbox" tabIndex="0">
                        <span class="mdc-select__selected-text">Standard</span>
                        <div class="mdc-simple-menu mdc-select__menu">
                            <ul class="mdc-list mdc-simple-menu__items">
                                <li class="mdc-list-item" role="option" id="default" tabIndex="0">
                                    Standard
                                </li>
                                <li class="mdc-list-item" role="option" id="codefrog" tabIndex="0">
                                    Codefrog
                                </li>
                                <li class="mdc-list-item" role="option" id="dark" tabIndex="0">
                                    Dunkel
                                </li>
                            </ul>
                        </div>
                    </div>
                </MDC.Select>
            </div>
        </div>
    </div>
</div>
