import { ChangeEvent, useEffect, useRef, useState } from "react";


function computeSliderPercentage ({ min, max, value }: { min: number, max: number, value: number }) {
  // const range = max - min;
  // const absValue = value - min;

  return (value - min) / (max - min);
}

interface ValuePosition {
  min: number,
  value: number,
  percentage: number,
  sliderWidth: number,
  valueWidth: number,
  handleSize: number
}

function getValuePosition ({ min, value, percentage, sliderWidth, valueWidth, handleSize }: ValuePosition) {
  let left = percentage * (sliderWidth - handleSize) + handleSize / 2 - valueWidth / 2;

  left = Math.min(left, sliderWidth - valueWidth);
  left = value === min ? 0 : left;

  return left;
}

interface RangeSliderProps {
  min?: number,
  max?: number,
  value?: number,
  step?: number,
  name?: string,
  onChange?: (name: string, value: number, e: ChangeEvent) => void
}

export default function GraduatedRangeSlider (props: RangeSliderProps) {
  const { min = 0, max = 50, step = 1, value = 0, name = "dasd", onChange } = props;
  const sliderInputRef = useRef<HTMLInputElement>(null);
  const valueLabelRef = useRef<HTMLDivElement>(null);

  // let create a state variable for the slider value
  // let's call it sliderValue
  // let's set the initial value to the value prop

  const [state, setState] = useState({
    sliderValue: value,
    width: 0,
    valueLabelWidth: 0,
    valueLabelPosition: 0,
    percentage: 0
  });

  useEffect(() => {
    setState({ ...state, sliderValue: value })
  }, [value]);

  const tickStep = 10;
  const tickId = "weightTicks";
  const valueId = "weightValue";
  const valuesContainerId = "weightValues";
  const progressId = "weightProgress";
  const handleSize = 18;
  const minLabelId = "weightLabelMin";
  const maxLabelId = "weightLabelMax";


  useEffect(() => {
    const slider = sliderInputRef.current;
    const valueLabel = valueLabelRef.current;

    const percentage = computeSliderPercentage({ min, max, value });

    setState({
      ...state,
      percentage,
      width: slider?.getBoundingClientRect().width || 0,
      valueLabelWidth: valueLabel?.getBoundingClientRect().width || 0,
      valueLabelPosition: getValuePosition({
        min,
        percentage,
        value: state.sliderValue,
        sliderWidth: state.width,
        valueWidth: state.valueLabelWidth,
        handleSize
      })
    });
  }, []);

  function updateSliderValue (value: number) {
    const percentage = computeSliderPercentage({ min, max, value });

    setState({
      ...state,
      sliderValue: value,
      percentage,
      valueLabelPosition: getValuePosition({
        min,
        percentage,
        value: value,
        sliderWidth: state.width,
        valueWidth: state.valueLabelWidth,
        handleSize
      })
    });
  }

  function handleSliderInputChange (e: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.currentTarget.value, 10);
    const valueLabel = valueLabelRef.current;

    updateSliderValue(value);

    if (onChange) {
      onChange(name, value, e);
    }
  }

  function insertValueLabels () {
    const CONTAINER = [];

    let i = min;
    while (i <= max) {
      CONTAINER.push(<div className={"tick-slider-label"} key={i} onClick={()=> {
        console.log({i })
        updateSliderValue(i);
      }}>{i}</div>);
      i = i + step;
    }

    return CONTAINER;
  }

  function createTicks () {
    let container = [];

    const spacing = step
    const sliderRange = max - min;
    const tickCount = sliderRange / spacing + 1; // +1 to account for 0

    for (let i = 0; i < tickCount; i++) {
      container.push(<span className={"tick-slider-tick major-tick"} key={i}/>);

      if (i < tickCount - 1) {
        // let's create minor ticks between the major ones
        const MINOR_TICK_COUNT = 4;
        const MINOR_TICK_STEP = spacing / MINOR_TICK_COUNT;

        let j = 0;
        while (j < MINOR_TICK_COUNT) {

          container.push(<span className="tick-slider-tick minor-tick" key={`${i}-${j}`}/>);

          j++;
        }
      }
    }

    return container;
  }

  return (
    <div className="waves-slider">
      <div className="tick-slider">
        <div className="tick-slider-value-container" id="weightValues">
          <div id="weightLabelMin" className="tick-slider-label min"></div>
          <div id="weightLabelMax" className="tick-slider-label max"></div>
          {insertValueLabels()}
          <div ref={valueLabelRef} id="weightValue" className="tick-slider-value"
               style={{ left: state.valueLabelPosition }}>
            {state.sliderValue}
          </div>
        </div>

        <div className="handles">
          <div id="weightProgress" className="tick-slider-progress"
               style={{ width: `${state.percentage * 100}%` }}
          />
          <div id="weightTicks" className="tick-slider-tick-container">
            {createTicks()}
          </div>
          <input
            ref={sliderInputRef}
            onChange={handleSliderInputChange}
            id="waves-count"
            className="tick-slider-input"
            type="range"
            min={min}
            max={max}
            step={step}
            value={state.sliderValue}
            data-tick-step={tickStep}
            data-tick-id="weightTicks"
            data-value-id="weightValue"
            data-values-container-id="weightValues"
            data-progress-id="weightProgress"
            data-handle-size={handleSize}
            data-min-label-id="weightLabelMin"
            data-max-label-id="weightLabelMax"
          />
        </div>
      </div>
    </div>
  )
}
