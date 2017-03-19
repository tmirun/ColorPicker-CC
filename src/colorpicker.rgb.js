import ColorPicker from "./colorpicker";
import SelectorLine from "./selector-line.js"

export default class ColorPickerRgb extends ColorPicker{
  constructor(svg){
    super (svg, {r:255, g:150, b:200});
    this.draw();
    this.initEvents();
  }

  draw(){
    this.redSelector = new SelectorLine(this.paper,
      {x:20, y: 40, height:15, selectorRadius:10, width:200, maxValue:255, value:this.acolor.getRed()});
    this.greenSelector = new SelectorLine(this.paper,
      {x:20, y: 90, height:15, width: 200, maxValue:255, value:this.acolor.getGreen()});
    this.blueSelector = new SelectorLine(this.paper,
      {x:20, y: 140, height:15, width: 200, maxValue:255, value:this.acolor.getBlue()});

    var redGradient = this.paper.gradient("l(0, 0, 1, 0)#000-#f00");
    var greenGradient = this.paper.gradient("l(0, 0, 1, 0)#000-#0f0");
    var blueGradient = this.paper.gradient("l(0, 0, 1, 0)#000-#00f");

    this.redSelector.segments[0].attr({fill:redGradient});
    this.redSelector.marker.attr({fill: `rgb(${this.acolor.getRed()},0,0)`});
    this.greenSelector.segments[0].attr({fill:greenGradient});
    this.greenSelector.marker.attr({fill: `rgb(0,${this.acolor.getGreen()},0)`});
    this.blueSelector.segments[0].attr({fill:blueGradient});
    this.blueSelector.marker.attr({fill: `rgb(0,0,${this.acolor.getBlue()})`});
  }

  initEvents(){
    this.redSelector.onchange = (value) => {
      this.acolor.setRed(value);
      this.redSelector.marker.attr({fill: `rgb(${this.acolor.getRed()},0,0)`});
    };

    this.greenSelector.onchange = (value) => {
      this.acolor.setGreen(value);
      this.greenSelector.marker.attr({fill: `rgb(0,${this.acolor.getGreen()},0)`});
    };

    this.blueSelector.onchange = (value) => {
      this.acolor.setBlue(value);
      this.blueSelector.marker.attr({fill: `rgb(0,0,${this.acolor.getBlue()})`});
    };
  }
}
