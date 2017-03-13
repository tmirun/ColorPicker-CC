import ColorPicker from "./colorpicker";
import SelectorLine from "./selector-line.js"

export default class ColorPickerRgb extends ColorPicker{
  constructor(svg){
    super (svg);
    this.generateElements();
  }

  generateElements(){
    var redBar = new SelectorLine(this.paper,{x:200, y: 100, height:20, width:200});
    var greenBar = new SelectorLine(this.paper,{x:200, y: 150, height:20, width: 200});
    var blueBar = new SelectorLine(this.paper,{x:200, y: 200, height:20, width: 200});
    redBar.disabled = true;
  }
}
