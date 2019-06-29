import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import { searchIcon, searchIconSmall, closeIcon } from './any-icons.js';
import { AnywhereStyles } from './anywhere-styles.js';


class AnyQuickSearchBar extends PolymerElement {
  constructor() {
    super();
    
  }

  static get properties () {
    return {
      headerToggle: {
        type: String,
        value: 'block',
        notify: true,
      },
      inputToggle: {
        type: String,
        value: 'hidden',
        notify: true,
      },
      inputOn: {
        type: Boolean,
        value: false
      }
    };
  }

  static get template() {
    return html`
      ${AnywhereStyles}
      <style>
        :host {
          flex: 1 auto;
        }
        .hidden {
          display: none;
        }
        .block {
          display: block;
        }
        .header {
          flex: 1;
          margin-left: 10px;
          align-self: center;
        }
      </style>
      <style is="custom-style">
        paper-input {
          --paper-input-container-color: white;
          --paper-input-container-focus-color: white;
          --paper-input-container-invalid-color: white;
          --paper-input-container-input-color: white;
          --paper-input-container: {
            margin-top: -13px;
          };
          --paper-input-container-input: {
            color: white;
            font-size: 20px;
            padding-left: 10px;
            margin-bottom: 5px;
          };
        }
      </style>
      <div class="flex flex--row">
        <slot class$="header [[headerToggle]]" id="slot"></slot>
        <button class$="button button__icon [[headerToggle]]" on-click="_toogleSearchBar" aria-label="Search workorders">${searchIcon}</button>
        <paper-input id="paperInput" class$="header [[inputToggle]]" on-value-changed="_onSearchTermChanged">
          <div slot="prefix">${searchIconSmall}</div>
        </paper-input>
        <button class$="button button__icon [[inputToggle]]" on-click="_toogleSearchBar">${closeIcon}</button>
      </div>
    `;
  }

  _onSearchTermChanged(evt) {
    if (evt.detail.value.length > 2) {
      this.dispatchEvent(new CustomEvent('searchTermChanged', 
        {
          detail: {
            inputOn: this.inputOn,
            searchTerm: evt.detail.value
          }
        }));
    }
  }

  _toogleSearchBar() {
    if(this.headerToggle == "block") {
      this.headerToggle = "hidden";
      this.inputToggle = "block";
      this.inputOn = true;
      // clear last query
      this.$.paperInput.value = "";
      this.$.paperInput.focus();
    }
    else {
      this.headerToggle = "block"; 
      this.inputToggle = "hidden";
      this.inputOn = false;
    }
    // fire event with input state
    this.dispatchEvent(new CustomEvent('searchTermChanged', 
      {
        detail: {
          inputOn: this.inputOn,
          searchTerm: this.$.paperInput.value
        }
      }));
  }
}

window.customElements.define('any-quick-search-bar', AnyQuickSearchBar);