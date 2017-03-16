import Selector from "./selector";
var defaultParams ={
  direction: "holizontal",
  x: 20,
  y: 20,
  width: 200,
  height: 20,
  markerRadius: 15,
  value: 0,
  maxValue:100,
  minValue:0
};

export default class SelectorLine extends Selector{
  constructor(paper, params){
    super(paper, params, defaultParams);

    this.marker;
    this.width;
    this.height;
    this.markerRadius;
    this.value;
    this.maxValue;
    this.minValue;
    this._x;
    this._y;

    this.draw();
    this.initSelectorEvents();
  }

  draw(){
    var bar = this.paper.rect(this.x, this.y, this.width, this.height);
    this.segments.add(bar);

    switch (this.direction) {
      case "holizontal":
        this.marker = this.paper.circle(this.x + this.value / this.maxValue * this.width,
                                            this.y + this.height/2,
                                            this.markerRadius);
        break;
      case "vertical":
        this.marker = this.paper.circle(this.x + this.width / 2,
                                          this.y + this.value / this.maxValue * this.height,
                                          this.markerRadius);
        break;
    }

    this.group.add(this.segments, this.marker);
  }

  initSelectorEvents(){
    let that = this;

    this.group.drag((dx, dy, x, y, event) => dragHandle(event),
                        (x, y, event) => dragHandle(event),
                        this.ondragend);

    function dragHandle (event){
      if (that._x == event.clientX && that._y == event.clientY) return;
      let paperRect = that.paper.node.getBoundingClientRect();
      let relativeSvgPosX = event.clientX-paperRect.left;
      that._x = that._limiteTranslation(relativeSvgPosX);
      that._y = event.clientY;

      that._range = that._normalizeRange(that._x);
      if(that._range !== that._value){
        that.value = that._range;
      }

      that.marker.attr("cx", that._x);
    }
  }

  /**
   * @private
   */
  _limiteTranslation(value){
    let max, min;
    let elementRect = this.segments.node.getBoundingClientRect();
    let paperRect = this.paper.node.getBoundingClientRect();
    switch (this.direction) {
      case "holizontal":
        min = elementRect.left - paperRect.left - 1;
        max = elementRect.left + elementRect.width - paperRect.left -1;
        break;
      case "vertical":

        break;
    }
    if(value > max) return max;
    if(value < min) return min;
    return value;
  }

  /**
   * @private
   */
  _normalizeRange(positionValue){
    let elementRect = this.segments.node.getBoundingClientRect();
    let paperRect = this.paper.node.getBoundingClientRect();
    let range, offsetX, offsetY;
    switch (this.direction) {
      case "holizontal":
        offsetX = elementRect.left - paperRect.left - 1;
        range = (positionValue - offsetX) /elementRect.width;
        break;
      case "vertical":
        break;
    }
    return range = parseInt(range*this.maxValue);
  }
}
