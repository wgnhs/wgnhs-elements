import { LitElement, html, css } from 'lit-element';
import { styles } from 'wgnhs-common';
import { PDFRenderer } from './pdf-renderer.js';
import { SlideRenderer } from './slide-renderer.js';
export { AppCollapsible } from 'wgnhs-layout';
export { ButtonLink } from 'wgnhs-layout';
export { AppSpinner } from 'wgnhs-layout';


const TOGGLE_EVENT = 'toggle-pdf-panel';

export class PDFViewPanel extends LitElement {
  static get properties() {
    return {
      displayType: {
        type: String
      },
      sourceData: {
        type: String
      }
    };
  }

  constructor() {
    console.log("panel constructor fired");
    super();
    this.cache = {};
    //this.renderer = new PDFRenderer();
    
  }

  static get styles() {
    return [
      ...styles,
      css`
   
    .content {
      max-width: 100%;
      padding: var(--border-radius);
      box-sizing: border-box;
    }
    [data-closed] {
      display: none;
    }
    `];
  }

  render() {
    console.log("render viewer")
    return html`
    <div class="controls">
      <button class="control" @click=${this.hide}><i class="material-icons" title="Hide">close</i></button>
      <button class="control" @click=${this.zoomIn} ?disabled=${this.isMaxZoom}><i class="material-icons" title="Zoom In">zoom_in</i></button>
      <button class="control" @click=${this.zoomOut} ?disabled=${this.isMinZoom}><i class="material-icons" title="Zoom Out">zoom_out</i></button>
      <button class="control" @click=${this.rotateLeft}><i class="material-icons" title="Rotate Left">rotate_left</i></button>
      <button class="control" @click=${this.rotateRight}><i class="material-icons" title="Rotate Right">rotate_right</i></button>
    </div>
    <app-spinner ?data-closed=${this.imgsrc}></app-spinner>
    <div class="container" ?data-closed=${!this.imgsrc}>
      ${this.imgsrc}
      <slot></slot>
    </div>
    `;
  }

  show(src, displayType) {
    // console.log('show', url);
    this.dispatchEvent(new CustomEvent(TOGGLE_EVENT,
      {bubbles: true, composed: true, detail: {src, displayType, closed: false}}));
    this.sourceData = src;
    this.displayType = displayType;
    if (!this.preserveRotate) {
      this.rotate = PDFViewPanel.INITIAL_ROTATE;
    }
    if (!this.preserveZoom) {
      this.zoom = PDFViewPanel.INITIAL_ZOOM;
    }
  }

  hide() {
    // console.log('hide');
    this.sourceData = null;
    this.displayType = null;
    this.dispatchEvent(new CustomEvent(TOGGLE_EVENT,
      {bubbles: true, composed: true, detail: {closed: true}}));
  }

  _getFromCache(url) {
    return new Promise((resolve, reject) => {
      let result = this.cache[url];
      if (result) {
        resolve(result);
      } else {
        reject('Not in cache');
      }
    });
  }

  request(sourceData, displayType) {
    if(displayType == "gallery"){
      const imageList = [
        {
          src: "https://data.wgnhs.wisc.edu/thin-section-photos/1xpl.jpg",
          thumb: "https://data.wgnhs.wisc.edu/thin-section-photos/1ppl.jpg",
          alt: "thin section thumbnail"
        },
        {
          src: "https://data.wgnhs.wisc.edu/thin-section-photos/1xpl.jpg",
          thumb: "https://data.wgnhs.wisc.edu/thin-section-photos/1ppl.jpg",
          alt: "thin section thumbnail"
        },
        {
          src: "https://data.wgnhs.wisc.edu/thin-section-photos/1xpl.jpg",
          thumb: "https://data.wgnhs.wisc.edu/thin-section-photos/1ppl.jpg",
          alt: "thin section thumbnail"
        }
      ];

      console.log(imageList);

      this.cache[url] = html`<div class="container">
      <gallery-view id="viewer" .images="${imageList}"></gallery-view></div>`;
    }
    if(displayType == "pdf"){
      this.cache[url] = html`<div class="container">
      <pdf-view id="viewer" .pdfsrc="${sourceData}"></pdf-view></div>`

    }
    return this._getFromCache(url).catch(() => {
        console.log("cache miss");
        if(url.endsWith(".pdf")){
          console.log("setting renderer to pdf");
          this.renderer = new PDFRenderer();
        }
        if(url.endsWith(".jpg")){
          console.log("setting renderer to slide");
          this.renderer = new SlideRenderer();
        }
        return this.renderer.render(url, panel).then((value) => {
          console.log(value)
          this.cache[url] = value;
          this.requestUpdate('cache');
          return value;
      });
    });
  }

}
customElements.define('pdf-view-panel', PDFViewPanel);

export class PDFViewButton extends LitElement {
  static get properties() {
    return {
      src: {
        type: String
      },
      displayType: {
        type: String
      },
      panel: {
        type: Object,
        attribute: false
      },
      missing: {
        type: Boolean,
        attribute: false
      }
    };
  }

  constructor() {
    super();
    this.missing = true;
    this.alt = false;
  }

  static get styles() {
    return [
      ...styles,
      css`
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: var(--border-radius);
    }
    [data-closed] {
      visibility: hidden;
    }
    `];
  }

  render() {
    console.log("render pdf buttons")
    return html`
    <div class="container" ?data-closed=${this.missing}>
      <button-link href="${this.src}" target="_blank" download>
        <i slot="content-before" class="material-icons" title="Download">save_alt</i>
        <span slot="content"><slot name="download-text">Download</slot></span>
      </button-link>
      <app-collapsible @open="${this.toggle}" button>
        <span slot="header"><slot name="view-text">View</slot></span>
        <i slot="header-after" class="material-icons" title="View">${
          (this.alt)?'chevron_left':'chevron_right'
        }</i>
      </app-collapsible>
    </div>
    `;
  }

  updated(prev) {
    if ((prev.has('panel') || prev.has('src'))) {
      this.handleMissingPDF();
      if (this.panel && this.src) {
        this.panel.request(this.src, this.displayType)
          .then(this.handleLoadedPDF.bind(this), this.handleMissingPDF.bind(this));
      }
    }
  }

  toggle(e) {
    if (this.alt) {
      this.panel.hide();
    } else {
      this.panel.show(this.src, this.displayType);
    }
  }

  handleMissingPDF() {
    if (!this.missing) {
      this.missing = true;
    }
  }

  handleLoadedPDF() {
    if (this.missing) {
      this.missing = false;
    }
  }

  handleAlt(e) {
    if (e.detail.url === this.src) {
      this.alt = true;
    } else {
      this.alt = false;
    }
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    this.__altHandler = this.handleAlt.bind(this);
    document.addEventListener(TOGGLE_EVENT, this.__altHandler);
  }

  disconnectedCallback() {
    document.removeEventListener(TOGGLE_EVENT, this.__altHandler);
    super.disconnectedCallback();
  }
}
customElements.define('pdf-view-button', PDFViewButton);