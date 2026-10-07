import { LitElement, html, css } from 'lit-element';
import { styles } from 'wgnhs-common';
export { AppCollapsible } from 'wgnhs-layout';
export { ButtonLink } from 'wgnhs-layout';
export { AppSpinner } from 'wgnhs-layout';


const pdfjsLib = window['pdfjs-dist/build/pdf'];

const TOGGLE_EVENT = 'toggle-pdf-panel';

class PDFRendererMultipage {
  render(url, zoom) {
    let dataUrls = [];
    if (url) {
        dataUrls.push(url);
        console.log("returning data urls");
        console.log(dataUrls);
        return dataUrls;
    }
    return Promise.reject(null);
  }

  async renderPageToCanvas(pdf, pageNum, canvasEl, zoom) {
    const page = await pdf.getPage(pageNum);
    //var scale = 1.0;
    var viewport = page.getViewport({scale: zoom});

    // Prepare canvas using PDF page dimensions
    var canvas = canvasEl;
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    return renderTask.promise;

  }
}





/*class PDFRenderer {
  
  render(url) {
    console.log("local pdf renderer")
    const viewer_parent = document.querySelector("pdf-view-panel");
    const viewer = viewer_parent.querySelector("div.container");
    console.log(viewer);
    if (url) {
      let loadingTask = pdfjsLib.getDocument(url);
      return loadingTask.promise.then(async (pdf) => {
        console.log("hello new pdf code");
        console.log("pdf has " + pdf.numPages + " pages");
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          console.log("working on page " + pageNum);
          // 1. Create a canvas element for this specific page
          const canvas = document.createElement('canvas');
          console.log(viewer);
          //canvas.className = 'pdf-page-canvas';
          console.log(canvas)
          // 2. Render the page onto its canvas
          this.renderPage(pdf, pageNum, canvas).then(
            console.log("appending canvas"),
            viewer.appendChild(canvas)
          );   
      }
      });
    }
  }

  async renderPage(pdf, pageNum, canvas) {
    console.log("rendering page");
    var scale = 1.0;
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: scale });
    const context = canvas.getContext('2d');
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    
    await page.render(renderContext).promise;
  };
  https://www.nutrient.io/blog/complete-guide-to-pdfjs/
  https://www.nutrient.io/blog/how-to-build-a-javascript-pdf-viewer-with-pdfjs/
}*/


