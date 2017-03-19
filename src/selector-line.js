import Selector from "./selector";
const defaultParams ={
  direction: "holizontal",
  x: 20,
  y: 20,
  width: 100,
  height: 20,
  markerRadius: 15,
  value: 0,
  maxValue:100,
  minValue:0
};

export default class SelectorLine extends Selector{

  constructor(paper, params){
    super(paper);

    // segemnts properties
    this.direction = "holizontal";
    this.x = 20;
    this.y = 20;
    this.width = 20;
    this.height = 20;
    this.value = 0;
    this.maxValue = 100;
    this.minValue = 0;
    this.segmentNum = 1;

    // marker properties
    this.marker;
    this.markerRadius = 15;

    // private properties
    this._x;
    this._y;

    // replace properties from params
    this._parseParams(params);

    this.draw();
    this.initSelectorEvents();
  }

  draw(){
    let bar, boxWidth, boxHeight;

    switch (this.direction) {

      case "holizontal":

        let boxWidth = this.width/this.segmentsNum;
        for(let i =0; i<this.segmentsNum; i++){
          bar = this.paper.rect( i * boxWidth + this.x, this.y, boxWidth, this.height);
          this.segments.add(bar);
        }

        this.marker = this.paper.circle(this.x + this.value / this.maxValue * this.width,
                                            this.y + this.height/2,
                                            this.markerRadius);
        break;

      case "vertical":

        let boxHeight = this.height/this.segmentsNum;
        for(let i =0; i<this.segmentsNum; i++){
          bar = this.paper.rect(this.x, i * boxHeight + this.y, this.width, boxHeight);
          this.segments.add(bar);
        }

        this.marker = this.paper.circle(this.x + this.width / 2,
                                          this.y + this.value / this.maxValue * this.height,
                                          this.markerRadius);
        break;
    }

    this.group.add(this.segments, this.marker);
  }

  initSelectorEvents(){
    let that = this;


    switch (this.direction) {
      case "holizontal":
        this.group.drag((dx, dy, x, y, event) => dragHandleHolizontal(event),
                        (x, y, event) => dragHandleHolizontal(event),
                        this.ondragend);
        break;
      case "vertical":
        this.group.drag((dx, dy, x, y, event) => dragHandleVertical(event),
                        (x, y, event) => dragHandleVertical(event),
                        this.ondragend);
        break;
    }

    function dragHandleHolizontal (event){
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


    function dragHandleVertical (event){
      if (that._y == event.clientY) return;
      let paperRect = that.paper.node.getBoundingClientRect();
      let relativeSvgPosY = event.clientY - paperRect.top;
      that._y = that._limiteTranslation(relativeSvgPosY);

      that._range = that._normalizeRange(that._y);
      if(that._range !== that._value){
        that.value = that._range;
      }

      that.marker.attr("cy", that._y);
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
        min = elementRect.top - paperRect.top - 1;
        max = elementRect.top + elementRect.height - paperRect.top -1;
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
        offsetY = elementRect.top - paperRect.top - 1;
        range = (positionValue - offsetY) /elementRect.height;
        break;
    }
    return range = parseInt(range*this.maxValue);
  }
}
