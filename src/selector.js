/**
 * Selector base class, init the default properties and methods
 */
export default class Selector{

  /**
   * @param {Snap.paper} paper - Snap paper object.
   * @param {object} params - will replace class properties.
   * @param {object} [defaultParams] -  default params
   */
  constructor(paper, params, defaultParams = {}){

    if(!paper){
      throw new Error('Selector error: shoult pass snap paper object');
    }

    /** @type {Snap.paper} */
    this.paper = paper;

    /** @type {Snap.paper.g} */
    this.group = this.paper.g();

    /** @type {Snap.element} */
    this.marker;

    /**
     * store created elements
     * @type {string}
     */
    this.segments = [];

    /** @type {number} */
    this._value = 0;

    //parsing params
    Object.assign(defaultParams, params);
    Object.assign(this, defaultParams);
  }

  /** @type {number} */
  get value(){ return this._value;}

  /** @type {number} */
  set value(value){
    this._value = value;
    this.onchange(value);
  }

  /**
   * this method must be overridden by sub class.
   * @abstract
   */
  draw(){}

  /**
   * this method must be overridden by sub class.
   * @abstract
   * @param {number} value
   */
  onchange(value){
    console.log(value);
  }
}
