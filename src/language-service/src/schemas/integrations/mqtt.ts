/**
 * MQTT integration
 * Source: https://github.com/home-assistant/core/blob/dev/homeassistant/components/mqtt/
 */
import {
  Deprecated,
  DeviceClassesBinarySensor,
  DeviceClassesSensor,
  DeviceClassesCover,
  Port,
  PositiveInteger,
  Integer,
  Template,
} from "../types";
import { PlatformSchema } from "../platform";

export type Domain = "mqtt";
type QOS = 0 | 1 | 2;

export interface Schema {
  /**
   * Birth Message
   * https://www.home-assistant.io/docs/mqtt/birth_will/#birth_message
   */
  birth_message?: {
    /**
     * The MQTT topic to publish the message.
     * https://www.home-assistant.io/docs/mqtt/birth_will/#topic
     */
    topic?: string;

    /**
     * The message content.
     * https://www.home-assistant.io/docs/mqtt/birth_will/#payload
     */
    payload?: string;

    /**
     * The maximum QoS level of the topic.
     * https://www.home-assistant.io/docs/mqtt/birth_will/#qos
     */
    qos: QOS;

    /**
     * If the published message should have the retain flag on or not.
     * https://www.home-assistant.io/docs/mqtt/birth_will/#retain
     */
    retain: boolean;
  };

  /**
   * The IP address or hostname of your MQTT broker, e.g., 192.168.1.32.
   * https://www.home-assistant.io/docs/mqtt/broker#broker
   */
  broker?: string;

  /**
   * Path to the certificate file, e.g., /ssl/server.crt.
   * https://www.home-assistant.io/docs/mqtt/broker#certificate
   */
  certificate?: string;

  /**
   * Client certificate, e.g., /home/user/owntracks/cookie.crt.
   * https://www.home-assistant.io/docs/mqtt/certificate/#client_cert
   */
  client_cert?: string;

  /**
   * The client ID that Home Assistant will use. Has to be unique on the server. Default is a randomly generated one.
   * https://www.home-assistant.io/docs/mqtt/broker#client_id
   */
  client_id?: string;

  /**
   * Client key, e.g., /home/user/owntracks/cookie.key.
   * https://www.home-assistant.io/docs/mqtt/certificate/#client_key
   */
  client_key?: string;

  /**
   * The prefix for the discovery topic.
   * https://www.home-assistant.io/docs/mqtt/discovery/#discovery_prefix
   */
  discovery_prefix?: string;

  /**
   * If the MQTT discovery should be enabled or not.
   * https://www.home-assistant.io/docs/mqtt/discovery/#discovery
   */
  discovery?: boolean;

  /**
   * The time in seconds between sending keep alive messages for this client. Default is 60.
   * https://www.home-assistant.io/docs/mqtt/broker#keepalive
   *
   * @min 15
   */
  keepalive?: PositiveInteger;

  /**
   * The corresponding password for the username to use with your MQTT broker.
   * https://www.home-assistant.io/docs/mqtt/broker#password
   */
  password?: string;

  /**
   * The network port to connect to. Default is 1883.
   */
  port?: Port;

  /**
   * Protocol to use: 3.1 or 3.1.1. By default it connects with 3.1.1 and falls back to 3.1 if server does not support 3.1.1.
   * https://www.home-assistant.io/docs/mqtt/broker#protocol
   */
  protocol?: "3.1" | "3.1.1";

  /**
   * Set the verification of the server hostname in the server certificate.
   * https://www.home-assistant.io/docs/mqtt/broker#tls_insecure
   */
  tls_insecure?: boolean;

  /**
   * DEPRECATED as of Home Assistant 0.115.0.
   * Please remove this option form your configuration.
   */
  tls_version?: Deprecated;

  /**
   * The username to use with your MQTT broker.
   * https://www.home-assistant.io/docs/mqtt/broker#username
   */
  username?: string;

  /**
   * Will Message.
   * https://www.home-assistant.io/docs/mqtt/birth_will/#will_message
   */
  will_message?: {
    /**
     * The MQTT topic to publish the message.
     * https://www.home-assistant.io/docs/mqtt/birth_will/#topic
     */
    topic?: string;

    /**
     * The message content.
     * https://www.home-assistant.io/docs/mqtt/birth_will/#payload
     */
    payload?: string;

    /**
     * The maximum QoS level of the topic.
     * https://www.home-assistant.io/docs/mqtt/birth_will/#qos
     */
    qos: QOS;

    /**
     * If the published message should have the retain flag on or not.
     * https://www.home-assistant.io/docs/mqtt/birth_will/#retain
     */
    retain: boolean;
  };
}

export interface AlarmControlPanelPlatformSchema extends PlatformSchema {
  /**
   * he mqtt alarm panel platform enables the possibility to control MQTT capable alarm panels. The Alarm icon will change state after receiving a new state from state_topic.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/
   */
  platform: "mqtt";

  /**
   * A list of MQTT topics subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#availability
   */
  availability?: {
    /**
     * The MQTT topic subscribed to receive availability (online/offline) updates.
     * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#topic
     */
    topic: string;

    /**
     * The payload that represents the available state.
     * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#payload_available
     */
    payload_available?: string;

    /**
     * The payload that represents the unavailable state.
     * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#payload_not_available
     */
    payload_not_available?: string;
  }[];

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#availability_topic
   */
  availability_topic?: string;

  /**
   * If defined, specifies a code to enable or disable the alarm in the frontend.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#code
   */
  code?: string;

  /**
   * If true the code is required to arm the alarm. If false the code is not validated.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#code_arm_required
   */
  code_arm_required?: boolean;

  /**
   * If true the code is required to disarm the alarm. If false the code is not validated.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#code_disarm_required
   */
  code_disarm_required?: boolean;

  /**
   * The template used for the command payload. Available variables: action and code.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#command_template
   */
  command_template?: Template;

  /**
   * Information about the device this sensor is a part of to tie it into the device registry. Only works through MQTT discovery and when unique_id is set.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#device
   */
  device?: {
    /**
     * A list of connections of the device to the outside world as a list of tuples.
     * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#connections
     */
    connections?: { [key: string]: string };

    /**
     * A list of IDs that uniquely identify the device. For example a serial number.
     * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#identifiers
     */
    identifier?: string;

    /**
     * The manufacturer of the device.
     * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#manufacturer
     */
    manufacturer?: string;

    /**
     * The model of the device.
     * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#model
     */
    model?: string;

    /**
     * The name of the device.
     * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#name
     */
    name?: string;

    /**
     * The firmware version of the device.
     * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#sw_version
     */
    sw_version?: string;

    /**
     * Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device.
     * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#via_device
     */
    via_device?: string;
  };

  /**
   * Defines a template to extract the JSON dictionary from messages received on the json_attributes_topic.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#json_attributes_template
   */
  json_attributes_template?: Template;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#json_attributes_topic
   */
  json_attributes_topic?: string;

  /**
   * The name of the MQTT alarm.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#name
   */
  name?: string;

  /**
   * The payload to set armed-away mode on your Alarm Panel.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#payload_arm_away
   */
  payload_arm_away?: string;

  /**
   * The payload to set armed-home mode on your Alarm Panel.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#payload_arm_home
   */
  payload_arm_home?: string;

  /**
   * The payload to set armed-night mode on your Alarm Panel.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#payload_arm_night
   */
  payload_arm_night?: string;

  /**
   * The payload to set armed-custom-bypass mode on your Alarm Panel.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#payload_arm_custom_bypass
   */
  payload_arm_custom_bypass?: string;

  /**
   * The payload that represents the available state.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#payload_available
   */
  payload_available?: string;

  /**
   * The payload to disarm your Alarm Panel.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#payload_disarm
   */
  payload_disarm?: string;

  /**
   * The payload that represents the unavailable state.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#payload_not_available
   */
  payload_not_available?: string;

  /**
   * The maximum QoS level of the state topic.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#qos
   */
  qos?: QOS;

  /**
   * Set the retain flag for data from the alarm panel.
   * Retain is enabled by default.
   */
  retain?: boolean;

  /**
   * The MQTT topic subscribed to receive sensor's state.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#state_topic
   */
  state_topic: string;

  /**
   * An ID that uniquely identifies this sensor. If two sensors have the same unique ID, Home Assistant will raise an exception.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#unique_id
   */
  unique_id?: string;

  /**
   * Defines a template to extract the value.
   * https://www.home-assistant.io/integrations/alarm_control_panel.mqtt/#value_template
   */
  value_template?: Template;
}

export interface BinarySensorPlatformSchema extends PlatformSchema {
  /**
   * The mqtt binary sensor platform uses an MQTT message received to set the binary sensor’s state to on or off.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt
   */
  platform: "mqtt";

  /**
   * Set multiple availability topics for this sensor.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#availability
   */
  availability?: {
    /**
     * The MQTT topic subscribed to receive availability (online/offline) updates.
     * https://www.home-assistant.io/integrations/binary_sensor.mqtt#availability_topic
     */
    topic: string;

    /**
     * The payload that represents the available state.
     * https://www.home-assistant.io/integrations/binary_sensor.mqtt#payload_available
     */
    payload_available?: string;

    /**
     * The payload that represents the unavailable state.
     * https://www.home-assistant.io/integrations/binary_sensor.mqtt#payload_not_available
     */
    payload_not_available?: string;
  }[];

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#availability_topic
   */
  availability_topic?: string;

  /**
   * The type/class of the sensor to set the icon in the frontend.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#device_class
   */
  device_class?: DeviceClassesBinarySensor;

  /**
   * Information about the device this sensor is a part of to tie it into the device registry. Only works through MQTT discovery and when unique_id is set.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#device
   */
  device?: {
    /**
     * A list of connections of the device to the outside world as a list of tuples.
     * https://www.home-assistant.io/integrations/binary_sensor.mqtt#connections
     */
    connections?: { [key: string]: string };

    /**
     * A list of IDs that uniquely identify the device. For example a serial number.
     * https://www.home-assistant.io/integrations/binary_sensor.mqtt#identifiers
     */
    identifier?: string;

    /**
     * The manufacturer of the device.
     * https://www.home-assistant.io/integrations/binary_sensor.mqtt#manufacturer
     */
    manufacturer?: string;

    /**
     * The model of the device.
     * https://www.home-assistant.io/integrations/binary_sensor.mqtt#model
     */
    model?: string;

    /**
     * The name of the device.
     * https://www.home-assistant.io/integrations/binary_sensor.mqtt#name
     */
    name?: string;

    /**
     * The firmware version of the device.
     * https://www.home-assistant.io/integrations/binary_sensor.mqtt#sw_version
     */
    sw_version?: string;

    /**
     * Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device.
     * https://www.home-assistant.io/integrations/binary_sensor.mqtt#via_device
     */
    via_device?: string;
  };

  /**
   * Defines the number of seconds after the sensor’s state expires, if it’s not updated. After expiry, the sensor’s state becomes unavailable.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#expire_after
   */
  expire_after?: PositiveInteger;

  /**
   * Sends update events even if the value hasn’t changed. Useful if you want to have meaningful value graphs in history.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#expire_after
   */
  force_update?: boolean;