export class PDFViewPanelMultipage extends LitElement {
  static get properties() {
    return {
      pdfsrc: {
        type: String,
        attribute: false
      },
      rotate: {
        type: Number
      },
      preserveRotate: {
        type: Boolean,
        attribute: 'preserve-rotate'
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
    this.cache = {};
    this.renderer = new PDFRendererMultipage();
    this.rotate = PDFViewPanelMultipage.INITIAL_ROTATE;
    this.zoom = PDFViewPanelMultipage.INITIAL_ZOOM;
    this.pdfViewerOpen = false;
    this.pdfViewerLoading = false;
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
      top: 0;
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
    [data-closed] {
      display: none;
    }
    #toolbarViewerRight {
      display: none;
    }
    `];
  }


  render() {
    console.log("render data")
    return html`
    <div class="controls" ?data-closed=${this.pdfViewerOpen} >
      <button class="control" @click=${this.hide}><i class="material-icons" title="Hide">close</i></button>
      <button class="control" @click=${this.zoomIn} ?disabled=${this.isMaxZoom}><i class="material-icons" title="Zoom In">zoom_in</i></button>
      <button class="control" @click=${this.zoomOut} ?disabled=${this.isMinZoom}><i class="material-icons" title="Zoom Out">zoom_out</i></button>
      <button class="control" @click=${this.rotateLeft}><i class="material-icons" title="Rotate Left">rotate_left</i></button>
      <button class="control" @click=${this.rotateRight}><i class="material-icons" title="Rotate Right">rotate_right</i></button>
    </div>
    <div class="container" ?data-closed=${!this.imgsrc}>
      <div class="banner" ?data-closed=${this.pdfViewerOpen} >This is a preview showing the first image in the set. <button @click=${this.togglePdfViewer}>View all images</button></div>
      ${this.imageTag}
      <slot></slot>
     <app-spinner ?data-closed=${!this.pdfViewerLoading}></app-spinner>
      ${this.pdfViewerElement}
    </div>
    `;

    /*return html`
    <div class="container">
      <pdfjs-viewer-element id="viewer"
        src="${this.pdfsrc}"
        class="right-panel positioned"
        style="height: 100dvh;"
      >
      </pdfjs-viewer-element>
    </div>
    `;*/
  }

  togglePdfViewer(){
    console.log("pdf viewer button clicked")
    this.pdfViewerOpen = !this.pdfViewerOpen
    this.requestUpdate();
    if(this.pdfViewerOpen && !this.pdfViewerLoaded) {
      const pdfUrl = this.pdfsrc.replace("-preview.jpg", ".pdf")
      
      console.log("PDF URL");
      console.log(pdfUrl);
      this.pdfViewerLoading = true;
      this.pdfViewerElement = html`<div class="container">
      <pdfjs-viewer-element id="viewer" ?data-closed=${!this.pdfViewerOpen}
        src="${pdfUrl}"
        class="right-panel positioned"
        style="height: 100dvh;"
      >
        </pdfjs-viewer-element>
      </div>`;
      this.requestUpdate().then(() => {
        console.log("request updating");
        const viewerElement = this.shadowRoot.querySelector('pdfjs-viewer-element');
        console.log(viewerElement);
        viewerElement.initPromise.then(({ viewerApp }) => {
          // Optional: listen to document loaded event via viewerApp if needed
          console.log("init promise");
          viewerApp.eventBus.on('pagesloaded', (evt) => {
            this.pdfViewerLoading = false;
            this.requestUpdate('pdfViewerLoading');
            console.log(this.pdfViewerLoading);
          });
        }).catch((error) => {
          console.error('Failed to load PDF viewer:', error);
          // Handle error state
        });
        this.pdfViewerLoaded = true;
      });
    } else {
      this.pdfViewerElement = html``;
    }
  }
    

  get imgsrc() {
    return this.cache[this.pdfsrc];
  }

  static get MOD_ROTATE() {
    return 4;
  }

  static get INITIAL_ROTATE() {
    return 0;
  }

  get rotate() {
    return this._rotate;
  }
  set rotate(val) {
    const old = this.rotate;
    let rot = Math.round(val) + PDFViewPanelMultipage.MOD_ROTATE;
    this._rotate = (rot % PDFViewPanelMultipage.MOD_ROTATE);
    this.requestUpdate('rotate', old);
  }

  rotateLeft() {
    this.rotate -= 1;
  }
  rotateRight() {
    this.rotate += 1;
  }

  static get MAX_ZOOM() {
    return 3;
  }
  get isMaxZoom() {
    return this.zoom >= PDFViewPanelMultipage.MAX_ZOOM;
  }

  static get MIN_ZOOM() {
    return 0.5;
  }
  get isMinZoom() {
    return this.zoom <= PDFViewPanelMultipage.MIN_ZOOM;
  }

  static get INITIAL_ZOOM() {
    return 1;
  }

  get zoom() {
    return this._zoom;
  }
  set zoom(val) {
    const old = this.zoom;
    this._zoom = Math.min(Math.max(val, PDFViewPanelMultipage.MIN_ZOOM), PDFViewPanelMultipage.MAX_ZOOM);
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
    if (!this.imgsrc) {
      return '';
    } else {
        return html`<div class="img-wrapper" ?data-closed=${this.pdfViewerOpen} style="${this.contentTransform}"><img class="content" src="${this.imgsrc}" style="${this.contentTransform}"/></div>`;
      }
  }

  get contentTransform() {
    let rot = this.rotate / PDFViewPanelMultipage.MOD_ROTATE;
    let zoom = this.zoom;
    let fix = this.translate;
    let result = `
      transform-origin: top left;
      transform: rotate(${rot}turn) translate(-${fix.x}%, -${fix.y}%) scale(${zoom})
      `;

    return result;
  }

  show(url) {
    console.log('show', url);
    this.dispatchEvent(new CustomEvent(TOGGLE_EVENT,
      {bubbles: true, composed: true, detail: {url, closed: false}}));
    this.pdfsrc = url;
    if (!this.preserveRotate) {
      this.rotate = PDFViewPanelMultipage.INITIAL_ROTATE;
    }
    if (!this.preserveZoom) {
      this.zoom = PDFViewPanelMultipage.INITIAL_ZOOM;
    }
  }

  hide() {
    // console.log('hide');
    this.pdfsrc = null;
    this.dispatchEvent(new CustomEvent(TOGGLE_EVENT,
      {bubbles: true, composed: true, detail: {closed: true}}));
  }

  _getFromCache(url) {
    return new Promise((resolve, reject) => {
      let result = this.cache[url];
      console.log("cache result is " + result);
      if (result) {
        resolve(result);
      } else {
        reject('Not in cache');
      }
    });
  }


  request(url) {
    console.log('request', url);
    return this._getFromCache(url).catch(() => {
        console.log("request value")
        console.log(url);
        this.cache[url] = url;
        this.requestUpdate('cache');
        return url;
    });
  }

}
customElements.define('pdf-view-panel-multipage', PDFViewPanelMultipage);

export class PDFViewButtonMultipage extends LitElement {
  static get properties() {
    return {
      src: {
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
    console.log("render buttons")
    return html`
    <div class="container" ?data-closed=${this.missing}>
      <app-collapsible @open="${this.toggle}" button>
        <span slot="header"><slot name="view-text">View/download images</slot></span>
        <i slot="header-after" class="material-icons" title="Preview">${
          (this.alt)?'chevron_left':'chevron_right'
        }</i>
      </app-collapsible>
    </div>
    `;
  }

  updated(prev) {
    if ((prev.has('panel') || prev.has('src'))) {
      console.log(this.missing);
      this.resetMissingImageCheck();
      console.log(this.missing);
      if (this.panel && this.src) {
        this.panel.request(this.src)
          .then(this.checkImageExistence(this));
      }
      
    }
  }

  toggle(e) {
    if (this.alt) {
      this.panel.hide();
    } else {
      this.panel.show(this.src);
    }
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
    if (e.detail.url === this.src) {
      this.alt = true;
    } else {
      this.alt = false;
    }
    this.requestUpdate();
  }

  async checkImageExistence() {
    console.log("checking for missing image")
    try {
      const response = await fetch(this.src, { method: 'HEAD' });
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
customElements.define('pdf-view-button-multipage', PDFViewButtonMultipage);