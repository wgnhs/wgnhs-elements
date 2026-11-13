const pdfjsLib = window['pdfjs-dist/build/pdf'];

export class PDFRenderer {
  render(url) {
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
    return Promise.reject(null);
  }
}