  /**
   * Defines a template to extract the JSON dictionary from messages received on the json_attributes_topic.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#json_attributes_template
   */
  json_attributes_template?: Template;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#json_attributes_topic
   */
  json_attributes_topic?: string;

  /**
   * The name of the MQTT binary sensor.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#name
   */
  name?: string;

  /**
   * For sensors that only send on state updates (like PIRs), this variable sets a delay in seconds after which the sensor’s state will be updated back to off.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#off_delay
   */
  off_delay?: PositiveInteger;

  /**
   * The payload that represents the available state.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#payload_available
   */
  payload_available?: string;

  /**
   * The payload that represents the unavailable state.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#payload_not_available
   */
  payload_not_available?: string;

  /**
   * The string that represents the off state. It will be compared to the message in the state_topic.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt/#payload_off
   */
  payload_off?: string;

  /**
   * The string that represents the on state. It will be compared to the message in the state_topic.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt/#payload_on
   */
  payload_on?: string;

  /**
   * The maximum QoS level of the state topic.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#qos
   */
  qos?: QOS;

  /**
   * The MQTT topic subscribed to receive sensor's state.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#state_topic
   */
  state_topic: string;

  /**
   * An ID that uniquely identifies this sensor. If two sensors have the same unique ID, Home Assistant will raise an exception.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#unique_id
   */
  unique_id?: string;

  /**
   * Defines a template to extract the value.
   * https://www.home-assistant.io/integrations/binary_sensor.mqtt#value_template
   */
  value_template?: Template;
}

export interface CameraPlatformSchema extends PlatformSchema {
  /**
   * The mqtt camera platform allows you to integrate the content of an image file sent through MQTT into Home Assistant as a camera.
   * https://www.home-assistant.io/integrations/camera.mqtt/
   */
  platform: "mqtt";

  /**
   * A list of MQTT topics subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/camera.mqtt/#availability
   */
  availability?: {
    /**
     * The MQTT topic subscribed to receive availability (online/offline) updates.
     * https://www.home-assistant.io/integrations/camera.mqtt/#topic
     */
    topic: string;

    /**
     * The payload that represents the available state.
     * https://www.home-assistant.io/integrations/camera.mqtt/#payload_available
     */
    payload_available?: string;

    /**
     * The payload that represents the unavailable state.
     * https://www.home-assistant.io/integrations/camera.mqtt/#payload_not_available
     */
    payload_not_available?: string;
  }[];

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/camera.mqtt/#availability_topic
   */
  availability_topic?: string;

  /**
   * Information about the device this camera is a part of to tie it into the device registry. Only works through MQTT discovery and when unique_id is set.
   * https://www.home-assistant.io/integrations/camera.mqtt/#device
   */
  device?: {
    /**
     * A list of connections of the device to the outside world as a list of tuples.
     * https://www.home-assistant.io/integrations/camera.mqtt#connections
     */
    connections?: { [key: string]: string };

    /**
     * A list of IDs that uniquely identify the device. For example a serial number.
     * https://www.home-assistant.io/integrations/camera.mqtt#identifiers
     */
    identifier?: string;

    /**
     * The manufacturer of the device.
     * https://www.home-assistant.io/integrations/camera.mqtt#manufacturer
     */
    manufacturer?: string;

    /**
     * The model of the device.
     * https://www.home-assistant.io/integrations/camera.mqtt#model
     */
    model?: string;

    /**
     * The name of the device.
     * https://www.home-assistant.io/integrations/camera.mqtt#name
     */
    name?: string;

    /**
     * The firmware version of the device.
     * https://www.home-assistant.io/integrations/camera.mqtt#sw_version
     */
    sw_version?: string;

    /**
     * Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device.
     * https://www.home-assistant.io/integrations/camera.mqtt#via_device
     */
    via_device?: string;
  };

  /**
   * Defines a template to extract the JSON dictionary from messages received on the json_attributes_topic.
   * https://www.home-assistant.io/integrations/camera.mqtt#json_attributes_template
   */
  json_attributes_template?: Template;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes.
   * https://www.home-assistant.io/integrations/camera.mqtt#json_attributes_topic
   */
  json_attributes_topic?: string;

  /**
   * The name of the MQTT camera.
   * https://www.home-assistant.io/integrations/camera.mqtt#name
   */
  name?: string;

  /**
   * The MQTT topic to subscribe to.
   * https://www.home-assistant.io/integrations/camera.mqtt/#device
   */
  topic: string;

  /**
   * An ID that uniquely identifies this camera. If two cameras have the same unique ID Home Assistant will raise an exception.
   * https://www.home-assistant.io/integrations/camera.mqtt#unique_id
   */
  unique_id?: string;
}

export interface ClimatePlatformSchema extends PlatformSchema {
  /**
   * The mqtt climate platform lets you control your MQTT enabled HVAC devices.
   * https://www.home-assistant.io/integrations/climate.mqtt/
   */
  platform: "mqtt";

  /**
   * A template to render the value received on the action_topic with.
   * https://www.home-assistant.io/integrations/climate.mqtt/#action_template
   */
  action_template?: Template;

  /**
   * The MQTT topic to subscribe for changes of the current action. If this is set, the climate graph uses the value received as data source.
   * https://www.home-assistant.io/integrations/climate.mqtt/#action_topic
   */
  action_topic?: string;

  /**
   * The MQTT topic to publish commands to switch auxiliary heat.
   * https://www.home-assistant.io/integrations/climate.mqtt/#aux_command_topic
   */
  aux_command_topic?: string;

  /**
   * A template to render the value received on the aux_state_topic with.
   * https://www.home-assistant.io/integrations/climate.mqtt/#aux_state_template
   */
  aux_state_template?: Template;

  /**
   * The MQTT topic to subscribe for changes of the auxiliary heat mode. If this is not set, the auxiliary heat mode works in optimistic mode.
   * https://www.home-assistant.io/integrations/climate.mqtt/#aux_state_topic
   */
  aux_state_topic?: string;

  /**
   * A list of MQTT topics subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/climate.mqtt/#availability
   */
  availability?: {
    /**
     * The MQTT topic subscribed to receive availability (online/offline) updates.
     * https://www.home-assistant.io/integrations/climate.mqtt/#topic
     */
    topic: string;

    /**
     * The payload that represents the available state.
     * https://www.home-assistant.io/integrations/climate.mqtt/#payload_available
     */
    payload_available?: string;

    /**
     * The payload that represents the unavailable state.
     * https://www.home-assistant.io/integrations/climate.mqtt/#payload_not_available
     */
    payload_not_available?: string;
  }[];

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/climate.mqtt/#availability_topic
   */
  availability_topic?: string;

  /**
   * The MQTT topic to publish commands to change the away mode.
   * https://www.home-assistant.io/integrations/climate.mqtt/#away_mode_command_topic
   */
  away_mode_command_topic?: string;

  /**
   * A template to render the value received on the away_mode_state_topic with.
   * https://www.home-assistant.io/integrations/climate.mqtt/#away_mode_state_template
   */
  away_mode_state_template?: Template;

  /**
   * The MQTT topic to subscribe for changes of the HVAC away mode. If this is not set, the away mode works in optimistic mode.
   * https://www.home-assistant.io/integrations/climate.mqtt/#away_mode_state_topic
   */
  away_mode_state_topic?: string;

  /**
   * A template with which the value received on current_temperature_topic will be rendered.
   * https://www.home-assistant.io/integrations/climate.mqtt/#current_temperature_template
   */
  current_temperature_template?: Template;

  /**
   * The MQTT topic on which to listen for the current temperature.
   * https://www.home-assistant.io/integrations/climate.mqtt/#current_temperature_topic
   */
  current_temperature_topic?: string;

  /**
   * Information about the device this HVAC is a part of to tie it into the device registry. Only works through MQTT discovery and when unique_id is set.
   * https://www.home-assistant.io/integrations/climate.mqtt/#device
   */
  device?: {
    /**
     * A list of connections of the device to the outside world as a list of tuples.
     * https://www.home-assistant.io/integrations/climate.mqtt#connections
     */
    connections?: { [key: string]: string };

    /**
     * A list of IDs that uniquely identify the device. For example a serial number.
     * https://www.home-assistant.io/integrations/climate.mqtt#identifiers
     */
    identifier?: string;

    /**
     * The manufacturer of the device.
     * https://www.home-assistant.io/integrations/climate.mqtt#manufacturer
     */
    manufacturer?: string;

    /**
     * The model of the device.
     * https://www.home-assistant.io/integrations/climate.mqtt#model
     */
    model?: string;

    /**
     * The name of the device.
     * https://www.home-assistant.io/integrations/climate.mqtt#name
     */
    name?: string;

    /**
     * The firmware version of the device.
     * https://www.home-assistant.io/integrations/climate.mqtt#sw_version
     */
    sw_version?: string;

    /**
     * Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device.
     * https://www.home-assistant.io/integrations/climate.mqtt#via_device
     */
    via_device?: string;
  };

  /**
   * The MQTT topic to publish commands to change the fan mode.
   * https://www.home-assistant.io/integrations/climate.mqtt/#fan_mode_command_topic
   */
  fan_mode_command_topic?: string;

  /**
   * A template to render the value received on the fan_mode_state_topic with.
   * https://www.home-assistant.io/integrations/climate.mqtt/#fan_mode_state_template
   */
  fan_mode_state_template?: Template;

  /**
   * The MQTT topic to subscribe for changes of the HVAC fan mode. If this is not set, the fan mode works in optimistic mode.
   * https://www.home-assistant.io/integrations/climate.mqtt/#fan_mode_state_topic
   */
  fan_mode_state_topic?: string;

  /**
   * A list of supported fan modes.
   * https://www.home-assistant.io/integrations/climate.mqtt/#fan_modes
   */
  fan_modes?: string[];

  /**
   * The MQTT topic to publish commands to change the hold mode.
   * https://www.home-assistant.io/integrations/climate.mqtt/#hold_command_topic
   */
  hold_command_topic?: string;

  /**
   * A template to render the value received on the hold_state_topic with.
   * https://www.home-assistant.io/integrations/climate.mqtt/#hold_state_template
   */
  hold_state_template?: Template;

  /**
   * The MQTT topic to subscribe for changes of the HVAC hold mode. If this is not set, the hold mode works in optimistic mode.
   * https://www.home-assistant.io/integrations/climate.mqtt/#hold_state_topic
   */
  hold_state_topic?: string;

  /**
   * A list of available hold modes.
   * https://www.home-assistant.io/integrations/climate.mqtt/#hold_modes
   */
  hold_modes?: string[];

  /**
   * Set the initial target temperature.
   * https://www.home-assistant.io/integrations/climate.mqtt/#initial
   */
  initial?: Integer;

  /**
   * Defines a template to extract the JSON dictionary from messages received on the json_attributes_topic.
   * https://www.home-assistant.io/integrations/climate.mqtt#json_attributes_template
   */
  json_attributes_template?: Template;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes.
   * https://www.home-assistant.io/integrations/climate.mqtt#json_attributes_topic
   */
  json_attributes_topic?: string;

  /**
   * Maximum set point available.
   * https://www.home-assistant.io/integrations/climate.mqtt/#max_temp
   */
  max_temp?: number;

