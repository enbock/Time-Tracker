<div class="settings-card-container">
    <Style src="/Style/Settings.css"/>
    <div class="mdc-card__horizontal-block">
        <div class="mdc-card__actions mdc-typography--body2 hint">
            Sprache und Farbe
        </div>
    </div>
    <div class="mdc-card">
        <div class="settings-block">
            <MDC.Select onChange={this.onSelectionChange.bind(this)} name="language">
                <div class="mdc-select" role="listbox">
                    <div class="mdc-select__surface" tabIndex="0">
                        <div class="mdc-select__label mdc-select__label--float-above">
                            <i class="material-icons" aria-hidden="true">language</i>
                            Sprache wählen
                        </div>
                        <div class="mdc-select__selected-text"></div>
                        <div class="mdc-select__bottom-line"></div>
                    </div>
                    <div class="mdc-simple-menu mdc-select__menu">
                        <ul class="mdc-list mdc-simple-menu__items">
                            <li class="mdc-list-item" role="option" id="german" tabIndex="0" aria-selected="true">
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
        <div class="settings-block">
            <MDC.Select onChange={this.onSelectionChange.bind(this)} name="color">
                <div class="mdc-select" role="listbox">
                    <div class="mdc-select__surface" tabIndex="0">
                        <div class="mdc-select__label mdc-select__label--float-above">
                            <i class="material-icons" aria-hidden="true">palette</i>
                            Farbschema
                        </div>
                        <div class="mdc-select__selected-text">Google</div>
                        <div class="mdc-select__bottom-line"></div>
                    </div>
                    <div class="mdc-simple-menu mdc-select__menu">
                        <ul class="mdc-list mdc-simple-menu__items">
                            <li class="mdc-list-item" role="option" id="google" tabIndex="0" aria-selected="true">
                                Google
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
