import { LitElement, html, css } from 'lit-element';
import { styles } from 'wgnhs-common';
export { AppCollapsible } from 'wgnhs-layout';
export { ButtonLink } from 'wgnhs-layout';
export { AppSpinner } from 'wgnhs-layout';


const TOGGLE_EVENT = 'toggle-slide-view';

export class SlideViewPanel extends LitElement {
  static get properties() {
    return {
      previewImgSrc: {
        type: String,
        attribute: false
      },
      imgSrc: {
        type: String,
        attribute: false
      },
      zoom: {
        type: Number
      },
      preserveZoom: {
        type: Boolean,
        attribute: 'preserve-zoom'
      }
    };
  }

  constructor() {
    super();
    this.zoom = SlideViewPanel.INITIAL_ZOOM;
    this.slideViewerOpen = false;
    this.slideViewerLoading = false;
  }

  static get styles() {
    return [
      ...styles,
      css`
    .container {
      min-height: 10em;
      width: 100%;
      justify-content: center;
      overflow: auto;
    }
    .content {
      max-width: 100%;
      padding: var(--border-radius);
      box-sizing: border-box;
    }
    .controls {
      display: grid;
      grid-column-template: 1fr;
      grid-gap: var(--border-radius);
      position: absolute;
      right: var(--border-radius);
      margin: var(--border-radius);
      z-index: 10;
    }
    .control {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: var(--icon-size-large);
      color: var(--palette-accent);
      text-align: center;
      cursor: pointer;
      padding: var(--border-radius);
      background-color: var(--palette-light);
      border: none;
      border-radius: 50%;
    }
    .control:hover {
      color: var(--el-color-hover, var(--palette-900));
    }
    #toolbarViewerRight {
      display: none;
    }
    .banner {
      background-color: var(--palette-light);
      padding: .5rem 1rem;
      font-size: .8rem;
      display: block;
      float: left;
      width: 100%;
    }
    .banner p {
      margin: 0;
      font-size: inherit;
      font-style: italic;
      max-width: 80%;
      display: block;
      float: left;
    }
    .uw-button {
      display: block;
      float: left;
      text-align: center;
      font-family: var(--uwButtonFont);
      font-weight: 500;
      line-height: 1.2;
      padding: .5rem .75rem;
      margin: 0 .5rem;
      background: #036796;
      color: #fff;
      box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, .25);
      position: relative;
      cursor: pointer;
      -webkit-appearance: none;
      transition: all .25s ease-out;
      vertical-align: middle;
      border: 2px solid #036796;
      border-radius: .5rem;
      text-decoration: none !important;
      }
      .preview-image {
        position: relative;
        display: block;
        float: left;
        width: 100%;
      }
      app-spinner {
          background: rgba(255, 255, 255, 0.8);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding-top: 25%;
      }
    [data-closed], .banner [data-closed] {
      display: none;
    }
      .img-wrapper {
        display: flex;
        justify-content: center; /* Horizontally centers the image */
        align-items: center;  
      }
    `];
  }


  render() {
    console.log("render slide viewer")
    return html`
    <div class="container" ?data-closed=${!this.previewImgSrc}>
      <div class="banner" ?data-closed=${this.slideViewerOpen}>
        <p>This is a preview showing the first image in the set. Click the "View all images" button to load all images in high-resolution. Large image sets may take a moment to load.</p>
        <button class="uw-button" @click=${this.toggleSlideViewer}>View all images</button> 
      </div>
      <div class="preview-image">
        <div class="controls" ?data-closed=${this.slideViewerOpen} >
          <button class="control" @click=${this.hide}><i class="material-icons" title="Hide">close</i></button>
          <button class="control" @click=${this.zoomIn} ?disabled=${this.isMaxZoom}><i class="material-icons" title="Zoom In">zoom_in</i></button>
          <button class="control" @click=${this.zoomOut} ?disabled=${this.isMinZoom}><i class="material-icons" title="Zoom Out">zoom_out</i></button>
        </div>
        ${this.imageTag}
      </div>
      <slot></slot>
      <app-spinner ?data-closed=${!this.slideViewerLoading}></app-spinner>
      ${this.slideViewerElement}
    </div>
    `;
  }

  toggleSlideViewer(){
    console.log("slide viewer button clicked")
    this.slideViewerOpen = !this.slideViewerOpen
    this.requestUpdate();
    if(this.slideViewerOpen && !this.slideViewerLoaded) {
      this.slideViewerLoading = true;
      this.slideViewerElement = html`<div class="container">
      <img id="viewer"
        src="${this.imgSrc}"
        class="right-panel positioned"
        style="height: 100dvh;"
      >
        </img>
      </div>`;
      this.requestUpdate().then(() => {
        this.slideViewerLoading = false;
        this.requestUpdate('slideViewerLoading');
        this.slideViewerLoaded = true;
        /*console.log("request updating");
        const viewerElement = this.shadowRoot.querySelector('pdfjs-viewer-element');
        console.log(viewerElement);
        viewerElement.initPromise.then(({ viewerApp }) => {
          // Optional: listen to document loaded event via viewerApp if needed
          console.log("init promise");
          viewerApp.eventBus.on('pagesloaded', (evt) => {
            this.slideViewerLoading = false;
            this.requestUpdate('slideViewerLoading');
            console.log(this.slideViewerLoading);
          });
        }).catch((error) => {
          console.error('Failed to load slide viewer:', error);
          // Handle error state
        });
        this.slideViewerLoaded = true;*/
      });
    } else if (this.slideViewerOpen && this.slideViewerLoaded) {
      this.requestFullscreen.update();
    } else {
      this.slideViewerElement = html``;
    }
  }