  /**
   * Minimum set point available.
   * https://www.home-assistant.io/integrations/climate.mqtt/#min_temp
   */
  min_temp?: number;

  /**
   * The MQTT topic to publish commands to change the HVAC operation mode.
   * https://www.home-assistant.io/integrations/climate.mqtt/#mode_command_topic
   */
  mode_command_topic?: string;

  /**
   * A template to render the value received on the mode_state_topic with.
   * https://www.home-assistant.io/integrations/climate.mqtt/#mode_state_template
   */
  mode_state_template?: Template;

  /**
   * The MQTT topic to subscribe for changes of the HVAC operation mode. If this is not set, the operation mode works in optimistic mode.
   * https://www.home-assistant.io/integrations/climate.mqtt/#mode_state_topic
   */
  mode_state_topic?: string;

  /**
   * A list of supported modes.
   * https://www.home-assistant.io/integrations/climate.mqtt/#modes
   */
  modes?: ("auto" | "off" | "cool" | "heat" | "dry" | "fan_only")[];

  /**
   * The name of the MQTT climate device.
   * https://www.home-assistant.io/integrations/climate.mqtt#name
   */
  name?: string;

  /**
   * The payload that represents the available state.
   * https://www.home-assistant.io/integrations/climate.mqtt/#payload_available
   */
  payload_available?: string;

  /**
   * The payload that represents the unavailable state.
   * https://www.home-assistant.io/integrations/climate.mqtt/#payload_not_available
   */
  payload_not_available?: string;

  /**
   * The payload that represents disabled state.
   * https://www.home-assistant.io/integrations/climate.mqtt/#payload_off
   */
  payload_off?: string;

  /**
   * The payload that represents enabled state.
   * https://www.home-assistant.io/integrations/climate.mqtt/#payload_on
   */
  payload_on?: string;

  /**
   * The MQTT topic to publish commands to change the power state. This is useful if your device has a separate power toggle in addition to mode.
   * https://www.home-assistant.io/integrations/climate.mqtt/#power_command_topic
   */
  power_command_topic?: string;

  /**
   * The desired precision for this device. Can be used to match your actual thermostat’s precision. Supported values are 0.1, 0.5 and 1.0.
   * https://www.home-assistant.io/integrations/climate.mqtt/#precision
   */
  precision?: 0.1 | 0.5 | 1.0;

  /**
   * The maximum QoS level to be used when receiving and publishing messages.
   * https://www.home-assistant.io/integrations/climate.mqtt/#qos
   */
  qos?: QOS;

  /**
   * Defines if published messages should have the retain flag set.
   * https://www.home-assistant.io/integrations/climate.mqtt/#retain
   */
  retain?: boolean;

  /**
   * Set to false to suppress sending of all MQTT messages when the current mode is Off.
   * https://www.home-assistant.io/integrations/climate.mqtt/#send_if_off
   */
  send_if_off: boolean;

  /**
   * The MQTT topic to publish commands to change the swing mode.
   * https://www.home-assistant.io/integrations/climate.mqtt/#swing_mode_command_topic
   */
  swing_mode_command_topic?: string;

  /**
   * A template to render the value received on the swing_mode_state_topic with.
   * https://www.home-assistant.io/integrations/climate.mqtt/#swing_mode_state_template
   */
  swing_mode_state_template?: Template;

  /**
   * The MQTT topic to subscribe for changes of the HVAC swing mode. If this is not set, the swing mode works in optimistic mode.
   * https://www.home-assistant.io/integrations/climate.mqtt/#swing_mode_state_topic
   */
  swing_mode_state_topic?: string;

  /**
   * A list of supported swing modes.
   * https://www.home-assistant.io/integrations/climate.mqtt/#swing_modes
   */
  swing_modes?: string[];

  /**
   * The MQTT topic to publish commands to change the target temperature.
   * https://www.home-assistant.io/integrations/climate.mqtt#temperature_command_topic
   */
  temperature_command_topic?: string;

  /**
   * The MQTT topic to publish commands to change the high target temperature.
   * https://www.home-assistant.io/integrations/climate.mqtt#temperature_high_command_topic
   */
  temperature_high_command_topic?: string;

  /**
   * A template to render the value received on the temperature_high_state_topic with.
   * https://www.home-assistant.io/integrations/climate.mqtt#temperature_high_state_template
   */
  temperature_high_state_template?: Template;

  /**
   * The MQTT topic to subscribe for changes in the target high temperature. If this is not set, the target high temperature works in optimistic mode.
   * https://www.home-assistant.io/integrations/climate.mqtt#temperature_high_state_topic
   */
  temperature_high_state_topic?: string;

  /**
   * The MQTT topic to publish commands to change the target low temperature.
   * https://www.home-assistant.io/integrations/climate.mqtt#temperature_low_command_topic
   */
  temperature_low_command_topic?: string;

  /**
   * A template to render the value received on the temperature_low_state_topic with.
   * https://www.home-assistant.io/integrations/climate.mqtt#temperature_low_state_template
   */
  temperature_low_state_template?: Template;

  /**
   * The MQTT topic to subscribe for changes in the target low temperature. If this is not set, the target low temperature works in optimistic mode.
   * https://www.home-assistant.io/integrations/climate.mqtt#temperature_low_state_topic
   */
  temperature_low_state_topic?: string;

  /**
   * A template to render the value received on the temperature_state_topic with.
   * https://www.home-assistant.io/integrations/climate.mqtt#temperature_state_template
   */
  temperature_state_template?: Template;

  /**
   * The MQTT topic to subscribe for changes in the target temperature. If this is not set, the target temperature works in optimistic mode.
   * https://www.home-assistant.io/integrations/climate.mqtt#temperature_state_topic
   */
  temperature_state_topic?: string;

  /**
   * Defines the temperature unit of the device, C or F. If this is not set, the temperature unit is set to the system temperature unit.
   * https://www.home-assistant.io/integrations/climate.mqtt#temperature_unit
   */
  temperature_unit?: "C" | "F";

  /**
   * Step size for temperature set point.
   * https://www.home-assistant.io/integrations/climate.mqtt#temp_step
   */
  temperature_step?: number;

  /**
   * An ID that uniquely identifies this HVAC device. If two HVAC devices have the same unique ID, Home Assistant will raise an exception.
   * https://www.home-assistant.io/integrations/climate.mqtt#unique_id
   */
  unique_id?: string;

  /**
   * Default template to render the payloads on all *_state_topics with.
   * https://www.home-assistant.io/integrations/climate.mqtt#value_template
   */
  value_template?: Template;
}

export interface CoverPlatformSchema extends PlatformSchema {
  /**
   * The mqtt cover platform allows you to control an MQTT cover (such as blinds, a rollershutter or a garage door).
   * https://www.home-assistant.io/integrations/cover.mqtt/
   */
  platform: "mqtt";

  /**
   * A list of MQTT topics subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/cover.mqtt/#availability
   */
  availability?: {
    /**
     * The MQTT topic subscribed to receive availability (online/offline) updates.
     * https://www.home-assistant.io/integrations/cover.mqtt/#topic
     */
    topic: string;

    /**
     * The payload that represents the available state.
     * https://www.home-assistant.io/integrations/cover.mqtt/#payload_available
     */
    payload_available?: string;

    /**
     * The payload that represents the unavailable state.
     * https://www.home-assistant.io/integrations/cover.mqtt/#payload_not_available
     */
    payload_not_available?: string;
  }[];

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/camera.mqtt/#availability_topic
   */
  availability_topic?: string;

  /**
   * The MQTT topic to publish commands to control the cover.
   * https://www.home-assistant.io/integrations/cover.mqtt/#command_topic
   */
  command_topic?: string;

  /**
   * Information about the device this camera is a part of to tie it into the device registry. Only works through MQTT discovery and when unique_id is set.
   * https://www.home-assistant.io/integrations/cover.mqtt/#device
   */
  device?: {
    /**
     * A list of connections of the device to the outside world as a list of tuples.
     * https://www.home-assistant.io/integrations/cover.mqtt#connections
     */
    connections?: { [key: string]: string };

    /**
     * A list of IDs that uniquely identify the device. For example a serial number.
     * https://www.home-assistant.io/integrations/cover.mqtt#identifiers
     */
    identifier?: string;

    /**
     * The manufacturer of the device.
     * https://www.home-assistant.io/integrations/cover.mqtt#manufacturer
     */
    manufacturer?: string;

    /**
     * The model of the device.
     * https://www.home-assistant.io/integrations/cover.mqtt#model
     */
    model?: string;

    /**
     * The name of the device.
     * https://www.home-assistant.io/integrations/cover.mqtt#name
     */
    name?: string;

    /**
     * The firmware version of the device.
     * https://www.home-assistant.io/integrations/cover.mqtt#sw_version
     */
    sw_version?: string;

    /**
     * Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device.
     * https://www.home-assistant.io/integrations/cover.mqtt#via_device
     */
    via_device?: string;
  };

  /**
   * Sets the class of the device, changing the device state and icon that is displayed on the frontend.
   * https://www.home-assistant.io/integrations/cover.mqtt/#device_class
   */
  device_class?: DeviceClassesCover;

  /**
   * Defines a template to extract the JSON dictionary from messages received on the json_attributes_topic.
   * https://www.home-assistant.io/integrations/cover.mqtt#json_attributes_template
   */
  json_attributes_template?: Template;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes.
   * https://www.home-assistant.io/integrations/cover.mqtt#json_attributes_topic
   */
  json_attributes_topic?: string;

  /**
   * The name of the MQTT cover.
   * https://www.home-assistant.io/integrations/cover.mqtt#name
   */
  name?: string;

  /**
   * Flag that defines if switch works in optimistic mode.
   * https://www.home-assistant.io/integrations/cover.mqtt/#optimistic
   */
  optimistic?: boolean;

  /**
   * The payload that represents the online state.
   * https://www.home-assistant.io/integrations/cover.mqtt/#payload_available
   */
  payload_available?: string;

  /**
   * The command payload that closes the cover.
   * https://www.home-assistant.io/integrations/cover.mqtt/#payload_close
   */
  payload_close?: string;

  /**
   * The payload that represents the offline state.
   * https://www.home-assistant.io/integrations/cover.mqtt/#payload_not_available
   */
  payload_not_available?: string;

  /**
   * The command payload that opens the cover.
   * https://www.home-assistant.io/integrations/cover.mqtt/#payload_open
   */
  payload_open?: string;

  /**
   * The command payload that stops the cover.
   * https://www.home-assistant.io/integrations/cover.mqtt/#payload_stop
   */
  payload_stop?: string;

  /**
   * Number which represents closed position.
   * https://www.home-assistant.io/integrations/cover.mqtt/#position_closed
   */
  position_closed?: Integer;

  /**
   * Number which represents open position.
   * https://www.home-assistant.io/integrations/cover.mqtt/#position_open
   */
  position_open?: Integer;

  /**
   * The MQTT topic subscribed to receive cover position messages. If position_topic is set state_topic is ignored.
   * https://www.home-assistant.io/integrations/cover.mqtt/#position_topic
   */
  position_topic?: string;

  /**
   * The maximum QoS level to be used when receiving and publishing messages.
   * https://www.home-assistant.io/integrations/cover.mqtt/#qos
   */
  qos?: QOS;

