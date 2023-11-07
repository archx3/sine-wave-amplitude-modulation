import useAppContext from "@/component/hooks/use-app";
import { useEffect, useState } from "react";
import { ColorSwatch } from "@/component/components/color-picker/ColorSwatch";
import {SwatchColor} from "@/component/components/color-picker/SwatchColor";

export default function ColorPicker () {
  const { FOREGROUND_COLOR, BACKGROUND_COLOR, setForegroundColor, setBackgroundColor, swapForegroundBackground } = useAppContext();

  const [state, setState] = useState({
    ACTIVE_CHANGING_COLOR: "foreground",
    ACTIVE_FOREGROUND_COLOR_INDEX: 0,
    ACTIVE_BACKGROUND_COLOR_INDEX: 0,
  });

  function setColor (color: string) {
    if (state.ACTIVE_CHANGING_COLOR === "foreground") {
      setForegroundColor(color);
      setState({ ...state, });
    } else {
      setBackgroundColor(color);
      setState({ ...state, });
    }
  }

  useEffect(() => {
    window.addEventListener("keyup", ({ key }) => {
      switch (key) {
        case "f":
          setState({ ...state, ACTIVE_CHANGING_COLOR: "foreground" });
          break;
        case "b":
          setState({ ...state, ACTIVE_CHANGING_COLOR: "background" });
          break;
        case "x":
          swapForegroundBackground();
          break;
        case "d":
          setForegroundColor("#ffffff");
          setBackgroundColor("#000000");
          break;
      }
    });

    return () => {
      window.removeEventListener("keyup", () => {});
    }
  }, [])

  return (
    <div className="color-picker" id="color-picker">
      <ColorSwatch setColor={setColor}/>
      <div className="color-tools">
        <SwatchColor
          color={FOREGROUND_COLOR}
          style={{
            ...(state.ACTIVE_CHANGING_COLOR === "foreground" ? { backgroundImage : 'url(/img/tick.svg)',
            border : '2px solid #fff'} : {})
          }}
          className="set-foreground"
          onClick={() => {
          setState({ ...state, ACTIVE_CHANGING_COLOR: "foreground" });
        }}/>
        <SwatchColor color={BACKGROUND_COLOR} className="set-background" onClick={() => {
          setState({ ...state, ACTIVE_CHANGING_COLOR: "background" });
        }}>
          {
            state.ACTIVE_CHANGING_COLOR === "background" && <img src="/img/tick.svg" alt="tick mark"/>
          }
        </SwatchColor>

        <div className="swap-foreground-background" onClick={swapForegroundBackground}>
          <SwatchColor color={FOREGROUND_COLOR} className="foreground"/>
          <SwatchColor color={BACKGROUND_COLOR} className="background"/>
        </div>
      </div>


    </div>
  )
}
