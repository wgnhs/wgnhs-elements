(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lit-element'), require('wgnhs-common')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lit-element', 'wgnhs-common'], factory) :
  (global = global || self, factory(global['wgnhs-layout'] = {}, global['wgnhs-common'], global['wgnhs-common']));
}(this, function (exports, litElement, wgnhsCommon) { 'use strict';

  /*
   * Code from https://github.com/lukehaas/css-loaders
  The MIT License (MIT)

  Copyright (c) 2014 Luke Haas

  Permission is hereby granted, free of charge, to any person obtaining a copy of
  this software and associated documentation files (the "Software"), to deal in
  the Software without restriction, including without limitation the rights to
  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
  the Software, and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
  FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
  IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
  class AppSpinner extends litElement.LitElement {
    static get properties() {
      return {

      };
    }

    constructor() {
      super();
    }

    static get styles() {
      return litElement.css`
    .loader {
      color: var(--palette-900);
      font-size: 90px;
      text-indent: -9999em;
      overflow: hidden;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      margin: 72px auto;
      position: relative;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
      animation: load6 1.7s infinite ease, round 1.7s infinite ease;
    }
    @-webkit-keyframes load6 {
      0% {
        box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
      }
      5%,
      95% {
        box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
      }
      10%,
      59% {
        box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
      }
      20% {
        box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
      }
      38% {
        box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
      }
      100% {
        box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
      }
    }
    @keyframes load6 {
      0% {
        box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
      }
      5%,
      95% {
        box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
      }
      10%,
      59% {
        box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
      }
      20% {
        box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
      }
      38% {
        box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
      }
      100% {
        box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
      }
    }
    @-webkit-keyframes round {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @keyframes round {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    `;
    }

    render() {
      return litElement.html`
      <div class="loader">Loading...</div>
    `;
    }
  }
  customElements.define('app-spinner', AppSpinner);

  class AppSidebar extends litElement.LitElement {
    static get properties() {
      return {
        title: {
          type: String
        },
        tabs: {
          type: Array
        }
      };
    }

    constructor() {
      super();
    }

    static get styles() {
      return litElement.css`
      :host {
        padding: 0 var(--border-radius);
      }
      [data-closed] {
        display: none;
      }
    `;
    }

    switchTab(choice) {
      this.shadowRoot.querySelectorAll('.slot-container').forEach((el) => {
        if ((choice === 'default' && !el.getAttribute('name')) || (el.getAttribute('name') === choice)) {
          el.removeAttribute('data-closed');
        } else {
          el.setAttribute('data-closed', true);
        }
      });
    }

    handleChoiceChange(e) {
      this.switchTab(e.detail.choice);
    }

    render() {
      return litElement.html`
      ${(!this.title)?'':litElement.html`<h1 class="header">${this.title}</h1>`}
      <div class="slot-container">
        <slot></slot>
      </div>
      ${!(this.tabs)?'':this.tabs.map((el) => litElement.html`
      <div name='${el}' class="slot-container" data-closed>
        <slot name='${el}'></slot>
      </div>
      `)}
    `;
    }
  }

  customElements.define('app-sidebar', AppSidebar);

  /**
   * Code use and modified from
   * https://alligator.io/css/collapsible/
   */
  class AppCollapsible extends litElement.LitElement {
    static get properties() {
      return {
        genId: {
          type: String,
          attribute: false
        },
        open: {
          type: Boolean,
          reflect: true
        },
        button: {
          type: Boolean
        }
      };
    }

    constructor() {
      super();
      this.genId = wgnhsCommon.genId();
    }

    static get styles() {
      return litElement.css`
    .wrap-collapsible {
      box-sizing: border-box;
      margin: var(--border-radius) 0;
      border: var(--el-border, none);
      border-radius: var(--border-radius);
    }

    input[type='checkbox'] {
      display: none;
    }

    .lbl-toggle {
      display: block;

      font-weight: var(--el-header-font-weight, var(--font-weight-bold));
      font-size: var(--el-header-font-size, var(--font-size-extra-large));
      text-align: center;

      padding: var(--el-header-padding, var(--border-radius));

      color: var(--el-header-color, var(--palette-accent));
      background: var(--el-header-background, var(--palette-light));

      cursor: pointer;

      border-radius: var(--border-radius);
      transition: border-radius var(--transition-duration, 0.3s) cubic-bezier(0.755, 0.05, 0.855, 0.06);
    }

    .lbl-toggle:hover {
      color: var(--el-color-hover, var(--palette-900));
    }

    .lbl-toggle:focus {
      outline: thin dotted;
    }

    .collapsible-content {
      overflow: hidden;
      max-height: 0px;
      visibility: hidden;
      transition: max-height var(--transition-duration, 0.3s) cubic-bezier(0.86, 0, 0.07, 1), visibility var(--transition-duration, 0.3s) linear;
    }

    .wrap-collapsible:not([button]) > .toggle:checked ~ .collapsible-content {
      max-height: var(--el-max-height, 3000px);
      visibility: visible;
    }

    .wrap-collapsible:not([button]) > .toggle:checked ~ .lbl-toggle {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      transition: border 0s;
    }

    .collapsible-content > .content-inner {
      background: var(--el-content-background, var(--palette-white));
      border-bottom: 1px solid var(--el-header-background, var(--palette-light));
      border-right: 1px solid var(--el-header-background, var(--palette-light));
      border-left: 1px solid var(--el-header-background, var(--palette-light));
      border-bottom-left-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
      padding: var(--font-size);
    }
    .collapsible-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    `;
    }

    render() {
      return litElement.html`
    <div class="wrap-collapsible" ?button=${this.button}>
      <input id="${this.genId}" class="toggle" type="checkbox" .checked="${this.open}" @change=${this._handleChange}>
      <label for="${this.genId}" class="lbl-toggle" tabindex="0">
        <div class="collapsible-header">
          <div><slot name="header-before"></slot></div>
          <div><slot name="header"></slot></div>
          <div><slot name="header-after"></slot></div>
        </div>
      </label>
      <div class="collapsible-content">
        <div class="content-inner">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
    `;
    }

    firstUpdated() {
      let myLabels = this.renderRoot.querySelectorAll('.lbl-toggle');

      Array.from(myLabels).forEach(label => {
        label.addEventListener('keydown', e => {
          // 32 === spacebar
          // 13 === enter
          if (e.which === 32 || e.which === 13) {
            e.preventDefault();
            label.click();
          }      });
      });
    }

    updated(changed) {
      let eventName = 'open';
      if (changed.has(eventName)) {
        wgnhsCommon.dispatch(this, eventName, { value: this[eventName] });
      }
    }

    _handleChange(e) {
      this.open = e.target.checked;
    }
  }
  customElements.define('app-collapsible', AppCollapsible);

  class ButtonLink extends litElement.LitElement {
    static get properties() {
      return {
        href: {
          type: String
        },
        target: {
          type: String
        },
        download: {
          type: Boolean
        }
      };
    }

    constructor() {
      super();
    }

    static get styles() {
      return litElement.css`
    a {
      text-decoration: none;
      margin: var(--border-radius) 0;
    }
    .link:hover {
      color: var(--palette-900);
    }
    .link:focus {
      outline: thin dotted;
    }
    .link {
      display: block;

      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-extra-large);
      text-align: center;

      cursor: pointer;
      text-align: center;
      background: var(--palette-light);
      color: var(--palette-accent);
      border-radius: var(--border-radius);
      padding: var(--border-radius);
    }
    .wrap-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .icon {
      font-size: var(--icon-size-extra-large);
    }
    `;
    }

    render() {
      return litElement.html`
    <a class="link"
      href="${this.href}"
      target="${this.target}"
      ?download=${this.download}>
      <div class="wrap-content">
        <div><slot name="content-before"></slot></div>
        <div><slot name="content"></slot></div>
        <div><slot name="content-after"></slot></div>
      </div>
    </a>
    `;
    }
  }
  customElements.define('button-link', ButtonLink);

  class InRadio extends litElement.LitElement {
    static get properties() {
      return {
        inName: {
          type: String,
          attribute: 'in-name'
        },
        choices: {
          type: Array
        },
        choice: {
          type: String,
          reflect: true
        }
      };
    }

    constructor() {
      super();
      this.checked = [];
      this.genId = (function() {
        const memo = {};
        return function(index) {
          if (!memo[index]) {
            memo[index] = wgnhsCommon.genId();
          }
          return memo[index];
        }
      })();
    }

    firstUpdated() {
      if (!this.choice && this.choices) {
        this.choice = this.choices[0];
      }
    }

    updated() {
      let event = new CustomEvent('choice-change', {
        detail: {
          choice: this.choice
        }
      });
      this.dispatchEvent(event);
    }

    inChange(e) {
      this.choice = e.target.value;
    }

    render() {
      return litElement.html`
      ${this.choices.map((item, index) => litElement.html`
        <div class="choice">
          <input 
            type="radio" 
            name="${this.inName}" 
            id="${this.genId(index)}" 
            value="${item}" 
            .checked="${(this.choice === item)}" 
            @change="${this.inChange}"
          >
          <label for="${this.genId(index)}">${item}</label>
        </div>
      `)}
    `;
    }
  }
  customElements.define('in-radio', InRadio);

  class ToggleSwitch extends litElement.LitElement {
    static get properties() {
      return {
        checked: {
          type: Boolean
        }
      };
    }

    constructor() {
      super();
      if (!this.switchId) {
        this.switchId = wgnhsCommon.genId();
      }
    }

    static get styles() {
      return litElement.css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    input[type=checkbox]{
      height: 0;
      width: 0;
      margin: 0;
      visibility: hidden;
    }

    label {
      cursor: pointer;
      text-indent: -9999px;
      width: calc(2 * var(--icon-size));
      height: var(--icon-size);
      background: var(--palette-accent);
      display: block;
      border-radius: var(--icon-size);
      position: relative;
    }

    label:after {
      content: '';
      position: absolute;
      top: calc(calc(var(--icon-size) - var(--icon-size-small)) / 2);
      left: calc(calc(var(--icon-size) - var(--icon-size-small)) / 2);
      width: var(--icon-size-small);
      height: var(--icon-size-small);
      background: var(--palette-white);
      border-radius: var(--icon-size-small);
      transition: 0.3s;
    }

    input:checked + label {
      background: var(--palette-active);
    }

    input:checked + label:after {
      left: calc(100% - calc(calc(var(--icon-size) - var(--icon-size-small)) / 2));
      transform: translateX(-100%);
    }

    label:active:after {
      width: calc(var(--icon-size-small) + calc(calc(var(--icon-size) - var(--icon-size-small)) / 2));
    }
    `;
    }

    render() {
      return litElement.html`
    <input type="checkbox" id="${this.switchId}" .checked=${this.checked} @change=${this.handleChange} /><label for="${this.switchId}">Toggle</label>
    `;
    }

    updated(changed) {
      if (changed.has('checked')) {
        wgnhsCommon.dispatch(this, 'change', {checked: this.checked}, true);
      }
    }

    handleChange(e) {
      this.checked = e.target.checked;
    }

    toggle() {
      this.checked = !this.checked;
    }
  }
  customElements.define('toggle-switch', ToggleSwitch);

  exports.AppCollapsible = AppCollapsible;
  exports.AppSidebar = AppSidebar;
  exports.AppSpinner = AppSpinner;
  exports.ButtonLink = ButtonLink;
  exports.InRadio = InRadio;
  exports.ToggleSwitch = ToggleSwitch;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
