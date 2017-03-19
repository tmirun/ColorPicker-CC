import * as aColor from "acolorjs";

let defaultColor = "#ff0000";

export default class ColorPicker{
  constructor(parentElement, color = defaultColor){
    // initialize parent Element
    this.parentElement = null;
    if(typeof parentElement === "string" && parentElement.charAt(0)=="#"){
      this.parentElement = document.querySelector(parentElement);
    } else if(typeof parentElement === "string" && parentElement.nodeName){
      this.parentElement = parentElement;
    }
    if(!this.parentElement){
      throw new Error('SVG error: shoult pass id with # or DOM object');
    }

    this.acolor = new aColor(color);

    this.svg = null;
    this.group = null;
    this.svgWidth = 250;
    this.svgHeight = 200;

    this.generateSvg();
    this.paper = Snap(this.svg);
  }

  generateSvg(){
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute('style', 'border: 1px solid black');
    this.svg.setAttribute('width', this.svgWidth);
    this.svg.setAttribute('height', this.svgHeight);
    this.parentElement.appendChild(this.svg);
    return this.svg;
  }
}
