export default class Selector{
  constructor(paper){
    if(!paper){
      throw new Error('Selector error: shoult pass snap paper object');
    }
    this.paper = paper;
    this.value;
    this._value;
  }
  getElementAbsolutePosition(element){
    var rect = element.getBoundingClientRect();
    return {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY
    }
  }
  onchange(value){
    console.log(value);
  }

  set value(value){
    this.onchange(value);
  }
}
