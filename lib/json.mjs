/**
 * OCEANWAVE Core JSON
 */
import _ from "lodash/object.js";
import { OWFileSystem } from "./filesystem.mjs";

/**
 * Internal filesystem instance
 */
const _fs = new OWFileSystem()

/**
 * Internal function to read json file
 * @param {string} path - JSON path
 * @returns {object} JSON object
 */
function _read_json(path) {
  var json_obj = JSON.parse(_fs.read(path).content)
  return json_obj
}
/**
 * Internal function to write json file
 * @param {string} path - JSON path 
 * @param {object} obj - JSON object
 */
function _write_json(path, obj) {
  _fs.write(path, JSON.stringify(obj, null, '\t'))
}

/**
 * OCEANWAVE Core JSON Class
 * @since 0.0.1
 */
export class OWJSON{
  /**
   * Create and initialize the JSON file
   * @param {string} json_path - JSON path
   * @param {object} obj - JSON object 
   * @since 0.0.1
   */
  static init(json_path, obj) {
    _write_json(json_path, obj)
  }
  /**
   * Set the value
   * @param {string} json_path - JSON path
   * @param {string} key - Key
   * @param {any} value - Value
   * @since 0.0.1
   */
  static set(json_path, key, value) {
    var json_obj = _read_json(json_path)
    _.set(json_obj, key, value)
    _write_json(json_path, json_obj)
  }
  /**
   * Get the value
   * @param {string} json_path - JSON path
   * @param {string} key - Key
   * @returns {string} Value
   * @since 0.0.1
   */
  static get(json_path, key) {
    var json_obj = _read_json(json_path)
    return _.get(json_obj,key)
  }
}