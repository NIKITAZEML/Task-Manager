/*!
 * waterflow layout mode for Isotope
 * v1
 */

/*jshint browser: true, devel: false, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( [
        'isotope-layout/js/layout-mode'
      ],
      factory );
  } else if ( typeof exports === 'object' ) {
    // CommonJS
    module.exports = factory(
      require('isotope-layout/js/layout-mode')
    );
  } else {
    // browser global
    factory(
      window.Isotope.LayoutMode
    );
  }

}( window, function factory( LayoutMode ) {
  'use strict';

  var Waterflow = LayoutMode.create('waterflow');
  var proto = Waterflow.prototype;

  proto._resetLayout = function() {
    this.x = 0;
    this.y = 0;
    this.idx = 0;
    this.idxColumn = 0;
    this.columnsHeights = [0];
    this.maxX = 0;
    this.maxY = 0;

    // Calculate statistic to find the best configuration of isotope
    this._FontСoefficient = 12/parseFloat(getComputedStyle(document.documentElement).fontSize);
    this._SumHeight = 0;
    this._SumWidth = 0;
    this.isotope.items.forEach( item => {
      item.getSize();
      this._SumHeight += Math.ceil(item.size.outerHeight);
      this._SumWidth += Math.ceil(item.size.outerWidth);
    });
    this._ItemsCount = this.isotope.items.length
    this._AvgWidth = this._SumWidth / this._ItemsCount;
    this._ColCount = Math.floor( (window.innerWidth-10) / this._AvgWidth);
    this._AvgHeight = this._SumHeight / this._ColCount;
  };

  // Internal function: prepare adding an item to current column
  proto._addToCurrentColumn = function( item ) {
    // Calculate position of current item
    const pos = {
      x: this.x,
      y: this.y
    };
    // Enlarge field for next items
    this.maxX = Math.max( this.maxX, this.x + item.size.outerWidth );
    this.maxY = Math.max( this.maxY, this.y + item.size.outerHeight );
    // Prepare position of next item in current column
    this.y += item.size.outerHeight;
    this.columnsHeights[this.idxColumn] += item.size.outerHeight;
    this.idx++;
    // Return position of current item
    return pos
  };

  // Internal function: prepare adding an item to next column
  proto._addToNextColumn = function( item ) {
    // Change column to next
    this.y = 0;
    this.x = this.maxX;
    // Calculate position of current item
    const pos = {
      x: this.x,
      y: this.y
    };
    // Enlarge field for next items
    this.maxX = Math.max( this.maxX, this.x + item.size.outerWidth );
    this.maxY = Math.max( this.maxY, this.y + item.size.outerHeight );
    // Prepare position of next item in current column
    this.y = item.size.outerHeight;
    this.idxColumn++;
    this.columnsHeights[this.idxColumn] = item.size.outerHeight;
    this.idx++;
    // Return position of current item
    return pos
  };

  proto._getItemLayoutPosition = function( item ) {
    item.getSize();

    var position;
    // If one of these is true:
    // - this is first item in the column
    // - we can add this item to current column, and it height will be less than average
    // - this is last column
    if ( (this.y == 0) ||
         (this.y+item.size.outerHeight <= this._AvgHeight) ||
         (this.idxColumn >= this._ColCount-1) ) {

          // then we add item to current column
          position = this._addToCurrentColumn(item);
          
      } else {
        // Else (if adding another object will overflow the column)
        // we need to think, what is better: add item to current or to next column?
        var j;

        // Calculate the standard deviation if the object appears in the current column
        var remainedHeights=this._SumHeight; // the total heights of the items remaining for distribution by columns
        var remainedAVG=0; //average remaining columns height
        var predictedHeights = new Array(this._ColCount).fill(0); // predicted column heights
        var addToCurrentSD=0; // standard deviation, provided that the current item is added to the current column
        for (j=0; j<this.idxColumn; j++) { predictedHeights[j] = this.columnsHeights[j] }; // Calculate height of columns before current
        predictedHeights[this.idxColumn] = this.columnsHeights[this.idxColumn] + item.size.outerHeight; // Predict current column height
        for (j=this.idxColumn; j>=0; j--) { remainedHeights -= predictedHeights[j] }; // Decrease remaining items height
        remainedAVG = remainedHeights / (this._ColCount-this.idxColumn-1); // Calculate average height of remained columns
        for (j=this.idxColumn+1; j<this._ColCount; j++) { predictedHeights[j] = remainedAVG }; // Predict future columns heights
        for (j=0; j<this._ColCount; j++) { addToCurrentSD = addToCurrentSD + Math.pow(predictedHeights[j]-this._AvgHeight,2) }; // Calculate root mean square
        addToCurrentSD = Math.sqrt(addToCurrentSD/this._ColCount); // Calculate standard deviation

        // Calculate the standard deviation if the object appears in the next column
        var remainedHeights=this._SumHeight; // the total heights of the items remaining for distribution by columns
        var remainedAVG=0; //average remaining columns height
        var predictedHeights=new Array(this._ColCount).fill(0); // predicted column heights
        var addToNextSD=0; // standard deviation, provided that the current item is added to the next column
        for (j=0; j<=this.idxColumn; j++) { predictedHeights[j] = this.columnsHeights[j] }; // Calculate height of columns before current and current
        for (j=this.idxColumn; j>=0; j--) { remainedHeights -= predictedHeights[j] }; // Decrease remaining items height
        remainedAVG = remainedHeights / (this._ColCount-this.idxColumn-1); // Calculate average height of remained columns
        for (j=this.idxColumn+1; j<this._ColCount; j++) { predictedHeights[j] = remainedAVG }; // Predict future columns heights
        for (j=0; j<this._ColCount; j++) { addToNextSD = addToNextSD + Math.pow(predictedHeights[j]-this._AvgHeight,2) }; // Calculate root mean square
        addToNextSD = Math.sqrt(addToNextSD/this._ColCount); // Calculate standard deviation

        // Compare two options
        if (addToCurrentSD>addToNextSD) { 
          position = this._addToNextColumn(item); // Add item to the next column
        } else {
          position = this._addToCurrentColumn(item); // Add item to the current column
        }
      }

    return position;
  };

  proto._getContainerSize = function() {
    return { width: this.maxX, height: this.maxY };
  };

  proto.needsResizeLayout = function() {
    return this.needsVerticalResizeLayout();
  };

  return Waterflow;

}));