import { LitElement, html, css } from 'lit-element';
import { styles } from 'wgnhs-common';

const pdfjsLib = window['pdfjs-dist/build/pdf'];

export class PdfView extends LitElement {

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

  static get styles() {
    return [
    ...styles,
          css`
    .container {
      min-height: 10em;
      width: 100%;
      display: grid;
      grid-column-template: 1fr;
      grid-gap: var(--border-radius);
      justify-content: center;
      overflow: auto;
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
      visibility: hidden;
    }
    `];
  }

    constructor() {
      console.log("hello from pdf view");
      super();
      //this.images = [];
      this.rotate = PDFViewPanel.INITIAL_ROTATE;
      this.zoom = PDFViewPanel.INITIAL_ZOOM;
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
      let rot = Math.round(val) + PDFViewPanel.MOD_ROTATE;
      this._rotate = (rot % PDFViewPanel.MOD_ROTATE);
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
      return this.zoom >= PDFViewPanel.MAX_ZOOM;
    }
  
    static get MIN_ZOOM() {
      return 0.5;
    }
    get isMinZoom() {
      return this.zoom <= PDFViewPanel.MIN_ZOOM;
    }
  
    static get INITIAL_ZOOM() {
      return 1;
    }
  
    get zoom() {
      return this._zoom;
    }
    set zoom(val) {
      const old = this.zoom;
      this._zoom = Math.min(Math.max(val, PDFViewPanel.MIN_ZOOM), PDFViewPanel.MAX_ZOOM);
      this.requestUpdate('zoom', old);
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

    get contentTransform() {
      let rot = this.rotate / PDFViewPanel.MOD_ROTATE;
      let zoom = this.zoom;
      let fix = this.translate;
      let result = `
        transform-origin: top left;
        transform: rotate(${rot}turn) translate(-${fix.x}%, -${fix.y}%) scale(${zoom})
        `;

      return result;
    }
  
  get imgsrc() {
      console.log(this.cache[this.pdfsrc]);
      return this.cache[this.pdfsrc];
    }
  
  get imageTag() {
    return (!this.imgsrc)?'':html`
    <img class="content"
      src="${this.imgsrc}"
      style="${this.contentTransform}" />
    `;
  }

  render(url, panel) {
    console.log("pdf renderer");
    if (url){
      console.log("rendering pdf");
      let canvasEl = document.createElement('canvas');
      let loadingTask = pdfjsLib.getDocument(url);
      return loadingTask.promise.then(function(pdf) {
        // console.log('PDF Loaded');
        var pageNumber = 1;
        return pdf.getPage(pageNumber);
      }).then(function(page) {
        // console.log('Page loaded');
        
        var scale = 1.0;
        var viewport = page.getViewport({scale: scale});

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
      }).then(function () {
        // console.log('Page rendered');
        let durl = canvasEl.toDataURL();
        return durl;
      });
    } 
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
      ${this.imageTag}
      <slot></slot>
    </div>
    `;
  }
}

customElements.define('pdf-view', PdfView);