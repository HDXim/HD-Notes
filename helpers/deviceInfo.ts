import { PixelRatio, Platform, Dimensions } from "react-native";

const Screen = Dimensions.get("screen");
const width: number = Math.min(Screen.width, Screen.height);
const height: number = Math.max(Screen.width, Screen.height);
const ScreenScale: number = Screen.scale;
const ScreenFontScale: number = Screen.fontScale;

const Window = Dimensions.get("window");
const WindowWidth: number = Window.width;
const WindowHeight: number = Window.height;
const WindowFontScale: number = Window.fontScale;
const WindowScale: number = Window.scale;
const isIOS: boolean = Platform.OS === "ios";
const isAndroid: boolean = Platform.OS === "android";
const PlatformVersion = Platform.Version;

const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;

  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return (
      pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
    );
  }
};
const getWidthRatio = (length: number) => {
  return (length * width) / 375;
};

const getHeightRatio = (length: number) => {
  return (length * height) / 812;
};

export {
  isIOS,
  isAndroid,
  isTablet,
  width,
  height,
  ScreenScale,
  ScreenFontScale,
  WindowWidth,
  WindowHeight,
  WindowScale,
  WindowFontScale,
  PlatformVersion,
  getWidthRatio,
  getHeightRatio,
};
