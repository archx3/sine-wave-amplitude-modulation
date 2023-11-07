import { createContext, useReducer } from "react";

const initialState = {
  loaded : false,
  loading : true,
  error : false,
  image: null,
  pixelArray: null,
  compressedPixelArray: null,
}

export const ImageDataContext = createContext(null);

export function ImageDataContextProvider ({ children }) {
  function reducer (state, action) {
    const { type :ACTION_TYPE, payload } = action;

    switch (ACTION_TYPE) {
      case 'SET_IMAGE':
        return { ...state, image: payload };
      case 'SET_PIXEL_ARRAY':
        return { ...state, pixelArray: payload };
      case 'SET_COMPRESSED_PIXEL_ARRAY':
        return { ...state, compressedPixelArray: payload };
      case 'SET_LOADED':
        return { ...state, loaded: payload };
      case 'SET_LOADING':
        return { ...state, loading: payload };
      case 'SET_ERROR':
        return { ...state, error: payload };
      default:
        throw new Error();
    }
  }

  const [store, dispatch] = useReducer(reducer, initialState)

  return (
    <ImageDataContext.Provider value={[store, dispatch]}>
      {children}
    </ImageDataContext.Provider>
  );
}

export default ImageDataContext;
