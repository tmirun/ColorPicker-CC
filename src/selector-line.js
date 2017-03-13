import Selector from "./selector";
var defaultParams ={
  direction: "holizontal",
  x: 20,
  y: 20,
  width: 200,
  height: 20,
  selectorRadius: 15,
  value: 0,
  maxValue:100,
  minValue:0
};

export default class SelectorLine extends Selector{
  constructor(paper, params){
    super(paper);

    this._x;
    this._y;

    this.paper = paper;

    Object.assign(defaultParams, params);

    Object.assign(this,defaultParams);

    console.log(this);

    this.bar = this.paper.rect(this.x, this.y, this.width, this.height);

    this.selector = this.paper.circle(this.x + this.value, this.y + this.height/2, this.selectorRadius);
    this.selector.attr({fill:"red"});

    this.initSelectorEvents();
  }

  initSelectorEvents(){
    let that = this;

    this.selector.drag((dx, dy, x, y, event) => dragHandle(event),
                        (x, y, event) => dragHandle(event),
                        this.ondragend);

    this.bar.drag((dx, dy, x, y, event) => dragHandle(event),
                  (x, y, event) => dragHandle(event),
                  this.ondragend);

    function dragHandle (event){
      if (that._x == event.clientX && that._y == event.clientY) return;
      let paperRect = that.paper.node.getBoundingClientRect();
      let relativeSvgPosX = event.clientX-paperRect.left;
      that._x = that.limiteTranslation(relativeSvgPosX);
      that._y = event.clientY;

      that._range = that.normalizeRange(that._x);
      if(that._range !== that._value){
        that.value = that._range;
      }

      that.selector.attr("cx", that._x);
    }
  }

  limiteTranslation(value){
    let max, min;
    let barRect = this.bar.node.getBoundingClientRect();
    let paperRect = this.paper.node.getBoundingClientRect();
    switch (this.direction) {
      case "holizontal":
        min = barRect.left - paperRect.left - 1;
        max = barRect.left + barRect.width - paperRect.left -1;
        break;
      case "vertical":

        break;
    }
    if(value > max) return max;
    if(value < min) return min;
    return value;
  }

  normalizeRange(positionValue){
    let barRect = this.bar.node.getBoundingClientRect();
    let paperRect = this.paper.node.getBoundingClientRect();
    let range, offsetX, offsetY;
    switch (this.direction) {
      case "holizontal":
        offsetX = barRect.left - paperRect.left - 1;
        range = (positionValue - offsetX) /barRect.width;
        break;
      case "vertical":
        break;
    }
    return range = parseInt(range*100)/100;
  }
}