  /**
   * Defines if published messages should have the retain flag set.
   * https://www.home-assistant.io/integrations/cover.mqtt/#retain
   */
  retain?: boolean;

  /**
   * Defines a template to define the position to be sent to the set_position_topic topic.
   * https://www.home-assistant.io/integrations/cover.mqtt/#set_position_template
   */
  set_position_template?: Template;

  /**
   * The MQTT topic to publish position commands to. You need to set position_topic as well if you want to use position topic.
   * https://www.home-assistant.io/integrations/cover.mqtt/#set_position_topic
   */
  set_position_topic?: string;

  /**
   * The payload that represents the closed state.
   * https://www.home-assistant.io/integrations/cover.mqtt/#state_closed
   */
  state_closed?: string;

  /**
   * The payload that represents the closing state.
   * https://www.home-assistant.io/integrations/cover.mqtt/#state_closing
   */
  state_closing?: string;

  /**
   * The payload that represents the open state.
   * https://www.home-assistant.io/integrations/cover.mqtt/#state_open
   */
  state_open?: string;

  /**
   * The payload that represents the opening state.
   * https://www.home-assistant.io/integrations/cover.mqtt/#state_opening
   */
  state_opening?: string;

  /**
   * The MQTT topic subscribed to receive cover state messages. Use only if not using position_topic. State topic can only read open/close state.
   * https://www.home-assistant.io/integrations/cover.mqtt/#state_topic
   */
  state_topic?: string;

  /**
   * The value that will be sent on a close_cover_tilt command.
   * https://www.home-assistant.io/integrations/cover.mqtt/#tilt_closed_value
   */
  tilt_closed_value?: Integer;

  /**
   * The MQTT topic to publish commands to control the cover tilt.
   * https://www.home-assistant.io/integrations/cover.mqtt/#tilt_command_topic
   */
  tilt_command_topic?: Integer;

  /**
   * Flag that determines if open/close are flipped; higher values toward closed and lower values toward open.
   * https://www.home-assistant.io/integrations/cover.mqtt/#tilt_invert_state
   */
  tilt_invert_state?: boolean;

  /**
   *The maximum tilt value.
   * https://www.home-assistant.io/integrations/cover.mqtt/#tilt_max
   */
  tilt_max?: Integer;

  /**
   * The minimum tilt value.
   * https://www.home-assistant.io/integrations/cover.mqtt/#tilt_min
   */
  tilt_min?: Integer;

  /**
   * The value that will be sent on an open_cover_tilt command.
   * https://www.home-assistant.io/integrations/cover.mqtt/#tilt_opened_value
   */
  tilt_opened_value: Integer;

  /**
   * Flag that determines if tilt works in optimistic mode.
   * https://www.home-assistant.io/integrations/cover.mqtt/#tilt_optimistic
   */
  tilt_optimistic?: boolean;

  /**
   * Defines a template that can be used to extract the payload for the tilt_status_topic topic.
   * https://www.home-assistant.io/integrations/cover.mqtt/#tilt_status_template
   */
  tilt_status_template?: Template;

  /**
   * The MQTT topic subscribed to receive tilt status update values.
   * https://www.home-assistant.io/integrations/cover.mqtt/#tilt_status_topic
   */
  tilt_status_topic?: string;

  /**
   * An ID that uniquely identifies this cover. If two covers have the same unique ID, Home Assistant will raise an exception.
   * https://www.home-assistant.io/integrations/cover.mqtt#unique_id
   */
  unique_id?: string;

  /**
   * Defines a template to extract a value from the payload.
   * https://www.home-assistant.io/integrations/cover.mqtt/#value_template
   */
  value_template?: Template;
}

export interface DeviceTrackerPlatformSchema extends PlatformSchema {
  /**
   * The mqtt device tracker platform allows you to detect presence by monitoring an MQTT topic for new locations.
   * https://www.home-assistant.io/integrations/device_tracker.mqtt/
   */
  platform: "mqtt";

  /**
   * List of devices with their topic.
   * https://www.home-assistant.io/integrations/device_tracker.mqtt/#devices
   */
  devices: { [key: string]: string }[];

  /**
   * The payload value that represents the ‘home’ state for the device.
   * https://www.home-assistant.io/integrations/device_tracker.mqtt/#payload_home
   */
  payload_home?: string;

  /**
   * The payload value that represents the ‘not_home’ state for the device.
   * https://www.home-assistant.io/integrations/device_tracker.mqtt/#payload_not_home
   */
  payload_not_home?: string;

  /**
   * The maximum QoS level to be used when receiving messages.
   * https://www.home-assistant.io/integrations/device_tracker.mqtt/#qos
   */
  qos?: QOS;

  /**
   * Attribute of a device tracker that affects state when being used to track a person. Valid options are gps, router, bluetooth, or bluetooth_le.
   * https://www.home-assistant.io/integrations/device_tracker.mqtt/#source_type
   */
  source_type?: "bluetooth" | "bluetooth_le" | "gps" | "router";
}

export interface FanPlatformSchema extends PlatformSchema {
  /**
   * The mqtt fan platform lets you control your MQTT enabled fans.
   * https://www.home-assistant.io/integrations/fan.mqtt/
   */
  platform: "mqtt";

  /**
   * A list of MQTT topics subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/fan.mqtt/#availability
   */
  availability?: {
    /**
     * The MQTT topic subscribed to receive availability (online/offline) updates.
     * https://www.home-assistant.io/integrations/fan.mqtt/#topic
     */
    topic: string;

    /**
     * The payload that represents the available state.
     * https://www.home-assistant.io/integrations/fan.mqtt/#payload_available
     */
    payload_available?: string;

    /**
     * The payload that represents the unavailable state.
     * https://www.home-assistant.io/integrations/fan.mqtt/#payload_not_available
     */
    payload_not_available?: string;
  }[];

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/fan.mqtt/#availability_topic
   */
  availability_topic?: string;

  /**
   * The MQTT topic to publish commands to change the fan state.
   * https://www.home-assistant.io/integrations/fan.mqtt/#command_topic
   */
  command_topic: string;

  /**
   * Information about the device this camera is a part of to tie it into the device registry. Only works through MQTT discovery and when unique_id is set.
   * https://www.home-assistant.io/integrations/fan.mqtt/#device
   */
  device?: {
    /**
     * A list of connections of the device to the outside world as a list of tuples.
     * https://www.home-assistant.io/integrations/fan.mqtt#connections
     */
    connections?: { [key: string]: string };

    /**
     * A list of IDs that uniquely identify the device. For example a serial number.
     * https://www.home-assistant.io/integrations/fan.mqtt#identifiers
     */
    identifier?: string;

    /**
     * The manufacturer of the device.
     * https://www.home-assistant.io/integrations/fan.mqtt#manufacturer
     */
    manufacturer?: string;

    /**
     * The model of the device.
     * https://www.home-assistant.io/integrations/fan.mqtt#model
     */
    model?: string;

    /**
     * The name of the device.
     * https://www.home-assistant.io/integrations/fan.mqtt#name
     */
    name?: string;

    /**
     * The firmware version of the device.
     * https://www.home-assistant.io/integrations/fan.mqtt#sw_version
     */
    sw_version?: string;

    /**
     * Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device.
     * https://www.home-assistant.io/integrations/fan.mqtt#via_device
     */
    via_device?: string;
  };

  /**
   * Defines a template to extract the JSON dictionary from messages received on the json_attributes_topic.
   * https://www.home-assistant.io/integrations/fan.mqtt#json_attributes_template
   */
  json_attributes_template?: Template;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes.
   * https://www.home-assistant.io/integrations/fan.mqtt#json_attributes_topic
   */
  json_attributes_topic?: string;

  /**
   * The name of the MQTT fan.
   * https://www.home-assistant.io/integrations/fan.mqtt#name
   */
  name?: string;

  /**
   * Flag that defines if fan works in optimistic mode.
   * https://www.home-assistant.io/integrations/fan.mqtt/#optimistic
   */
  optimistic?: boolean;

  /**
   * The MQTT topic to publish commands to change the oscillation state.
   * https://www.home-assistant.io/integrations/fan.mqtt/#oscillation_command_topic
   */
  oscillation_command_topic?: string;

  /**
   * The MQTT topic subscribed to receive oscillation state updates.
   * https://www.home-assistant.io/integrations/fan.mqtt/#oscillation_state_topic
   */
  oscillation_state_topic?: string;

  /**
   * Defines a template to extract a value from the oscillation.
   * https://www.home-assistant.io/integrations/fan.mqtt/#oscillation_value_template
   */
  oscillation_value_template?: Template;

  /**
   * The payload that represents the online state.
   * https://www.home-assistant.io/integrations/fan.mqtt/#payload_available
   */
  payload_available?: string;

  /**
   * The payload that represents the fan’s high speed.
   * https://www.home-assistant.io/integrations/fan.mqtt/#payload_high_speed
   */
  payload_high_speed?: string;

  /**
   * The payload that represents the fan’s low speed.
   * https://www.home-assistant.io/integrations/fan.mqtt/#payload_low_speed
   */
  payload_low_speed?: string;

  /**
   * The payload that represents the fan’s medium speed.
   * https://www.home-assistant.io/integrations/fan.mqtt/#payload_medium_speed
   */
  payload_medium_speed?: string;

  /**
   * The payload that represents the offline state.
   * https://www.home-assistant.io/integrations/fan.mqtt/#payload_not_available
   */
  payload_not_available?: string;

  /**
   * The payload that represents the stop state.
   * https://www.home-assistant.io/integrations/fan.mqtt/#payload_off
   */
  payload_off?: string;

  /**
   * The payload that represents the running state.
   * https://www.home-assistant.io/integrations/fan.mqtt/#payload_on
   */
  payload_on?: string;

  /**
   * The payload that represents the oscillation off state.
   * https://www.home-assistant.io/integrations/fan.mqtt/#payload_oscillation_off
   */
  payload_oscillation_off?: string;

  /**
   * The payload that represents the oscillation on state.
   * https://www.home-assistant.io/integrations/fan.mqtt/#payload_oscillation_on
   */
  payload_oscillation_on?: string;

  /**
   * The maximum QoS level to be used when receiving and publishing messages.
   * https://www.home-assistant.io/integrations/fan.mqtt/#qos
   */
  qos?: QOS;

  /**
   * Defines if published messages should have the retain flag set.
   * https://www.home-assistant.io/integrations/fan.mqtt/#retain
   */
  retain?: boolean;

  /**
   * The MQTT topic to publish commands to change speed state.
   * https://www.home-assistant.io/integrations/fan.mqtt/#speed_command_topic
   */
  speed_command_topic?: string;

  /**
   * The MQTT topic subscribed to receive speed state updates.
   * https://www.home-assistant.io/integrations/fan.mqtt/#speed_state_topic
   */
  speed_state_topic?: string;

  /**
   * Defines a template to extract a value from the speed payload.
   * https://www.home-assistant.io/integrations/fan.mqtt/#speed_value_template
   */
  speed_value_template?: Template;

  /**
   * List of speeds this fan is capable of running at. Valid entries are off, low, medium and high.
   * https://www.home-assistant.io/integrations/fan.mqtt/#speeds
   */
  speeds: string[];

