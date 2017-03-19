import ColorPicker from "./colorpicker";
import SelectorDonut from "./selector-donut";
import SelectorLine from "./selector-line";

let defaultColor = "#ff0000";

export default class ColorPickerHsl extends ColorPicker{
  constructor(svg){
    super (svg, {r:255, g:0, b:0});
    this.hueSelector;
    this.satSelector;
    this.ligSelector;

    this.hueMarkerColor = this.acolor.clone();
    this.satMarkerColor = this.acolor.clone();
    this.ligMarkerColor = this.acolor.clone();

    this.hueSegmentsNum = 24;
    this.draw();
    this.initEvents();
  }

  draw(){
    this.hueSelector = new SelectorDonut(this.paper, { cx: 85,
                                                      cy: 100,
                                                      radius: 60,
                                                      width: 10,
                                                      markerRadius: 10,
                                                      segmentsNum: this.hueSegmentsNum,
                                                      value: this.acolor.getHslHue()
                                                      });

    this.satSelector = new SelectorLine(this.paper, {direction:"vertical",
                                                      x: 170,
                                                      y: 25,
                                                      width:10,
                                                      markerRadius: 10,
                                                      height:150,
                                                      value: 100-this.acolor.getHslSat()});

    this.ligSelector = new SelectorLine(this.paper, {direction:"vertical",
                                                      x: 200,
                                                      y: 25,
                                                      width:10,
                                                      markerRadius: 10,
                                                      segmentsNum: 2,
                                                      height:150,
                                                      value: 100-this.acolor.getHslLig()});
    this.initHueColor();
    this.initSatColor();
    this.initLigColor();
    this.refreshHueMarkerColor(this.acolor.getHslHue());
    this.refreshSatMarkerColor(this.acolor.getHslSat());
    this.refreshLigMarkerColor(this.acolor.getHslLig());
  }

  refreshHueMarkerColor(value){
    this.hueMarkerColor.setHslHue(value);
    this.hueSelector.marker.attr({fill: this.hueMarkerColor.toRgbString()});
  }

  refreshSatMarkerColor(value){
    this.satMarkerColor.setHslSat(value);
    this.satSelector.marker.attr({fill: this.satMarkerColor.toRgbString()});
  }

  refreshLigMarkerColor(value){
    this.ligMarkerColor.setHslLig(value);
    this.ligSelector.marker.attr({fill: this.ligMarkerColor.toRgbString()});
  }

  initEvents(){
    this.hueSelector.onchange = (value) => {
      this.acolor.setHslHue(value);
      this.refreshHueMarkerColor(value);
    };

    this.satSelector.onchange = (value) => {
      value = 100-value;
      this.acolor.setHslSat(value);
      this.refreshSatMarkerColor(value);
    };

    this.ligSelector.onchange = (value) => {
      value = 100-value;
      this.acolor.setHslLig(value);
      this.refreshLigMarkerColor(value);
    };
  }

  initHueColor(){
    let initAcolor = this.acolor.clone().setHslLig(50).setHslSat(100);
    let endAcolor = initAcolor.clone();
    let gradient;
    for (let i = 0;  i< this.hueSegmentsNum ; i++) {
      initAcolor.setHslHue(i * 360/ this.hueSegmentsNum );
      endAcolor.setHslHue((i+1) * 360/ this.hueSegmentsNum );
      gradient = this.paper.gradient(`l(0, 0, 1, 0)${initAcolor.toHex()}-${endAcolor.toHex()}`);
      this.hueSelector.segments[i].attr({fill:gradient, stroke:gradient, "stroke-width":1})
    }
  }

  initSatColor(){
    let initAcolor = this.acolor.clone();
    initAcolor.setHslSat(100).setHslLig(50);

    let endAcolor = this.acolor.clone();
    endAcolor.setHslSat(0).setHslLig(50);

    var satGradient = this.paper.gradient(`l(0, 0, 0, 1)${initAcolor.toHslPercentage()}-${endAcolor.toHslPercentage()}`);
    this.satSelector.segments[0].attr({fill:satGradient});
  }

  initLigColor(){
    let initAcolor = this.acolor.clone();
    initAcolor.setHslLig(100);

    let middleAcolor = this.acolor.clone();
    middleAcolor.setHslLig(50);

    let endAcolor = this.acolor.clone();
    endAcolor.setHslLig(0);

    var ligGradient1 = this.paper.gradient(`l(0, 0, 0, 1)${initAcolor.toHslPercentage()}-${middleAcolor.toHslPercentage()}`);

    var ligGradient2 = this.paper.gradient(`l(0, 0, 0, 1)${middleAcolor.toHslPercentage()}-${endAcolor.toHslPercentage()}`);

    this.ligSelector.segments[0].attr({fill:ligGradient1});
    this.ligSelector.segments[1].attr({fill:ligGradient2});
  }


}
