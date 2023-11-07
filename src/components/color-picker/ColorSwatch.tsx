import { useState } from "react";
import { SwatchColor } from "@/component/components/color-picker/SwatchColor";

const colorPallets = {
  DEFAULT: [
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
  ]
}

function PalletSelector ({pallet, setActivePallet} : {pallet : string[], activePallet : string, setActivePallet : (pallet : string) => void}) {
  const colors = []
  for (let i = 0; i < 3; i++) {
    colors.push(
      <SwatchColor
        key={i}
        color={pallet[i]}
        style={{
          border : '2px solid #fff',
          borderRadius : '50%'
        }}
      />
    )
  }
  return (
    <div className={"pallet-selector"}>
      {colors}
    </div>
  )
}

export function ColorSwatch ({setColor} : {setColor : (color : string) => void}) {
  const [state, setState] = useState({
    ACTIVE_CHANGING_COLOR: "foreground",
    ACTIVE_FOREGROUND_COLOR_INDEX: 0,
    ACTIVE_BACKGROUND_COLOR_INDEX: 0,
    COLOR_PALLET: colorPallets.DEFAULT
  });

  const MAX_COLOR_PALLET_INDEX = 13;

  const PER_ROW = 4;
  const CELL_SIZE = 20;

  function renderColorPallet () {
    const colors = [];
    let limit = state.COLOR_PALLET.length - 1;
    limit = limit > MAX_COLOR_PALLET_INDEX ? MAX_COLOR_PALLET_INDEX : limit;

    let i = 0;
    for (; i <=limit; i++) {
      const color = state.COLOR_PALLET[i];

      colors.push(
        <SwatchColor
          key={i}
          color={color}
          onClick={() => {
            setColor(color);
          }}
        />
      )
    }

    colors.push(<SwatchColor color={"#ffffff"} key={i+1} onClick={() => {setColor("#ffffff");}}/>);
    colors.push(<SwatchColor color={"#000000"} key={i+2} onClick={() => {setColor("#000000");}}/>);

    return colors;
  }

  return (
    <div className={"colors "}>
      {renderColorPallet()}

      <div className="pallets">

      </div>
      <style jsx>
        {`
          .colors {
            display: flex;
            width: calc(${PER_ROW * CELL_SIZE + PER_ROW * 2}px);
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
          }
        `}
      </style>
    </div>
  )
}
