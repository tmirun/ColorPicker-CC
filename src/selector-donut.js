import Selector from "./selector";
import {customArc, angleBetween2Points} from "./utils";

var defaultParams ={
  cx: 100,
  cy: 100,
  radius: 40,
  width: 20,
  markerRadius: 15,
  segmentsNum: 12,
  initRotation: 15,
  value: 0
};

export default class SelectorDonut extends Selector{

  constructor(paper, params){
    super(paper, params, defaultParams);
    this.draw();
    this.initSelectorEvents();
  }

  draw(){
    var segmentsAngle = 360/this.segmentsNum;
    for (let i = 0; i < this.segmentsNum; i++){
      let segment = this.paper.path(customArc(this.cx, this.cy, segmentsAngle, this.radius, this.width));
      segment.transform(`r${segmentsAngle*i},${this.cx},${this.cy}`);
      this.segments.add(segment);
    }
    this.marker = this.paper.circle(this.cx, this.cy - this.radius - this.width/2, this.markerRadius);
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
      let relativeSvgPosX = event.clientX - paperRect.left;
      let relativeSvgPosY = event.clientY - paperRect.top;
      that._angle = angleBetween2Points(that.cx, that.cy, relativeSvgPosX, relativeSvgPosY);
      that._angle = parseInt(that._angle);

      if(that._angle !== that._value){
        that.value = that._angle;
      }
      that.marker.transform(`r${that.value},${that.cx},${that.cy}`);
    }
  }
}
