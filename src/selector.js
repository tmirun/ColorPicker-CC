export default class Selector{

  constructor(paper, params, defaultParams = {}){
    
    if(!paper){
      throw new Error('Selector error: shoult pass snap paper object');
    }

    //define varibales;
    this.paper = paper;
    this.group = this.paper.g();
    this._value = 0;
    this.selector;

    //parsing params
    Object.assign(defaultParams, params);
    Object.assign(this, defaultParams);
  }

  get value(){
    return this._value;
  }

  set value(value){
    this._value = value;
    this.onchange(value);
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
}
