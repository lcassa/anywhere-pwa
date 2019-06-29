import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `any-badge`
 * similiar to an icon but simpler
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class AnyBadge extends PolymerElement {

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none !important;
        }
      
        .badge {
          border-radius: var(--maximo-badge-border-radius, 25%);
          margin-left: var(--maximo-badge-margin-left, 0px);
          margin-bottom: var(--maximo-badge-margin-bottom, 0px);
          width: var(--maximo-badge-width, 20px);
          height: var(--maximo-badge-height, 20px);
          background-color: var(--maximo-badge-background, green);
          opacity: var(--maximo-badge-opacity, 1.0);
        }

      </style>
      <div id="badge" hidden$="{{_getHidden(data)}}">
        <span id="badge-text" style="font-size:{{fontSize}};color:{{color}};">{{data}}</span>
      </div>
    `;
  }

  static get properties() {
    return {

      /**
       * Content displayed inside badge
       */
      data: String,

      /**
       * Badge color
       */
      color: {
        type: String,
        value: 'blue',
        notify: true
      },
      
      /**
       * Content font size
       */
      fontSize:{
        type: String,
        value: '14px',
        notify: true
      }

    };
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }
  
}

window.customElements.define('any-badge', AnyBadge);