  static get MAX_ZOOM() {
    return 3;
  }
  get isMaxZoom() {
    return this.zoom >= SlideViewPanel.MAX_ZOOM;
  }

  static get MIN_ZOOM() {
    return 0.5;
  }
  get isMinZoom() {
    return this.zoom <= SlideViewPanel.MIN_ZOOM;
  }

  static get INITIAL_ZOOM() {
    return 1;
  }

  get zoom() {
    return this._zoom;
  }
  set zoom(val) {
    const old = this.zoom;
    this._zoom = Math.min(Math.max(val, SlideViewPanel.MIN_ZOOM),SlideViewPanel.MAX_ZOOM);
    this.requestUpdate('zoom', old);
    console.log(this.zoom);
  }

  zoomIn() {
    this.zoom += 0.25;
  }
  zoomOut() {
    this.zoom -= 0.25;
  }

  get translate() {
    let result = {
      x: 0,
      y: 0
    };
    if (this.rotate) {
      result.x = (this.rotate === 1)? 0 : (100 * this.zoom);
      result.y = (this.rotate === 3)? 0 : (100 * this.zoom);
    }
    return result;
  }

  get imageTag() {
    if (!this.previewImgSrc) {
      return '';
    } else {
        return html`<div class="img-wrapper" ?data-closed=${this.slideViewerOpen} style="${this.contentTransform}"><img class="content" ?data-closed=${this.slideViewerOpen} src="${this.previewImgSrc}"/></div>`;
      }
  }

  get contentTransform() {
    let zoom = this.zoom;
    let fix = this.translate;
    let result = `
      transform-origin: top left;
      transform: translate(-${fix.x}%, -${fix.y}%) scale(${zoom})
      `;

    return result;
  }

  show(previewUrl, imgUrl) {
    console.log('show', previewUrl);
    this.dispatchEvent(new CustomEvent(TOGGLE_EVENT,
      {bubbles: true, composed: true, detail: {previewUrl, closed: false}}));
    this.previewImgSrc = previewUrl;
    this.imgSrc = imgUrl;
    if (!this.preserveZoom) {
      this.zoom = SlideViewPanel.INITIAL_ZOOM;
    }
    this.requestUpdate();
  }

  hide() {
    console.log('hide panel');
    this.slideViewerOpen = false;
    this.slideViewerLoaded = false;
    this.slideViewerLoading = false;
    //this.pdfViewerLoaded = false;
    //this.togglePdfViewer();
    //this.previewImgSrc = null;
    //this.pdfSrc = null;
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent(TOGGLE_EVENT,
      {bubbles: true, composed: true, detail: {closed: true}}));
  }
}
customElements.define('slide-view-panel', SlideViewPanel);

export class SlideViewButton extends LitElement {
  static get properties() {
    return {
      src: {
        type: String
      },
      preview: {
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

    [data-closed] {
      visibility: hidden;
    }
    `];
  }

  render() {
    console.log("render buttons")
    return html`
    <div class="container" ?data-closed=${this.missing}>
      <app-collapsible @open="${this.toggle}" button>
        <span slot="header"><slot name="download-text">View/download images</slot></span>
        <i slot="header-after" class="material-icons" title="Preview">${
          (this.alt)?'chevron_left':'chevron_right'
        }</i>
      </app-collapsible>
    </div>
    `;
  }

  updated(prev) {
    console.log("updated triggered");
    console.log(prev);
    if ((prev.has('panel') || prev.has('src'))) {
      //console.log(this.missing);
      //this.resetMissingImageCheck();
      //console.log(this.missing);
      console.log(this.panel);
      console.log(this.preview);
      if (this.panel && this.preview) {
        this.checkImageExistence(this);
      }
      this.requestUpdate();
    }
  }

  toggle(e) {
    console.log("toggle triggered");
    if (this.alt) {
      this.panel.hide();
    } else {
      this.panel.show(this.preview, this.src);
    }
    this.requestUpdate();
  }

  resetMissingImageCheck() {
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
    if (e.detail.previewUrl === this.preview) {
      this.alt = true;
    } else {
      this.alt = false;
    }
    this.requestUpdate();
  }

  async checkImageExistence() {
    console.log("checking for missing image")
    try {
      const response = await fetch(this.preview, { method: 'HEAD' });
      // If status is 200-299, the file exists
      if (response.ok) {
        this.missing = false;
      }
      this.imageExists = response.ok; 
    } catch (error) {
      // Network error or CORS issue
      this.missing = true;
    }
    console.log(this.missing);
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
customElements.define('slide-view-button', SlideViewButton);