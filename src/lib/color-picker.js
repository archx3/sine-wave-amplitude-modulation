// Get the root element
const ROOT_ELEMENT = document.querySelector(':root');
const ROOT_ELEMENT_STYLES = getComputedStyle(ROOT_ELEMENT);

function getCSSVariableValue (variableName) {
  console.log(ROOT_ELEMENT_STYLES)
  return ROOT_ELEMENT_STYLES.getPropertyValue(variableName);
}

function setCSSVariableValue (variableName, value) {
  ROOT_ELEMENT.style.setProperty(variableName, value);
}

const colorPickerColors = document.querySelector("#color-picker .colors");

let activelyChangingColor = "foreground";

const SET_FOREGROUND_COLOR = document.querySelector(".set-foreground");
const SET_BACKGROUND_COLOR = document.querySelector(".set-background");
const SWAP_COLORS = document.querySelector(".swap-foreground-background");

function createColorPickerColor (color, id) {
  return createElement("div", {
    className: "color",
    ...(id && { id: id }), // if id exists, then add id to props object
    data: { color: color },
    style: {
      backgroundColor: color
    }
  });
}

for (let i = 0; i < 14; i++) {
  colorPickerColors.appendChild(createColorPickerColor(colors[i], `color-${i}`));
}

colorPickerColors.appendChild(createColorPickerColor("#000000", "color-12"));
colorPickerColors.appendChild(createColorPickerColor("#ffffff", "color-12"));


colorPickerColors.onclick = (e) => {
  if (!e.target.classList.contains("color")) return;

  const color = e.target.dataset.color;

  if (activelyChangingColor === "foreground") {
    setForegroundColor(color);

  } else {
    setBackgroundColor(color);
  }

}

// set foreground color css custom property
function setForegroundColor (color) {

  setCSSVariableValue("--foreground-color", color);
  FOREGROUND_COLOR = color;
}

function setBackgroundColor (color) {
  setCSSVariableValue("--background-color", color);
  BACKGROUND_COLOR = color;
}

function swapForegroundBackground () {
  const foregroundColor = getCSSVariableValue("--foreground-color")
  const backgroundColor = getCSSVariableValue("--background-color")

  setForegroundColor(backgroundColor);
  setBackgroundColor(foregroundColor);
}

SET_FOREGROUND_COLOR.onclick = () => {
  activelyChangingColor = "foreground";
  SET_FOREGROUND_COLOR.dataset.active = true;
  SET_BACKGROUND_COLOR.dataset.active = false;
}

SET_BACKGROUND_COLOR.onclick = () => {
  activelyChangingColor = "background";
  SET_FOREGROUND_COLOR.dataset.active = false;
  SET_BACKGROUND_COLOR.dataset.active = true;
}

SWAP_COLORS.onclick = () => {
  swapForegroundBackground();
}


window.onkeyup = ({ key }) => {
  if (key === "d") {
    setBackgroundColor("#000000");
    setForegroundColor("#ffffff");
  }

  if (key === "x") {
    swapForegroundBackground();
  }
}