  /**
   * The MQTT topic subscribed to receive state updates.
   * https://www.home-assistant.io/integrations/fan.mqtt/#state_topic
   */
  state_topic?: string;

  /**
   * Defines a template to extract a value from the state.
   * https://www.home-assistant.io/integrations/fan.mqtt/#state_value_template
   */
  state_value_template?: Template;

  /**
   * An ID that uniquely identifies this cover. If two covers have the same unique ID, Home Assistant will raise an exception.
   * https://www.home-assistant.io/integrations/fan.mqtt#unique_id
   */
  unique_id?: string;
}

export interface LightDefaultPlatformSchema extends PlatformSchema {
  /**
   * The mqtt light platform lets you control your MQTT enabled lights through one of the supported message schemas, default, json or template.
   * https://www.home-assistant.io/integrations/light.mqtt/
   */
  platform: "mqtt";

  /**
   * The mqtt light platform with default schema lets you control your MQTT enabled lights. It supports setting brightness, color temperature, effects, flashing, on/off, RGB colors, transitions, XY colors and white values.
   * https://www.home-assistant.io/integrations/light.mqtt/#default-schema---configuration
   */
  schema?: "default";

  /**
   * A list of MQTT topics subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#availability
   */
  availability?: {
    /**
     * The MQTT topic subscribed to receive availability (online/offline) updates.
     * https://www.home-assistant.io/integrations/light.mqtt/#topic
     */
    topic: string;

    /**
     * The payload that represents the available state.
     * https://www.home-assistant.io/integrations/light.mqtt/#payload_available
     */
    payload_available?: string;

    /**
     * The payload that represents the unavailable state.
     * https://www.home-assistant.io/integrations/light.mqtt/#payload_not_available
     */
    payload_not_available?: string;
  }[];

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#availability_topic
   */
  availability_topic?: string;

  /**
   * The MQTT topic to publish commands to change the light’s brightness.
   * https://www.home-assistant.io/integrations/light.mqtt/#brightness_command_topic
   */
  brightness_command_topic?: string;

  /**
   * Defines the maximum brightness value (i.e., 100%) of the MQTT device.
   * https://www.home-assistant.io/integrations/light.mqtt/#brightness_scale
   */
  brightness_scale?: Integer;

  /**
   * The MQTT topic subscribed to receive brightness state updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#brightness_state_topic
   */
  brightness_state_topic?: string;

  /**
   * Defines a template to extract the brightness value.
   * https://www.home-assistant.io/integrations/light.mqtt/#brightness_value_template
   */
  brightness_value_template?: Template;

  /**
   * Defines a template to compose message which will be sent to color_temp_command_topic. Available variables: value.
   * https://www.home-assistant.io/integrations/light.mqtt/#color_temp_command_template
   */
  color_temp_command_template?: Template;

  /**
   * The MQTT topic to publish commands to change the light’s color temperature state. The color temperature command slider has a range of 153 to 500 mireds (micro reciprocal degrees).
   * https://www.home-assistant.io/integrations/light.mqtt/#color_temp_command_topic
   */
  color_temp_command_topic?: string;

  /**
   * The MQTT topic subscribed to receive color temperature state updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#color_temp_state_topic
   */
  color_temp_state_topic?: string;

  /**
   * Defines a template to extract the color temperature value.
   * https://www.home-assistant.io/integrations/light.mqtt/#color_temp_value_template
   */
  color_temp_value_template?: Template;

  /**
   * The MQTT topic to publish commands to change the switch state.
   * https://www.home-assistant.io/integrations/light.mqtt/#command_topic
   */
  command_topic: string;

  /**
   * Information about the device this light is a part of to tie it into the device registry. Only works through MQTT discovery and when unique_id is set.
   * https://www.home-assistant.io/integrations/light.mqtt/#device
   */
  device?: {
    /**
     * A list of connections of the device to the outside world as a list of tuples.
     * https://www.home-assistant.io/integrations/light.mqtt#connections
     */
    connections?: { [key: string]: string };

    /**
     * A list of IDs that uniquely identify the device. For example a serial number.
     * https://www.home-assistant.io/integrations/light.mqtt#identifiers
     */
    identifier?: string;

    /**
     * The manufacturer of the device.
     * https://www.home-assistant.io/integrations/light.mqtt#manufacturer
     */
    manufacturer?: string;

    /**
     * The model of the device.
     * https://www.home-assistant.io/integrations/light.mqtt#model
     */
    model?: string;

    /**
     * The name of the device.
     * https://www.home-assistant.io/integrations/light.mqtt#name
     */
    name?: string;

    /**
     * The firmware version of the device.
     * https://www.home-assistant.io/integrations/light.mqtt#sw_version
     */
    sw_version?: string;

    /**
     * Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device.
     * https://www.home-assistant.io/integrations/light.mqtt#via_device
     */
    via_device?: string;
  };

  /**
   * The MQTT topic to publish commands to change the light’s effect state.
   * https://www.home-assistant.io/integrations/light.mqtt/#effect_command_topic
   */
  effect_command_topic?: string;

  /**
   * The list of effects the light supports.
   * https://www.home-assistant.io/integrations/light.mqtt/#effect_list
   */
  effect_list?: string;

  /**
   * The MQTT topic subscribed to receive effect state updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#effect_state_topic
   */
  effect_state_topic?: string;

  /**
   * Defines a template to extract the effect value.
   * https://www.home-assistant.io/integrations/light.mqtt/#effect_value_template
   */
  effect_value_template?: Template;

  /**
   * The MQTT topic to publish commands to change the light’s color state in HS format (Hue Saturation). Range for Hue: 0° .. 360°, Range of Saturation: 0..100.
   * https://www.home-assistant.io/integrations/light.mqtt/#hs_command_topic
   */
  hs_command_topic?: string;

  /**
   * The MQTT topic subscribed to receive color state updates in HS format.
   * https://www.home-assistant.io/integrations/light.mqtt/#hs_state_topic
   */
  hs_state_topic?: string;

  /**
   * Defines a template to extract the HS value.
   * https://www.home-assistant.io/integrations/light.mqtt/#hs_value_template
   */
  hs_value_template?: Template;

  /**
   * Defines a template to extract the JSON dictionary from messages received on the json_attributes_topic.
   * https://www.home-assistant.io/integrations/light.mqtt#json_attributes_template
   */
  json_attributes_template?: Template;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes.
   * https://www.home-assistant.io/integrations/light.mqtt#json_attributes_topic
   */
  json_attributes_topic?: string;

  /**
   * The maximum color temperature in mireds.
   * https://www.home-assistant.io/integrations/light.mqtt/#max_mireds
   */
  max_mireds?: Integer;

  /**
   * The minimum color temperature in mireds.
   * https://www.home-assistant.io/integrations/light.mqtt/#min_mireds
   */
  min_mireds?: Integer;

  /**
   * The name of the MQTT light.
   * https://www.home-assistant.io/integrations/light.mqtt#name
   */
  name?: string;

  /**
   * Defines when on the payload_on is sent. Using last (the default) will send any style (brightness, color, etc) topics first and then a payload_on to the command_topic.
   * https://www.home-assistant.io/integrations/light.mqtt/#on_command_type
   */
  on_command_type?: string;

  /**
   * Flag that defines if light works in optimistic mode.
   * https://www.home-assistant.io/integrations/light.mqtt/#optimistic
   */
  optimistic?: boolean;

  /**
   * The payload that represents the online state.
   * https://www.home-assistant.io/integrations/light.mqtt/#payload_available
   */
  payload_available?: string;

  /**
   * The payload that represents the offline state.
   * https://www.home-assistant.io/integrations/light.mqtt/#payload_not_available
   */
  payload_not_available?: string;

  /**
   * The payload that represents disabled state.
   * https://www.home-assistant.io/integrations/light.mqtt/#payload_off
   */
  payload_off?: string;

  /**
   * The payload that represents enabled state.
   * https://www.home-assistant.io/integrations/light.mqtt/#payload_on
   */
  payload_on?: string;

  /**
   * The maximum QoS level to be used when receiving and publishing messages.
   * https://www.home-assistant.io/integrations/light.mqtt/#qos
   */
  qos?: QOS;

  /**
   * Defines if published messages should have the retain flag set.
   * https://www.home-assistant.io/integrations/light.mqtt/#retain
   */
  retain?: boolean;

  /**
   * Defines a template to compose message which will be sent to rgb_command_topic. Available variables: red, green and blue.
   * https://www.home-assistant.io/integrations/light.mqtt/#rgb_command_template
   */
  rgb_command_template?: Template;

  /**
   * The MQTT topic to publish commands to change the light’s RGB state. Please note that the color value sent by Home Assistant is normalized to full brightness if brightness_command_topic is set.
   * https://www.home-assistant.io/integrations/light.mqtt/#rgb_command_topic
   */
  rgb_command_topic?: string;

  /**
   * The MQTT topic subscribed to receive RGB state updates. The expected payload is the RGB values separated by commas, for example, 255,0,127.
   * https://www.home-assistant.io/integrations/light.mqtt/#rgb_state_topic
   */
  rgb_state_topic?: string;

  /**
   * Defines a template to extract the RGB value.
   * https://www.home-assistant.io/integrations/light.mqtt/#rgb_value_template
   */
  rgb_value_template?: Template;

  /**
   * The MQTT topic subscribed to receive state updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#state_topic
   */
  state_topic?: string;

  /**
   * Defines a template to extract a value from the state.
   * https://www.home-assistant.io/integrations/light.mqtt/#state_value_template
   */
  state_value_template?: Template;

  /**
   * An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception.
   * https://www.home-assistant.io/integrations/light.mqtt#unique_id
   */
  unique_id?: string;

  /**
   * The MQTT topic to publish commands to change the light’s white value.
   * https://www.home-assistant.io/integrations/light.mqtt/#white_value_command_topic
   */
  white_value_command_topic?: string;

  /**
   * Defines the maximum white value (i.e., 100%) of the MQTT device.
   * https://www.home-assistant.io/integrations/light.mqtt/#white_value_scale
   */
  white_value_scale?: Integer;

  /**
   * The MQTT topic subscribed to receive white value updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#white_value_state_topic
   */
  white_value_state_topic?: string;

  /**
   * Defines a template to extract the white value.
   * https://www.home-assistant.io/integrations/light.mqtt/#white_value_template
   */
  white_value_template?: Template;

  /**
   * The MQTT topic to publish commands to change the light’s XY state.
   * https://www.home-assistant.io/integrations/light.mqtt/#xy_command_topic
   */
  xy_command_topic?: string;

  /**
   * The MQTT topic subscribed to receive XY state updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#xy_state_topic
   */
  xy_state_topic?: string;

  /**
   * Defines a template to extract the XY value.
   * https://www.home-assistant.io/integrations/light.mqtt/#xy_value_template
   */
  xy_value_template?: Template;
}

export interface LightJSONPlatformSchema extends PlatformSchema {
  /**
   * The mqtt light platform lets you control your MQTT enabled lights through one of the supported message schemas, default, json or template.
   * https://www.home-assistant.io/integrations/light.mqtt/
   */
  platform: "mqtt";

