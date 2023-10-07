/**
 * Camera integration
 * Source: https://github.com/home-assistant/core/blob/dev/homeassistant/components/camera/__init__.py
 */
import { IncludeList } from "../../types";
import { PlatformSchema } from "../platform";

export type Domain = "camera";
export type Schema = Item[] | IncludeList;
export type File = Item | Item[];

/**
 * @TJS-additionalProperties true
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OtherPlatform extends PlatformSchema {
  /**
   * @TJS-pattern ^(?!(mqtt)$)\w+$
   */
  platform: string;
}

type Item = OtherPlatform;

export type SupportedFeature =
  | "camera.CameraEntityFeature.ON_OFF"
  | "camera.CameraEntityFeature.STREAM";
