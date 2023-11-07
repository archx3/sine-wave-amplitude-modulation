import React from "react";
import GraduatedRangeSlider from "@/component/components/graduated-range-slider";
import Toolbox from "@/component/components/toolbox";
import ColorPicker from "@/component/components/color-picker/color-picker";
import useAppContext from "@/component/hooks/use-app";
import classes from "classnames";

export default function ControlPanel () {
  const {setVerticalDivisions} = useAppContext();
  const [state, setState] = React.useState({
    ACTIVE_TOOL: "",
  });

  function setActiveTool (tool: string) {
    setState({ ...state, ACTIVE_TOOL: tool });
  }

  return (
    <div className={"control-panel"}>
      <div className={classes(`tool-controls-strip`, {'d-none' : state.ACTIVE_TOOL === ""})}>
        {
          state.ACTIVE_TOOL === "color-picker" && <ColorPicker/>
        }
        {
          state.ACTIVE_TOOL === "range-slider" ?
            <GraduatedRangeSlider
              min={20}
              max={65}
              step={5}
              value={60}
              name={"waves-count"}
              onChange={(name, value) => {
                setVerticalDivisions(value);
              }}
            />
            : null
        }
      </div>
      <Toolbox setActiveTool={setActiveTool}/>
    </div>
  )
}
