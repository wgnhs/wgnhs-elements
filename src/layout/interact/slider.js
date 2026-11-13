import { LitElement, html, css } from 'lit-element';

export class Slider extends LitElement {
  static get properties() {
    return {
      value: {
        type: Number
      },
      min: {
        type: Number
      },
      max: {
        type: Number
      }
    };
  }

  constructor() {
    super();
    this.value = 50;
    this.count = 0;
    this.max = 100;
  }

  static get styles() {
    return css`
    input { width: 100% };
    `;
  }

  render() {
    return html`
      <input 
        type="range" 
        .min=${this.min} 
        .max=${this.max} 
        .value=${this.value}
        @input=${this._handleInput}
      />
      <span>${this.value}</span>
    `;
  }
  _handleInput(e) {
    this.value = Number(e.target.value);
    this.dispatchEvent(new CustomEvent('slider-change', { detail: this.value }));
  }
}
customElements.define('slider', Slider);