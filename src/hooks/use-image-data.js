import {useContext} from "react";

import {ImageDataContext} from "../contexts/image-data-context";

export default function useImageDataContext() {
  const [store, dispatch] = useContext(ImageDataContext);

  return {
    store,
    dispatch,
    loading: store.loading,
    error: store.error,
    image: store.image,
    pixelArray: store.pixelArray,
    compressedPixelArray: store.compressedPixelArray,
    G : store.compressedPixelArray,

    setImage: (payload) => {
      dispatch({type: 'SET_IMAGE', payload});
    },
    setPixelArray: (payload) => {
      dispatch({type: 'SET_PIXEL_ARRAY', payload});
    },
    setCompressedPixelArray: (payload) => {
      dispatch({type: 'SET_COMPRESSED_PIXEL_ARRAY', payload});
    },
    setLoading: (payload) => {
      dispatch({type: 'SET_LOADING', payload});
    },
    setError: (payload) => {
      dispatch({type: 'SET_ERROR', payload});
    },
  }
}
