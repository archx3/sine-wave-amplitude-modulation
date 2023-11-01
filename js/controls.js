const CONTROL_STRIP = document.querySelector(".control-strip");
const WAVE_SLIDER = document.querySelector(".waves-slider");
const COLOR_PICKER = document.querySelector(".color-picker");

const PICK_COLOR = document.querySelector(".pick-color");
const CHOOSE_WAVES_COUNT = document.querySelector(".choose-waves-count");

const WAVE_SLIDER_INPUT = document.querySelector("#waves-count");

PICK_COLOR.onclick = () => {
  COLOR_PICKER.style.display = "flex";
  WAVE_SLIDER.style.display = "none";
}

CHOOSE_WAVES_COUNT.onclick = () => {
  WAVE_SLIDER.style.display = "block";
  COLOR_PICKER.style.display = "none";
}

WAVE_SLIDER_INPUT.onchange = (e) => {
  VERTICAL_DIVISIONS = parseInt(e.target.value, 10);
}
