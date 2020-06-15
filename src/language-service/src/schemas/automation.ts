export type Automations = Array<Automation>;
export type AutomationsFile = Automation |  Array<Automation>;

export interface Automation {
  id?: string;
  alias?: string;
  description?: string;
  initial_state?: string | boolean;
  hide_entity?: boolean;
  trigger: Triggers | Array<Triggers>;
  condition?:  null | ConditionsConfig;
  action: Actions | Array<Actions | ConditionsConfig>;
}
export type Actions = EventActionSchema | ServiceActionSchema | DelayActionSchema | ServiceActionTemplateSchema | WaitTemplateSchema | DeviceActionSchema;

export interface HaTrigger {
  platform: "homeassistant";
  event: "start" | "shutdown";
}
export interface SunTrigger {
  platform: "sun";
  event: "sunset" | "sunrise";
  offset?: string;
}
export interface TimeTrigger {
  platform: "time";
  at: string;
}
export interface TemplateTrigger {
  platform: "template";
  value_template: string;
  for?: string | TimePeriod;
}
export interface WebhookTrigger {
  platform: "webhook";
  webhook_id: string;
}
export interface EventTrigger {
  platform: "event";
  event_type: string;
  event_data?: any;
}
export interface TimePatternTrigger {
  platform: "time_pattern";
  hours?: string;
  minutes?: string | number;
  seconds?: string | number;
}
export interface MqttTrigger {
  platform: "mqtt";
  topic: string;
  payload?: string;
  encoding?: string;
}
export interface GeoLocationTrigger {
  platform: "geo_location";
  source: string;
  zone: string;
  event: "enter" | "leave";
}
export interface StateTrigger {
  platform: "state";
  entity_id: string | string[];
  from?: string | boolean;
  to?: string | string[] | boolean;
  for?: string | TimePeriod;
}
export interface TimePeriod {
  days?: string | number;
  hours?: string | number;
  minutes?: string | number;
  seconds?: string | number;
  milliseconds?: string | number;
}
export interface ZoneTrigger {
  platform: "zone";
  entity_id: string | string[];
  zone: string;
  event: "enter" | "leave";
}

export interface NumericStateTrigger {
  platform: "numeric_state";
  entity_id: string | string[];
  below?: string | number;
  above?: string | number;
  value_template?: string;
  for?: string | TimePeriod;
}

/**
 * @TJS-additionalProperties true
 */
export interface DeviceTrigger {
  platform: "device"; 
  domain: string;
  device_id: string;
}
 
export type Triggers =
  HaTrigger
  | SunTrigger
  | TimeTrigger
  | TemplateTrigger
  | WebhookTrigger
  | EventTrigger
  | TimePatternTrigger
  | MqttTrigger
  | GeoLocationTrigger
  | StateTrigger
  | ZoneTrigger
  | NumericStateTrigger
  | DeviceTrigger;

export interface Action {
}

export interface DeviceActionSchema extends Action {
  platform?: "device";
  domain: string;
  device_id: string;
  entity_id: string;
  type: string;
}

export interface EventActionSchema extends Action {
  alias?: string;
  event: string;
  event_data?: any;
  event_data_template?: any;
}
export interface DelayActionSchema extends Action {
  delay: number | string | TimePeriod; 
}

export interface ServiceActionSchema extends Action {
  service: string;
  service_template?: string;
  entity_id?: string | string[];
  data?: any;
  data_template?: any;
  alias?: string;
}  

export interface ServiceActionTemplateSchema extends Action {
  service_template: string;
  entity_id?: string | string[];
  data?: any;
  data_template?: any;
}

export interface WaitTemplateSchema extends Action{
  wait_template: string;
  timeout?: string | TimePeriod;
  continue_on_timeout?: boolean | string;
}

/**
 * @TJS-additionalProperties true
 */
export interface DeviceConditionSchema {
  condition: "device";
  device_id: string;
  domain: string;
}

export interface NumericStateConditionSchema {
  condition: "numeric_state";
  entity_id: string;
  below?: string | number;
  above?: string | number;
  value_template?: string;
}

export interface StateConditionSchema {
  condition: "state";
  entity_id: string;
  state: string | boolean;
  for?: string | TimePeriod;
  from?: string;
}

export interface SunConditionSchema {
  condition: "sun";
  before?: string;
  before_offset?: string;
  after?: string;
  after_offset?: string;
}

export interface TemplateConditionSchema {
  condition: "template";
  value_template?: string;
}

export interface TimeConditionSchema {
  condition: "time";
  before?: string;
  after?: string;
  weekday?: Weekday | Array<Weekday>;
}

export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface ZoneConditionSchema {
  condition: "zone";
  entity_id: string | string[];
  zone?: string;
}
export interface AndConditionSchema {
  condition: "and";
  conditions: ConditionsConfig;
}

export interface OrConditionSchema {
  condition: "or";
  conditions: ConditionsConfig;
}

export type ConditionsConfig =
  NumericStateConditionSchema
  | DeviceConditionSchema
  | StateConditionSchema
  | SunConditionSchema
  | TemplateConditionSchema
  | TimeConditionSchema
  | ZoneConditionSchema
  | AndConditionSchema
  | OrConditionSchema
  | Array<
    NumericStateConditionSchema
    | DeviceConditionSchema
    | StateConditionSchema
    | SunConditionSchema
    | TemplateConditionSchema
    | TimeConditionSchema
    | ZoneConditionSchema
    | AndConditionSchema
    | OrConditionSchema
  >;
