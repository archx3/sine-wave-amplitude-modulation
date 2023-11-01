function init() {
  const sliders = document.getElementsByClassName("tick-slider-input");

  for (let slider of sliders) {
    slider.oninput = onSliderInput;

    updateValue(slider);
    updateValuePosition(slider);
    updateLabels(slider);
    updateProgress(slider);

    setTicks(slider);
    insertValueLabels(slider);
  }
}

function onSliderInput(event) {
  updateValue(event.target);
  updateValuePosition(event.target);
  updateLabels(event.target);
  updateProgress(event.target);
}

function updateValue(slider) {
  let value = document.getElementById(slider.dataset.valueId);

  value.innerHTML = "<div>" + slider.value + "</div>";
}

function updateValuePosition(slider) {
  let value = document.getElementById(slider.dataset.valueId);

  const percent = getSliderPercent(slider);

  const sliderWidth = slider.getBoundingClientRect().width;
  const valueWidth = value.getBoundingClientRect().width;
  const handleSize = slider.dataset.handleSize;

  let left = percent * (sliderWidth - handleSize) + handleSize / 2 - valueWidth / 2;

  left = Math.min(left, sliderWidth - valueWidth);
  left = slider.value === slider.min ? 0 : left;

  value.style.left = left + "px";
}

function updateLabels(slider) {
  const value = document.getElementById(slider.dataset.valueId);
  const minLabel = document.getElementById(slider.dataset.minLabelId);
  const maxLabel = document.getElementById(slider.dataset.maxLabelId);

  const valueRect = value.getBoundingClientRect();
  const minLabelRect = minLabel.getBoundingClientRect();
  const maxLabelRect = maxLabel.getBoundingClientRect();

  const minLabelDelta = valueRect.left - (minLabelRect.left);
  const maxLabelDelta = maxLabelRect.left - valueRect.left;

  const deltaThreshold = 32;

  // if (minLabelDelta < deltaThreshold) minLabel.classList.add("hidden");
  // else minLabel.classList.remove("hidden");

  // if (maxLabelDelta < deltaThreshold) maxLabel.classList.add("hidden");
  // else maxLabel.classList.remove("hidden");
}

function updateProgress(slider) {
  let progress = document.getElementById(slider.dataset.progressId);
  const percent = getSliderPercent(slider);

  progress.style.width = percent * 100 + "%";
}

function getSliderPercent(slider) {
  const range = slider.max - slider.min;
  const absValue = slider.value - slider.min;

  return absValue / range;
}

function setTicks(slider) {
  let container = document.getElementById(slider.dataset.tickId);
  const spacing = parseFloat(slider.dataset.tickStep);
  const sliderRange = slider.max - slider.min;
  const tickCount = sliderRange / spacing + 1; // +1 to account for 0

  for (let ii = 0; ii < tickCount; ii++) {
    container.appendChild(createElement("span", {className: "tick-slider-tick major-tick"}));

    if (ii < tickCount - 1) {
      // let's create minor ticks between the major ones
      const MINOR_TICK_COUNT = 4;
      const MINOR_TICK_STEP = spacing / MINOR_TICK_COUNT;

      let i = 0;
      while (i < MINOR_TICK_COUNT) {

        container.appendChild(createElement("span", {className: "tick-slider-tick minor-tick"}));

        i++;
      }
    }
  }
}

weightLabelMin

function insertValueLabels(slider) {
  const CONTAINER = document.getElementById(slider.dataset.valuesContainerId);

  let {min, max, step} = slider;
  min = parseInt(min);
  max = parseInt(max);
  step = parseInt(step);


  let i = min;
  while ( i <= max) {
    CONTAINER.appendChild(createElement("div", {className: "tick-slider-label"}, (i).toString()));
    i = i + step;
  }
}

function onResize () {
  const sliders = document.getElementsByClassName("tick-slider-input");

  for (let slider of sliders) {
    updateValuePosition(slider);
  }
}

window.onload = init;
window.addEventListener("resize", onResize);
