/**
 * Switch integration
 * Source: https://github.com/home-assistant/core/blob/dev/homeassistant/components/switch/__init__.py
 */
import { IncludeList } from "../types";
import { PlatformSchema } from "../platform";
import { SwitchPlatformSchema as TemplatePlatformSchema } from "./template";

export type Domain = "switch";
export type Schema = Item[] | IncludeList;
export type File = Item | Item[];

/**
 * @TJS-additionalProperties true
 */
interface OtherPlatform extends PlatformSchema {
  /**
   * @TJS-pattern ^(?!(template)$)\w+$
   */
  platform: string;
}

type Item = TemplatePlatformSchema | OtherPlatform;
