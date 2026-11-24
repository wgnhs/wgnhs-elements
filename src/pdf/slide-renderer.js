import { LitElement, html, css } from 'lit-element';
export { SlideSlider } from 'wgnhs-layout';
const L = window['L'];

export class SlideRenderer {
  handleSlider(e, xpl) {
    xpl.setOpacity(e.detail / 100);
  }

  render(url, panel) {
    console.log("slide renderer");
    if (url){
      let containerDiv = document.createElement('div');
      containerDiv.class = 'container';
      let sliderDiv = document.createElement('slide-slider');
      let slideDiv = document.createElement('div');
      slideDiv.id = 'map-container';
      containerDiv.append(sliderDiv);
      containerDiv.append(slideDiv);
      console.log(containerDiv);
      
      //let modalContent  = "<div id='sliderContainer'><label>PPL</label><div id='slider'><div class='ui-slider-handle'></div></div><label>XPL</label></div>";
      //panel.append(sliderDiv);
      //panel.append(slideDiv);
      var thinSectionMap = new L.Map(slideDiv
                  , {crs: L.CRS.Simple, minZoom: -3}
              );
            //.setView(new L.LatLng(0,0), 0);
      var photoWidth = 2700;
      var photoHeight = 1800;
      var bounds = [[0,0], [4000,6000]];
    
      var ppl = L.imageOverlay(url, bounds).addTo(thinSectionMap);
      var xpl = L.imageOverlay('https://data.wgnhs.wisc.edu/thin-section-photos/1xpl.jpg', bounds);
      xpl.setOpacity(0.0).addTo(thinSectionMap);
      thinSectionMap.fitBounds(bounds);

      document.addEventListener('slider-change', (e) => {
        console.log("slider input");
        console.log(e.detail)
        xpl.setOpacity(e.detail / 100);
      });        
      
      return Promise.resolve(containerDiv);
      
      /*this.zoomifyThinSection(url);

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
      });*/
    } 
    return Promise.reject(null);
  }

  

  /*zoomifyThinSection(url){
    console.log("showThinSection", id);
        var thinSectionMap = new L.Map('photo'
                  , {crs: L.CRS.Simple, minZoom: -5}
              );
            //.setView(new L.LatLng(0,0), 0);
        var sectionNum = id;
      
        var urlRoot = 'https://data.wgnhs.wisc.edu/lake-superior-legacy/assets/thin-section-images/';
        var photoWidth = 2700;
        var photoHeight = 1800;
        var bounds = [[0,0], [4000,6000]];
    
        var ppl = L.imageOverlay(urlRoot + sectionNum + 'ppl.jpg', bounds).addTo(thinSectionMap);
        var xpl = L.imageOverlay(urlRoot + sectionNum + 'xpl.jpg', bounds);
        
        xpl.setOpacity(0.0).addTo(thinSectionMap);
        thinSectionMap.fitBounds(bounds);

        $("#slider").slider({
            value: 0,
            slide: function (e, ui) {
                xpl.setOpacity(ui.value / 100);
            }
        });

    }*/
}