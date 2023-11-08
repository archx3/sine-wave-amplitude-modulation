import { createContext, useReducer } from 'react';

const initialState = {
  WIDTH: 800,
  HEIGHT: 800,
  VERTICAL_DIVISIONS: 60,
  VERTICAL_DIVISION_HEIGHT: 800 / 60,

  PHASE : 0,
  FREQUENCY: 150,
  MAX_AMPLITUDE: 800 / 60 / 3,

  FOREGROUND_COLOR: "#ffffff",
  BACKGROUND_COLOR: "#000000",

  SWATCH_COLOR_PALETTE: "DEFAULT",

  frameCount: 0,
};

export const AppContext = createContext(initialState);

export function AppContextProvider ({ children }) {
  function reducer (state, action) {
    const { type :ACTION_TYPE, payload } = action;

    switch (ACTION_TYPE) {
      case 'SET_WIDTH':
        return { ...state, WIDTH: payload };
      case 'SET_HEIGHT':
        return {
          ...state,
          HEIGHT: payload,
          VERTICAL_DIVISION_HEIGHT: payload / state.VERTICAL_DIVISIONS,
          MAX_AMPLITUDE: payload / state.VERTICAL_DIVISIONS / 3
        };
      case 'SET_VERTICAL_DIVISIONS':
        return {
          ...state,
          VERTICAL_DIVISIONS: payload,
          VERTICAL_DIVISION_HEIGHT: state.HEIGHT / payload,
          MAX_AMPLITUDE: state.HEIGHT / payload / 3
        };
      case 'SET_VERTICAL_DIVISION_HEIGHT':
        return { ...state, VERTICAL_DIVISION_HEIGHT: payload };
      case 'SET_FREQUENCY':
        return { ...state, FREQUENCY: payload };
      case 'SET_MAX_AMPLITUDE':
        return { ...state, MAX_AMPLITUDE: payload };
      case 'SET_FRAME_COUNT':
        return { ...state, frameCount: payload };
      case 'SET_FOREGROUND_COLOR':
        return { ...state, FOREGROUND_COLOR: payload };
      case 'SET_BACKGROUND_COLOR':
        return { ...state, BACKGROUND_COLOR: payload };
      case 'SWAP_FOREGROUND_BACKGROUND':
        return {
          ...state,
          FOREGROUND_COLOR: state.BACKGROUND_COLOR,
          BACKGROUND_COLOR: state.FOREGROUND_COLOR
        };
      case 'SET_SWATCH_COLOR_PALETTE':
        return { ...state, SWATCH_COLOR_PALETTE: payload };
      default:
        throw new Error("App Context Error: Invalid action type.");
    }
  }

  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[store, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}

export const AppConsumer = AppContext.Consumer;

export default AppContext;