  /**
   * The mqtt light platform with default schema lets you control your MQTT enabled lights. It supports setting brightness, color temperature, effects, flashing, on/off, RGB colors, transitions, XY colors and white values.
   * https://www.home-assistant.io/integrations/light.mqtt/#json-schema---configuration
   */
  schema?: "json";

  /**
   * A list of MQTT topics subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#availability
   */
  availability?: {
    /**
     * The MQTT topic subscribed to receive availability (online/offline) updates.
     * https://www.home-assistant.io/integrations/light.mqtt/#topic
     */
    topic: string;

    /**
     * The payload that represents the available state.
     * https://www.home-assistant.io/integrations/light.mqtt/#payload_available
     */
    payload_available?: string;

    /**
     * The payload that represents the unavailable state.
     * https://www.home-assistant.io/integrations/light.mqtt/#payload_not_available
     */
    payload_not_available?: string;
  }[];

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#availability_topic
   */
  availability_topic?: string;

  /**
   * Flag that defines if the light supports brightness.
   * https://www.home-assistant.io/integrations/light.mqtt/#brightness
   */
  brightness?: boolean;

  /**
   * Defines the maximum brightness value (i.e., 100%) of the MQTT device.
   * https://www.home-assistant.io/integrations/light.mqtt/#brightness_scale
   */
  brightness_scale?: Integer;

  /**
   * Flag that defines if the light supports color temperature.
   * https://www.home-assistant.io/integrations/light.mqtt/#color_temp
   */
  color_temp?: boolean;

  /**
   * The MQTT topic to publish commands to change the switch state.
   * https://www.home-assistant.io/integrations/light.mqtt/#command_topic
   */
  command_topic: string;

  /**
   * Information about the device this light is a part of to tie it into the device registry. Only works through MQTT discovery and when unique_id is set.
   * https://www.home-assistant.io/integrations/light.mqtt/#device
   */
  device?: {
    /**
     * A list of connections of the device to the outside world as a list of tuples.
     * https://www.home-assistant.io/integrations/light.mqtt#connections
     */
    connections?: { [key: string]: string };

    /**
     * A list of IDs that uniquely identify the device. For example a serial number.
     * https://www.home-assistant.io/integrations/light.mqtt#identifiers
     */
    identifier?: string;

    /**
     * The manufacturer of the device.
     * https://www.home-assistant.io/integrations/light.mqtt#manufacturer
     */
    manufacturer?: string;

    /**
     * The model of the device.
     * https://www.home-assistant.io/integrations/light.mqtt#model
     */
    model?: string;

    /**
     * The name of the device.
     * https://www.home-assistant.io/integrations/light.mqtt#name
     */
    name?: string;

    /**
     * The firmware version of the device.
     * https://www.home-assistant.io/integrations/light.mqtt#sw_version
     */
    sw_version?: string;

    /**
     * Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device.
     * https://www.home-assistant.io/integrations/light.mqtt#via_device
     */
    via_device?: string;
  };

  /**
   * Flag that defines if the light supports effects.
   * https://www.home-assistant.io/integrations/light.mqtt/#effect
   */
  effect?: boolean;

  /**
   * The list of effects the light supports.
   * https://www.home-assistant.io/integrations/light.mqtt/#effect_list
   */
  effect_list?: string;

  /**
   * The duration, in seconds, of a “long” flash.
   * https://www.home-assistant.io/integrations/light.mqtt/#flash_time_long
   */
  flash_time_long?: Integer;

  /**
   * The duration, in seconds, of a “short” flash.
   * https://www.home-assistant.io/integrations/light.mqtt/#flash_time_short
   */
  flash_time_short?: Integer;

  /**
   * Flag that defines if the light supports HS colors.
   * https://www.home-assistant.io/integrations/light.mqtt/#hs
   */
  hs?: boolean;

  /**
   * Defines a template to extract the JSON dictionary from messages received on the json_attributes_topic.
   * https://www.home-assistant.io/integrations/light.mqtt#json_attributes_template
   */
  json_attributes_template?: Template;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes.
   * https://www.home-assistant.io/integrations/light.mqtt#json_attributes_topic
   */
  json_attributes_topic?: string;

  /**
   * The maximum color temperature in mireds.
   * https://www.home-assistant.io/integrations/light.mqtt/#max_mireds
   */
  max_mireds?: Integer;

  /**
   * The minimum color temperature in mireds.
   * https://www.home-assistant.io/integrations/light.mqtt/#min_mireds
   */
  min_mireds?: Integer;

  /**
   * The name of the MQTT light.
   * https://www.home-assistant.io/integrations/light.mqtt#name
   */
  name?: string;

  /**
   * Flag that defines if light works in optimistic mode.
   * https://www.home-assistant.io/integrations/light.mqtt/#optimistic
   */
  optimistic?: boolean;

  /**
   * The payload that represents the online state.
   * https://www.home-assistant.io/integrations/light.mqtt/#payload_available
   */
  payload_available?: string;

  /**
   * The payload that represents the offline state.
   * https://www.home-assistant.io/integrations/light.mqtt/#payload_not_available
   */
  payload_not_available?: string;

  /**
   * The maximum QoS level to be used when receiving and publishing messages.
   * https://www.home-assistant.io/integrations/light.mqtt/#qos
   */
  qos?: QOS;

  /**
   * Defines if published messages should have the retain flag set.
   * https://www.home-assistant.io/integrations/light.mqtt/#retain
   */
  retain?: boolean;

  /**
   * Flag that defines if the light supports RGB colors.
   * https://www.home-assistant.io/integrations/light.mqtt/#rgb
   */
  rgb?: boolean;

  /**
   * The MQTT topic subscribed to receive state updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#state_topic
   */
  state_topic?: string;

  /**
   * An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception.
   * https://www.home-assistant.io/integrations/light.mqtt#unique_id
   */
  unique_id?: string;

  /**
   * Flag that defines if the light supports white values.
   * https://www.home-assistant.io/integrations/light.mqtt/#white_value
   */
  white_value?: boolean;

  /**
   * Flag that defines if the light supports XY colors.
   * https://www.home-assistant.io/integrations/light.mqtt/#xy
   */
  xy?: boolean;
}

export interface LightTemplatePlatformSchema extends PlatformSchema {
  /**
   * The mqtt light platform lets you control your MQTT enabled lights through one of the supported message schemas, default, json or template.
   * https://www.home-assistant.io/integrations/light.mqtt/
   */
  platform: "mqtt";

  /**
   * The mqtt light platform with default schema lets you control your MQTT enabled lights. It supports setting brightness, color temperature, effects, flashing, on/off, RGB colors, transitions, XY colors and white values.
   * https://www.home-assistant.io/integrations/light.mqtt/#json-schema---configuration
   */
  schema?: "template";

  /**
   * A list of MQTT topics subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#availability
   */
  availability?: {
    /**
     * The MQTT topic subscribed to receive availability (online/offline) updates.
     * https://www.home-assistant.io/integrations/light.mqtt/#topic
     */
    topic: string;

    /**
     * The payload that represents the available state.
     * https://www.home-assistant.io/integrations/light.mqtt/#payload_available
     */
    payload_available?: string;

    /**
     * The payload that represents the unavailable state.
     * https://www.home-assistant.io/integrations/light.mqtt/#payload_not_available
     */
    payload_not_available?: string;
  }[];

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#availability_topic
   */
  availability_topic?: string;

  /**
   * Template to extract blue color from the state payload value.
   * https://www.home-assistant.io/integrations/light.mqtt/#blue_template
   */
  blue_template?: Template;

  /**
   * Template to extract brightness from the state payload value.
   * https://www.home-assistant.io/integrations/light.mqtt/#brightness_template
   */
  brightness_template?: Template;

  /**
   * Template to extract color temperature from the state payload value.
   * https://www.home-assistant.io/integrations/light.mqtt/#color_temp_template
   */
  color_temp_template?: Template;

  /**
   * The template for off state changes. Available variables: state and transition.
   * https://www.home-assistant.io/integrations/light.mqtt/#command_off_template
   */
  command_off_template: Template;

  /**
   * The template for on state changes. Available variables: state, brightness, red, green, blue, white_value, flash, transition and effect.
   * https://www.home-assistant.io/integrations/light.mqtt/#command_on_template
   */
  command_on_template: Template;

  /**
   * The MQTT topic to publish commands to change the switch state.
   * https://www.home-assistant.io/integrations/light.mqtt/#command_topic
   */
  command_topic: string;

  /**
   * Information about the device this light is a part of to tie it into the device registry. Only works through MQTT discovery and when unique_id is set.
   * https://www.home-assistant.io/integrations/light.mqtt/#device
   */
  device?: {
    /**
     * A list of connections of the device to the outside world as a list of tuples.
     * https://www.home-assistant.io/integrations/light.mqtt#connections
     */
    connections?: { [key: string]: string };

    /**
     * A list of IDs that uniquely identify the device. For example a serial number.
     * https://www.home-assistant.io/integrations/light.mqtt#identifiers
     */
    identifier?: string;

    /**
     * The manufacturer of the device.
     * https://www.home-assistant.io/integrations/light.mqtt#manufacturer
     */
    manufacturer?: string;

    /**
     * The model of the device.
     * https://www.home-assistant.io/integrations/light.mqtt#model
     */
    model?: string;

    /**
     * The name of the device.
     * https://www.home-assistant.io/integrations/light.mqtt#name
     */
    name?: string;

    /**
     * The firmware version of the device.
     * https://www.home-assistant.io/integrations/light.mqtt#sw_version
     */
    sw_version?: string;

    /**
     * Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device.
     * https://www.home-assistant.io/integrations/light.mqtt#via_device
     */
    via_device?: string;
  };

  /**
   * The list of effects the light supports.
   * https://www.home-assistant.io/integrations/light.mqtt/#effect_list
   */
  effect_list?: string;

  /**
   * Template to extract effect from the state payload value.
   * https://www.home-assistant.io/integrations/light.mqtt/#effect_template
   */
  effect_template?: Template;

  /**
   * Template to extract green color from the state payload value.
   * https://www.home-assistant.io/integrations/light.mqtt/#green_template
   */
  green_template?: Template;

  /**
   * Defines a template to extract the JSON dictionary from messages received on the json_attributes_topic.
   * https://www.home-assistant.io/integrations/light.mqtt#json_attributes_template
   */
  json_attributes_template?: Template;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes.
   * https://www.home-assistant.io/integrations/light.mqtt#json_attributes_topic
   */
  json_attributes_topic?: string;

  /**
   * The maximum color temperature in mireds.
   * https://www.home-assistant.io/integrations/light.mqtt/#max_mireds
   */
  max_mireds?: Integer;

  /**
   * The minimum color temperature in mireds.
   * https://www.home-assistant.io/integrations/light.mqtt/#min_mireds
   */
  min_mireds?: Integer;

  /**
   * The name of the MQTT light.
   * https://www.home-assistant.io/integrations/light.mqtt#name
   */
  name?: string;

  /**
   * Flag that defines if light works in optimistic mode.
   * https://www.home-assistant.io/integrations/light.mqtt/#optimistic
   */
  optimistic?: boolean;

