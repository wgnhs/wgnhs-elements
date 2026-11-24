import { LitElement, html, css } from 'lit-element';
import { styles } from 'wgnhs-common';

export class GalleryView extends LitElement {
  
  static get properties() {
    return {
      images: {
        type: Array
      },
      selectedImage: {
        type: Object,
        state: true
      }
    };
  }

  static get styles() {
    return [
    ...styles,
          css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }

    /* Responsive Thumbnail Grid */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 12px;
    }

    .thumb-btn {
      padding: 0;
      border: 2px solid transparent;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      background: #f0f0f0;
      aspect-ratio: 1 / 1;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }

    .thumb-btn:hover,
    .thumb-btn:focus-visible {
      transform: scale(1.03);
      border-color: #0066cc;
      outline: none;
    }

    .thumb-btn img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Lightbox Overlay */
    .lightbox {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }

    .lightbox img {
      max-width: 90vw;
      max-height: 80vh;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }

    .caption {
      color: #fff;
      margin-top: 12px;
      font-size: 1rem;
    }

    .close-btn {
      position: absolute;
      top: 20px;
      right: 24px;
      background: none;
      border: none;
      color: #fff;
      font-size: 2rem;
      cursor: pointer;
    }`];
  }

  constructor() {
    console.log("hello from gallery view");
    super();
    //this.images = [];
    this.selectedImage = null;
  }

  _openLightbox(img) {
    this.selectedImage = img;
  }

  _closeLightbox() {
    this.selectedImage = null;
  }


render() {
  console.log(this.images);
    return html`
      <div class="grid">
        ${this.images.map(
          (img) => html`
            <button
              class="thumb-btn"
              @click=${() => this._openLightbox(img)}
              aria-label="View ${img.alt || 'image'}"
            >
              <img
                src=${img.thumb || img.src}
                alt=${img.alt || ''}
                loading="lazy"
              />
            </button>
          `
        )}
      </div>

      ${this.selectedImage
        ? html`
            <div class="lightbox" @click=${this._closeLightbox}>
              <button
                class="close-btn"
                @click=${this._closeLightbox}
                aria-label="Close preview"
              >
                &times;
              </button>
              <img
                src=${this.selectedImage.src}
                alt=${this.selectedImage.alt || ''}
                @click=${(e) => e.stopPropagation()}
              />
              ${this.selectedImage.alt
                ? html`<p class="caption">${this.selectedImage.alt}</p>`
                : ''}
            </div>
          `
        : ''}
    `;
  }
}

customElements.define('gallery-view', GalleryView);