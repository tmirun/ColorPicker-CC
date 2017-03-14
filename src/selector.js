export default class Selector{
  constructor(paper, params, defaultParams = {}){
    if(!paper){
      throw new Error('Selector error: shoult pass snap paper object');
    }
    this.paper = paper;
    this.group = this.paper.g();
    this.value;
    this._value = 0;

    Object.assign(defaultParams, params);
    Object.assign(this, defaultParams);
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

  get value(){
    return this._value;
  }

  set value(value){
    this._value = value;
    this.onchange(value);
  }
}
