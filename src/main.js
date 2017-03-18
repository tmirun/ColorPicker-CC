import {customArc} from "./utils";
import aColor from "acolorjs";

let paper = Snap("#jumbotron-svg");

let segmentsShadow = paper.g();
let segments = paper.g();

let cx = 200;
let cy = 200;
let width = 30;
let radius = 150;
let segmentsNum = 12;
let segmentsAngle = 360/segmentsNum;
let separation = 10;
let acolor = new aColor({h:0, s:100, l:65});

for (let i = 0; i < segmentsNum; i++){
  acolor.setHslHue(segmentsAngle*i);
  let segmentShadow = paper.path(customArc(cx, cy, segmentsAngle - separation, radius, width));
  segmentShadow.transform(`r${segmentsAngle*i - segmentsAngle/2 + separation/2},${cx},${cy}`);
  let segment = segmentShadow.clone();
  segment.attr({fill:acolor.toHex(), stroke:acolor.toHex(), "stroke-width":3});
  segmentShadow.attr({fill:"#aaa"});
  segmentsShadow.add(segmentShadow);
  segments.add(segment);
}

segmentsShadow.transform("t-10,10");