  /**
   * The payload that represents the online state.
   * https://www.home-assistant.io/integrations/light.mqtt/#payload_available
   */
  payload_available?: string;

  /**
   * The payload that represents the offline state.
   * https://www.home-assistant.io/integrations/light.mqtt/#payload_not_available
   */
  payload_not_available?: string;

  /**
   * The maximum QoS level to be used when receiving and publishing messages.
   * https://www.home-assistant.io/integrations/light.mqtt/#qos
   */
  qos?: QOS;

  /**
   * Template to extract red color from the state payload value.
   * https://www.home-assistant.io/integrations/light.mqtt/#red_template
   */
  red_template?: string;

  /**
   * The MQTT topic subscribed to receive state updates.
   * https://www.home-assistant.io/integrations/light.mqtt/#state_topic
   */
  state_topic?: string;

  /**
   * An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception.
   * https://www.home-assistant.io/integrations/light.mqtt#unique_id
   */
  unique_id?: string;

  /**
   * Template to extract white value from the state payload value.
   * https://www.home-assistant.io/integrations/light.mqtt/#white_value_template
   */
  white_value_template?: Template;
}

export interface LockPlatformSchema extends PlatformSchema {
  /**
   * The mqtt lock platform lets you control your MQTT enabled locks.
   * https://www.home-assistant.io/integrations/lock.mqtt/
   */
  platform: "mqtt";

  /**
   * A list of MQTT topics subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/lock.mqtt/#availability
   */
  availability?: {
    /**
     * The MQTT topic subscribed to receive availability (online/offline) updates.
     * https://www.home-assistant.io/integrations/lock.mqtt/#topic
     */
    topic: string;

    /**
     * The payload that represents the available state.
     * https://www.home-assistant.io/integrations/lock.mqtt/#payload_available
     */
    payload_available?: string;

    /**
     * The payload that represents the unavailable state.
     * https://www.home-assistant.io/integrations/lock.mqtt/#payload_not_available
     */
    payload_not_available?: string;
  }[];

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/lock.mqtt/#availability_topic
   */
  availability_topic?: string;

  /**
   * The MQTT topic to publish commands to change the lock state.
   * https://www.home-assistant.io/integrations/lock.mqtt/#command_topic
   */
  command_topic: string;

  /**
   * Information about the device this lock is a part of to tie it into the device registry. Only works through MQTT discovery and when unique_id is set.
   * https://www.home-assistant.io/integrations/lock.mqtt/#device
   */
  device?: {
    /**
     * A list of connections of the device to the outside world as a list of tuples.
     * https://www.home-assistant.io/integrations/lock.mqtt#connections
     */
    connections?: { [key: string]: string };

    /**
     * A list of IDs that uniquely identify the device. For example a serial number.
     * https://www.home-assistant.io/integrations/lock.mqtt#identifiers
     */
    identifier?: string;

    /**
     * The manufacturer of the device.
     * https://www.home-assistant.io/integrations/lock.mqtt#manufacturer
     */
    manufacturer?: string;

    /**
     * The model of the device.
     * https://www.home-assistant.io/integrations/lock.mqtt#model
     */
    model?: string;

    /**
     * The name of the device.
     * https://www.home-assistant.io/integrations/lock.mqtt#name
     */
    name?: string;

    /**
     * The firmware version of the device.
     * https://www.home-assistant.io/integrations/lock.mqtt#sw_version
     */
    sw_version?: string;

    /**
     * Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device.
     * https://www.home-assistant.io/integrations/lock.mqtt#via_device
     */
    via_device?: string;
  };

  /**
   * Defines a template to extract the JSON dictionary from messages received on the json_attributes_topic.
   * https://www.home-assistant.io/integrations/lock.mqtt#json_attributes_template
   */
  json_attributes_template?: Template;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes.
   * https://www.home-assistant.io/integrations/lock.mqtt#json_attributes_topic
   */
  json_attributes_topic?: string;

  /**
   * The name of the MQTT lock.
   * https://www.home-assistant.io/integrations/lock.mqtt#name
   */
  name?: string;

  /**
   * Flag that defines if lock works in optimistic mode.
   * https://www.home-assistant.io/integrations/lock.mqtt/#optimistic
   */
  optimistic?: boolean;

  /**
   * The payload that represents the online state.
   * https://www.home-assistant.io/integrations/lock.mqtt/#payload_available
   */
  payload_available?: string;

  /**
   * The payload that represents enabled/locked state.
   * https://www.home-assistant.io/integrations/lock.mqtt/#payload_lock
   */
  payload_lock?: string;

  /**
   * The payload that represents the offline state.
   * https://www.home-assistant.io/integrations/lock.mqtt/#payload_not_available
   */
  payload_not_available?: string;

  /**
   * The value that represents the lock to be in unlocked state.
   * https://www.home-assistant.io/integrations/lock.mqtt/#state_unlocked
   */
  payload_unlock?: string;

  /**
   * The maximum QoS level to be used when receiving and publishing messages.
   * https://www.home-assistant.io/integrations/lock.mqtt/#qos
   */
  qos?: QOS;

  /**
   * If the published message should have the retain flag on or not.
   * https://www.home-assistant.io/integrations/lock.mqtt/#retain
   */
  retain?: boolean;

  /**
   * The value that represents the lock to be in locked state.
   * https://www.home-assistant.io/integrations/lock.mqtt/#state_locked
   */
  state_locked?: string;

  /**
   * The MQTT topic subscribed to receive state updates.
   * https://www.home-assistant.io/integrations/lock.mqtt/#state_topic
   */
  state_topic?: string;

  /**
   * The value that represents the lock to be in unlocked state.
   * https://www.home-assistant.io/integrations/lock.mqtt/#state_unlocked
   */
  state_unlocked?: string;

  /**
   * An ID that uniquely identifies this light. If two lights have the same unique ID, Home Assistant will raise an exception.
   * https://www.home-assistant.io/integrations/lock.mqtt#unique_id
   */
  unique_id?: string;

  /**
   * Defines a template to extract a value from the payload.
   * https://www.home-assistant.io/integrations/lock.mqtt/#value_template
   */
  value_template?: Template;
}

export interface SensorPlatformSchema extends PlatformSchema {
  /**
   * This mqtt sensor platform uses the MQTT message payload as the sensor value.
   * https://www.home-assistant.io/integrations/sensor.mqtt
   */
  platform: "mqtt";

  /**
   * Set multiple availability topics for this sensor.
   */
  availability?: {
    /**
     * The MQTT topic subscribed to receive availability (online/offline) updates.
     * https://www.home-assistant.io/integrations/sensor.mqtt#availability_topic
     */
    topic?: string;

    /**
     * The payload that represents the available state.
     * https://www.home-assistant.io/integrations/sensor.mqtt#payload_available
     */
    payload_available?: string;

    /**
     * The payload that represents the unavailable state.
     * https://www.home-assistant.io/integrations/sensor.mqtt#payload_not_available
     */
    payload_not_available?: string;
  }[];

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/sensor.mqtt#availability_topic
   */
  availability_topic?: string;

  /**
   * The type/class of the sensor to set the icon in the frontend.
   * https://www.home-assistant.io/integrations/sensor.mqtt#device_class
   */
  device_class?: DeviceClassesSensor;

  /**
   * Information about the device this sensor is a part of to tie it into the device registry. Only works through MQTT discovery and when unique_id is set.
   * https://www.home-assistant.io/integrations/sensor.mqtt#device
   */
  device?: {
    /**
     * A list of connections of the device to the outside world as a list of tuples.
     * https://www.home-assistant.io/integrations/sensor.mqtt#connections
     */
    connections?: { [key: string]: string };

    /**
     * A list of IDs that uniquely identify the device. For example a serial number.
     * https://www.home-assistant.io/integrations/sensor.mqtt#identifiers
     */
    identifier?: string;

    /**
     * The manufacturer of the device.
     * https://www.home-assistant.io/integrations/sensor.mqtt#manufacturer
     */
    manufacturer?: string;

    /**
     * The model of the device.
     * https://www.home-assistant.io/integrations/sensor.mqtt#model
     */
    model?: string;

    /**
     * The name of the device.
     * https://www.home-assistant.io/integrations/sensor.mqtt#name
     */
    name?: string;

    /**
     * The firmware version of the device.
     * https://www.home-assistant.io/integrations/sensor.mqtt#sw_version
     */
    sw_version?: string;

    /**
     * Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device.
     * https://www.home-assistant.io/integrations/sensor.mqtt#via_device
     */
    via_device?: string;
  };

  /**
   * Defines the number of seconds after the sensor’s state expires, if it’s not updated. After expiry, the sensor’s state becomes unavailable.
   * https://www.home-assistant.io/integrations/sensor.mqtt#expire_after
   */
  expire_after?: PositiveInteger;

  /**
   * Sends update events even if the value hasn’t changed. Useful if you want to have meaningful value graphs in history.
   * https://www.home-assistant.io/integrations/sensor.mqtt#expire_after
   */
  force_update?: boolean;

  /**
   * The icon for the sensor.
   * https://www.home-assistant.io/integrations/sensor.mqtt#icon
   */
  icon?: string;

  /**
   * Defines a template to extract the JSON dictionary from messages received on the json_attributes_topic.
   * https://www.home-assistant.io/integrations/sensor.mqtt#json_attributes_template
   */
  json_attributes_template?: Template;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Implies force_update of the current sensor state when a message is received on this topic.
   * https://www.home-assistant.io/integrations/sensor.mqtt#json_attributes_topic
   */
  json_attributes_topic?: string;

  /**
   * The name of the MQTT sensor.
   * https://www.home-assistant.io/integrations/sensor.mqtt#name
   */
  name?: string;

  /**
   * The payload that represents the available state.
   * https://www.home-assistant.io/integrations/sensor.mqtt#payload_available
   */
  payload_available?: string;

  /**
   * The payload that represents the unavailable state.
   * https://www.home-assistant.io/integrations/sensor.mqtt#payload_not_available
   */
  payload_not_available?: string;

  /**
   * The maximum QoS level of the state topic.
   * https://www.home-assistant.io/integrations/sensor.mqtt#qos
   */
  qos?: QOS;

  /**
   * The MQTT topic subscribed to receive sensor values.
   * https://www.home-assistant.io/integrations/sensor.mqtt#state_topic
   */
  state_topic: string;

  /**
   * An ID that uniquely identifies this sensor. If two sensors have the same unique ID, Home Assistant will raise an exception.
   * https://www.home-assistant.io/integrations/sensor.mqtt#unique_id
   */
  unique_id?: string;

  /**
   * Defines the units of measurement of the sensor, if any.
   * https://www.home-assistant.io/integrations/sensor.mqtt#unit_of_measurement
   */
  unit_of_measurement?: string;

  /**
   * Defines a template to extract the value.
   * https://www.home-assistant.io/integrations/sensor.mqtt#value_template
   */
  value_template?: Template;
}

export interface VacuumPlatformSchema extends PlatformSchema {
  /**
   * The mqtt vacuum integration allows you to control your MQTT-enabled vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt
   */
  platform: "mqtt";

  /**
   * The schema to use. Must be state to select the state schema.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#schema
   */
  schema: "state";

