import {useContext} from "react";

import {AppContext} from "../contexts/app-context";

export default function useAppContext() {
  const [store, dispatch] = useContext(AppContext);

  return {
    store,
    dispatch,
    WIDTH: store.WIDTH,
    HEIGHT: store.HEIGHT,
    VERTICAL_DIVISIONS: store.VERTICAL_DIVISIONS,
    VERTICAL_DIVISION_HEIGHT: store.VERTICAL_DIVISION_HEIGHT,
    FREQUENCY: store.FREQUENCY,
    PHASE: store.PHASE,
    MAX_AMPLITUDE: store.MAX_AMPLITUDE,
    FOREGROUND_COLOR: store.FOREGROUND_COLOR,
    BACKGROUND_COLOR: store.BACKGROUND_COLOR,
    frameCount: store.frameCount,

    setWidth: (payload) => {
      dispatch({type: 'SET_WIDTH', payload});
    },
    setHeight: (payload) => {
      dispatch({type: 'SET_HEIGHT', payload});
    },
    setVerticalDivisions: (payload) => {
      dispatch({type: 'SET_VERTICAL_DIVISIONS', payload});
    },
    setVerticalDivisionHeight: (payload) => {
      dispatch({type: 'SET_VERTICAL_DIVISION_HEIGHT', payload});
    },
    setFrequency: (payload) => {
      dispatch({type: 'SET_FREQUENCY', payload});
    },
    setMaxAmplitude: (payload) => {
      dispatch({type: 'SET_MAX_AMPLITUDE', payload});
    },
    setFrameCount: (payload) => {
      dispatch({type: 'SET_FRAME_COUNT', payload});
    },
    setPhase: (payload) => {
      dispatch({type: 'SET_PHASE', payload});
    },
    setForegroundColor: (payload) => {
      dispatch({type: 'SET_FOREGROUND_COLOR', payload});
    },
    setBackgroundColor: (payload) => {
      dispatch({type: 'SET_BACKGROUND_COLOR', payload});
    },
    swapForegroundBackground: () => {
      dispatch({type: 'SWAP_FOREGROUND_BACKGROUND'});
    },
  }
}
