function createElement(tag, props, ...children) {
  const ELEMENT = Object.assign(document.createElement(tag), props);

  for (let child of children) {
    if (typeof child === "string") {
      ELEMENT.appendChild(document.createTextNode(child));
    } else {
      ELEMENT.appendChild(child);
    }
  }

  if (props.data) {
    for (key in props.data) {
      ELEMENT.dataset[key] = props.data[key];
    }
  }

  for (key in props.style) {
    ELEMENT.style[key] = props.style[key]
  }

  return ELEMENT;
}

const colors = [
  "#8D83EF", // 0
  "#AE69F0", // 1
  "#D46FF1",
  "#DB5AE7", // 3
  "#D911DA",
  "#D601CB", // 5
  "#E713BF",
  "#F24CAE", // 7
  "#FB79AB",
  "#FFB6C1", // 9
  "#D0E7F5",
  "#D9E7F4",
  "#D6E3F4",
  "#BCDFF5",
  "#B7D9F4",
  "#C3D4F0",
  "#9DC1F3",
  "#9AA9F4",
  "#FED2CF",
  "#FDDFD5",
  "#FEDCD1"
];

const SETTINGS = {
  VERTICAL_DIVISIONS: 21,
}