  /**
   * Set multiple availability topics for this vacuum.
   */
  availability?: {
    /**
     * The MQTT topic subscribed to receive availability (online/offline) updates.
     * https://www.home-assistant.io/integrations/vacuum.mqtt#availability_topic
     */
    topic?: string;

    /**
     * The payload that represents the available state.
     * https://www.home-assistant.io/integrations/vacuum.mqtt#payload_available
     */
    payload_available?: string;

    /**
     * The payload that represents the unavailable state.
     * https://www.home-assistant.io/integrations/vacuum.mqtt#payload_not_available
     */
    payload_not_available?: string;
  }[];

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#availability_topic
   */
  availability_topic?: string;

  /**
   * The MQTT topic to publish commands to control the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#command_topic
   */
  command_topic?: string;

  /**
   * Information about the device this vacuum is a part of to tie it into the device registry. Only works through MQTT discovery and when unique_id is set.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#device
   */
  device?: {
    /**
     * A list of connections of the device to the outside world as a list of tuples.
     * https://www.home-assistant.io/integrations/vacuum.mqtt#connections
     */
    connections?: { [key: string]: string };

    /**
     * A list of IDs that uniquely identify the device. For example a serial number.
     * https://www.home-assistant.io/integrations/vacuum.mqtt#identifiers
     */
    identifier?: string;

    /**
     * The manufacturer of the device.
     * https://www.home-assistant.io/integrations/vacuum.mqtt#manufacturer
     */
    manufacturer?: string;

    /**
     * The model of the device.
     * https://www.home-assistant.io/integrations/vacuum.mqtt#model
     */
    model?: string;

    /**
     * The name of the device.
     * https://www.home-assistant.io/integrations/vacuum.mqtt#name
     */
    name?: string;

    /**
     * The firmware version of the device.
     * https://www.home-assistant.io/integrations/vacuum.mqtt#sw_version
     */
    sw_version?: string;

    /**
     * Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device.
     * https://www.home-assistant.io/integrations/vacuum.mqtt#via_device
     */
    via_device?: string;
  };

  /**
   * List of possible fan speeds for the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#fan_speed_list
   */
  fan_speed_list?: string[];

  /**
   * Defines a template to define the fan speed of the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#fan_speed_template
   */
  fan_speed_template?: Template;

  /**
   * The MQTT topic subscribed to receive fan speed values from the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#fan_speed_topic
   */
  fan_speed_topic?: string;

  /**
   * Defines a template to extract the JSON dictionary from messages received on the json_attributes_topic.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#json_attributes_template
   */
  json_attributes_template?: Template;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Implies force_update of the current sensor state when a message is received on this topic.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#json_attributes_topic
   */
  json_attributes_topic?: string;

  /**
   * The name of the MQTT vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#name
   */
  name?: string;

  /**
   * The payload that represents the available state.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#payload_available
   */
  payload_available?: string;

  /**
   * The payload to send to the command_topic to begin a spot cleaning cycle.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#payload_clean_spot
   */
  payload_clean_spot?: string;

  /**
   * The payload to send to the command_topic to locate the vacuum (typically plays a song).
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#payload_locate
   */
  payload_locate?: string;

  /**
   * The payload that represents the unavailable state.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#payload_not_available
   */
  payload_not_available?: string;

  /**
   * The payload to send to the command_topic to pause the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#payload_pause
   */
  payload_pause?: string;

  /**
   * The payload to send to the command_topic to tell the vacuum to return to base.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#payload_return_to_base
   */
  payload_return_to_base?: string;

  /**
   * The payload to send to the command_topic to begin the cleaning cycle.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#payload_start
   */
  payload_start?: string;

  /**
   * The payload to send to the command_topic to stop the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#payload_stop
   */
  payload_stop?: string;

  /**
   * The maximum QoS level of the state topic.
   * https://www.home-assistant.io/integrations/sensor.mqtt#qos
   */
  qos?: QOS;

  /**
   * If the published message should have the retain flag on or not.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#retain
   */
  retain?: boolean;

  /**
   * The MQTT topic to publish custom commands to the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#send_command_topic
   */
  send_command_topic?: string;

  /**
   * The MQTT topic to publish commands to control the vacuum’s fan speed.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#set_fan_speed_topic
   */
  set_fan_speed_topic?: string;

  /**
   * The MQTT topic subscribed to receive state messages from the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#state_topic
   */
  state_topic: string;

  /**
   * List of features that the vacuum supports (possible values are start, stop, pause, return_home, battery, status, locate, clean_spot, fan_speed, send_command).
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#supported_features
   */
  supported_features?: string[];

  /**
   * An ID that uniquely identifies this vacuum. If two vacuums have the same unique ID, Home Assistant will raise an exception.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#unique_id
   */
  unique_id?: string;
}

export interface VacuumLegacyPlatformSchema extends PlatformSchema {
  /**
   * The mqtt vacuum integration allows you to control your MQTT-enabled vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt
   */
  platform: "mqtt";

  /**
   * The schema to use. Must be state to select the state schema.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#schema
   */
  schema?: "legacy";

  /**
   * Set multiple availability topics for this vacuum.
   */
  availability?: {
    /**
     * The MQTT topic subscribed to receive availability (online/offline) updates.
     * https://www.home-assistant.io/integrations/vacuum.mqtt#availability_topic
     */
    topic?: string;

    /**
     * The payload that represents the available state.
     * https://www.home-assistant.io/integrations/vacuum.mqtt#payload_available
     */
    payload_available?: string;

    /**
     * The payload that represents the unavailable state.
     * https://www.home-assistant.io/integrations/vacuum.mqtt#payload_not_available
     */
    payload_not_available?: string;
  }[];

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#availability_topic
   */
  availability_topic?: string;

  /**
   * DEPRECATED
   * This option is part of the deprecated legacy MQTT vacuum schema.
   * New installations should use the state schema as legacy is deprecated and might be removed someday in the future.
   */
  battery_level_template?: Deprecated;

  /**
   * DEPRECATED
   * This option is part of the deprecated legacy MQTT vacuum schema.
   * New installations should use the state schema as legacy is deprecated and might be removed someday in the future.
   */
  battery_level_topic?: Deprecated;

  /**
   * DEPRECATED
   * This option is part of the deprecated legacy MQTT vacuum schema.
   * New installations should use the state schema as legacy is deprecated and might be removed someday in the future.
   */
  charging_template?: Deprecated;

  /**
   * DEPRECATED
   * This option is part of the deprecated legacy MQTT vacuum schema.
   * New installations should use the state schema as legacy is deprecated and might be removed someday in the future.
   */
  charging_topic?: Deprecated;

  /**
   * DEPRECATED
   * This option is part of the deprecated legacy MQTT vacuum schema.
   * New installations should use the state schema as legacy is deprecated and might be removed someday in the future.
   */
  cleaning_template?: Deprecated;

  /**
   * DEPRECATED
   * This option is part of the deprecated legacy MQTT vacuum schema.
   * New installations should use the state schema as legacy is deprecated and might be removed someday in the future.
   */
  cleaning_topic?: Deprecated;

  /**
   * The MQTT topic to publish commands to control the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#command_topic
   */
  command_topic?: string;

  /**
   * DEPRECATED
   * This option is part of the deprecated legacy MQTT vacuum schema.
   * New installations should use the state schema as legacy is deprecated and might be removed someday in the future.
   */
  docked_template?: Deprecated;

  /**
   * DEPRECATED
   * This option is part of the deprecated legacy MQTT vacuum schema.
   * New installations should use the state schema as legacy is deprecated and might be removed someday in the future.
   */
  docked_topic?: Deprecated;

  /**
   * DEPRECATED
   * This option is part of the deprecated legacy MQTT vacuum schema.
   * New installations should use the state schema as legacy is deprecated and might be removed someday in the future.
   */
  error_template?: Deprecated;

  /**
   * DEPRECATED
   * This option is part of the deprecated legacy MQTT vacuum schema.
   * New installations should use the state schema as legacy is deprecated and might be removed someday in the future.
   */
  error_topic?: Deprecated;

  /**
   * List of possible fan speeds for the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#fan_speed_list
   */
  fan_speed_list?: string[];

  /**
   * Defines a template to define the fan speed of the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#fan_speed_template
   */
  fan_speed_template?: Template;

  /**
   * The MQTT topic subscribed to receive fan speed values from the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#fan_speed_topic
   */
  fan_speed_topic?: string;

  /**
   * Defines a template to extract the JSON dictionary from messages received on the json_attributes_topic.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#json_attributes_template
   */
  json_attributes_template?: Template;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Implies force_update of the current sensor state when a message is received on this topic.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#json_attributes_topic
   */
  json_attributes_topic?: string;

  /**
   * The name of the MQTT vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#name
   */
  name?: string;

  /**
   * The payload that represents the available state.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#payload_available
   */
  payload_available?: string;

  /**
   * The payload to send to the command_topic to begin a spot cleaning cycle.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#payload_clean_spot
   */
  payload_clean_spot?: string;

  /**
   * The payload to send to the command_topic to locate the vacuum (typically plays a song).
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#payload_locate
   */
  payload_locate?: string;

  /**
   * The payload that represents the unavailable state.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#payload_not_available
   */
  payload_not_available?: string;

  /**
   * The payload to send to the command_topic to tell the vacuum to return to base.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#payload_return_to_base
   */
  payload_return_to_base?: string;

  /**
   * DEPRECATED
   * This option is part of the deprecated legacy MQTT vacuum schema.
   * New installations should use the state schema as legacy is deprecated and might be removed someday in the future.
   */
  payload_start_pause?: Deprecated;

  /**
   * The payload to send to the command_topic to stop the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#payload_stop
   */
  payload_stop?: string;

  /**
   * DEPRECATED
   * This option is part of the deprecated legacy MQTT vacuum schema.
   * New installations should use the state schema as legacy is deprecated and might be removed someday in the future.
   */
  payload_turn_on?: Deprecated;
  /**
   * DEPRECATED
   * This option is part of the deprecated legacy MQTT vacuum schema.
   * New installations should use the state schema as legacy is deprecated and might be removed someday in the future.
   */
  payload_turn_off?: Deprecated;

  /**
   * The maximum QoS level of the state topic.
   * https://www.home-assistant.io/integrations/sensor.mqtt#qos
   */
  qos?: QOS;

  /**
   * If the published message should have the retain flag on or not.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#retain
   */
  retain?: boolean;

  /**
   * The MQTT topic to publish custom commands to the vacuum.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#send_command_topic
   */
  send_command_topic?: string;

  /**
   * The MQTT topic to publish commands to control the vacuum’s fan speed.
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#set_fan_speed_topic
   */
  set_fan_speed_topic?: string;

  /**
   * List of features that the vacuum supports (possible values are start, stop, pause, return_home, battery, status, locate, clean_spot, fan_speed, send_command).
   * https://www.home-assistant.io/integrations/vacuum.mqtt/#supported_features
   */
  supported_features?: string[];

  /**
   * An ID that uniquely identifies this vacuum. If two vacuums have the same unique ID, Home Assistant will raise an exception.
   * https://www.home-assistant.io/integrations/vacuum.mqtt#unique_id
   */
  unique_id?: string;
}
