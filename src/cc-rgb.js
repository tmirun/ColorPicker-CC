import ColorPicker from "ColorPicker";

class ColorPickerRgb extends ColorPicker{
  constructor(svg){
    super(svg);
    Snap(svg);
    console.log(Snap);
  }
}
