import { useEffect, useReducer, useState } from "react";
import Canvas from "@/component/components/canvas/canvas";
import useImageDataContext from "@/component/hooks/use-image-data";
import ControlPanel from "@/component/components/control-panel";

/**
 * Creates a shadow canvas from an image.
 * @param image {CanvasImageSource}
 * @returns {{COMPRESSED_PIXELS: unknown[], PIXEL_CANVAS: HTMLCanvasElement, IMAGE_DATA: ImageData, PIXELS: Uint8ClampedArray, PIXEL_BRUSH: CanvasRenderingContext2D}}
 */
function createShadowCanvasFromImage (image : HTMLImageElement) {
  // @ts-ignore
  const { width, height } = image;

  const PIXEL_CANVAS = document.createElement('canvas');
  PIXEL_CANVAS.width = width;
  PIXEL_CANVAS.height = height;
  const PIXEL_BRUSH: CanvasRenderingContext2D = PIXEL_CANVAS.getContext('2d');

  PIXEL_BRUSH.drawImage(image, 0, 0, width, height);

  const IMAGE_DATA = PIXEL_BRUSH?.getImageData(0, 0, width, height);
  const PIXELS = IMAGE_DATA?.data; // Uint8ClampedArray have a range of 0-255; just like rgba values

  const COMPRESSED_PIXELS = Array.from({ length: width * height }, (_, i) => {
    const pixelIndex = i * 4;

    const r = PIXELS[pixelIndex];
    const g = PIXELS[pixelIndex + 1];
    const b = PIXELS[pixelIndex + 2];

    // this averages the rgb values which is more like the grayscale value of the color but no necessarily the grayscale value the human eye perceives
    return (r + g + b) / 3;
  });

  return { IMAGE_DATA, COMPRESSED_PIXELS };
}

const initialState = {
  OBJECT_DRAGGED_OVER_APP: false,
  IMAGE_RENDERED: false,
};

interface State {
  OBJECT_DRAGGED_OVER_APP?: any;
}

interface Action {
  payload: any;
  type: 'OBJECT_DRAGGED_OVER_APP' | 'IMAGE_RENDERED';
}

function reducer (state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case 'OBJECT_DRAGGED_OVER_APP':
      return { ...state, OBJECT_DRAGGED_OVER_APP: payload, };
    case 'IMAGE_RENDERED':
      return { ...state, IMAGE_RENDERED: payload, };
    default:
      return state;
  }
}

export default function AppRoot () {
  let imageSrc = '/img/grg-in-osu.jpg';

  const {
    image,
    loading : imageLoading,
    error : imageLoadError,
    compressedPixelArray,
    setImage,
    setCompressedPixelArray,
    setLoading,
    setError,
  } = useImageDataContext();

  const [{
    OBJECT_DRAGGED_OVER_APP,
    IMAGE_RENDERED,
  }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const IMAGE = new Image();
    IMAGE.src = imageSrc;

    IMAGE.onload = () => {
      setImage(IMAGE);

      const {COMPRESSED_PIXELS} = createShadowCanvasFromImage(IMAGE);
      setCompressedPixelArray(COMPRESSED_PIXELS);

      setLoading(false);
    };

    IMAGE.onerror = () => {
      setError(true);
    };

    return () => {
      IMAGE.onload = null;
      IMAGE.onerror = null;
    };

  }, []);

  return (
    <div>
      <div className="container">
        {

        }
      </div>
      <ControlPanel/>
    </div>
  );
}
