/**
 * OCEANWAVE Core Logger
 */

import fs from "node:fs";
import * as nodepath from "node:path";
import { OWBaseException} from "./exception.mjs";
import { OWFileSystem } from "./filesystem.mjs";

/**
 * OCEANWAVE Logger Levels
 * @typedef {"DEBUG"|"INFO"|"WARN"|"ERROR"|"FATAL"|"OFF"} Levels
 * @since 0.0.1
 */

/**
 * Internal Excepton of ow.core.logger
 * @private
 */
class OWLoggerError extends OWBaseException{
  /**
   * OCEANWAVE Logger Exception Constructor
   * @param {string} msg - Error message
   * @param {import("./exception.mjs").ErrorType} type - Error type
   * @param {string} [cause=null] - The cause of this error
   */
  constructor(msg,type,cause=null){
    super(msg,type,'ow.core.logger',cause)
  }
}

/**
 * Internal filesystem instance
 */
const _fs = new OWFileSystem()


/**
 * Known levels list
 */
const _known_levels = ['DEBUG','INFO','WARN','ERROR','FATAL','OFF']

/**
 * Internal function to format output
 * @param {string} format - Logger format string
 * @param {Levels} level - Log level
 * @param {string} msg - Log message
 * @returns {string} Formatted output string
 */
function _formatOutput(format,level,msg){
  var date = new Date()
  return format
    .replace('%YYYY%',date.getFullYear())
    .replace('%MM%',date.getMonth()+1)
    .replace('%DD%',date.getDate())
    .replace('%hh%',date.getHours())
    .replace('%mm%',date.getMinutes())
    .replace('%ss%',date.getSeconds())
    .replace('%level%',level)
    .replace('%msg%',msg)
}

/**
 * Internal function to check whether the level is valid
 * @param {Levels} level - Log level
 * @throws {OWLoggerError}
 */
function _checkLevel(level){
  if(!_known_levels.includes(level)){
    throw new OWLoggerError('Invaild level: \'${level}\'.','ArgumentError',null)
  }
}

/** 
 * OCEANWAVE Core Logger Class
 * @since 0.0.1
 */
export class OWLogger{
  /**
   * Write stream of logger
   * @private
   */
  #ws;
  /**
   * Logger level
   * @private
   */
  #level;
  /**
   * Console logger level
   * @private
   */
  #console_level;
  /**
   * Format string
   * @private
   */
  #format;
  /** OCEANWAVE Core Logger Constructor */
  constructor(){
    this.#ws = null
    this.#level = 'OFF'
    this.#console_level = 'DEBUG'
    this.#format = `[%YYYY%-%MM%-%DD% %hh%:%mm%:%ss%][%level%] %msg%`
  }
  /**
   * Set the lowest level to be recorded
   * @param {Levels} level - Log level
   * @since 0.0.1
   */
  setLogLevel(level){
    _checkLevel(level)
    this.#level = level
  }
  /**
   * Set the lowest level to output in console
   * @param {Levels} level - Log level
   * @since 0.0.1
   */
  setConsoleLogLevel(level){
    _checkLevel(level)
    this.#console_level = level
  }
  /**
   * Set the format string
   * @param {string} format
   * @since 0.0.1 
   */
  setFormat(format){
    this.#format = format
  }
  /**
   * Create a log file
   * @param {string} [path='./logs'] - Log file path
   * @param {string} [name] - Log file name. If it is null, the log file will be like 'YYYY-MM-DD-hh-mm-ss.log'.
   * @since 0.0.1
   */
  createLogFile(path='./logs',name=null){
    var date = new Date()
    if(name == null){
      name = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.log`
    }
    if(!_fs.dirExists(path)){
      _fs.mkdir(path)
    }
    var log_path = nodepath.resolve(path,name)
    this.#ws = fs.createWriteStream(log_path,{flags:'w',encoding:'utf8'})
    this.#ws.write(`// OCEANWAVE CORE LOGGER\n// Created on [${date.toUTCString()}]\n`)
  }
  /**
   * Close the log file
   * @since 0.0.1
   */
  closeLogFile(){
    if(this.#ws!=null){
      this.#ws.close()
    }
  }
  /**
   * Output the log
   * @param {Levels} level - Log level
   * @param {string} msg - Log message
   * @throws {OWLoggerError}
   * @since 0.0.1
   */
  output(level,msg){
    _checkLevel(level)
    if(level == 'OFF'){
      throw new OWLoggerError(`\'OFF\' level is only used for turn off the logger.`,'ArgumentError',null)
    }
    var output = _formatOutput(this.#format, level,msg)
    if(_known_levels.indexOf(level)>=_known_levels.indexOf(this.#level)){
      if(this.#ws!=null){
        this.#ws.write(output+'\n')
      }
    }
    if(_known_levels.indexOf(level)>=_known_levels.indexOf(this.#console_level)){
      switch (level) {
        case 'DEBUG':console.debug(output);break;
        case 'INFO': console.info(output); break;
        case 'WARN': console.warn(output); break;
        case 'ERROR':console.error(output);break;
        case 'FATAL':console.error(output);break;
        default:break;
      }
    }
  }
  /**
   * Output the debug log
   * @param {string} msg - Log message
   * @since 0.0.1
   */
  debug(msg){
    this.output('DEBUG',msg)
  }
  /**
   * Output the info log
   * @param {string} msg - Log message
   * @since 0.0.1
   */
  info(msg){
    this.output('INFO',msg)
  }
  /**
   * Output the warn log
   * @param {string} msg - Log message
   * @since 0.0.1
   */
  warn(msg){
    this.output('WARN',msg)
  }
  /**
   * Output the error log
   * @param {string} msg - Log message
   * @since 0.0.1
   */
  error(msg){
    this.output('ERROR',msg)
  }
  /**
   * Output the fatal log
   * @param {string} msg - Log message
   * @since 0.0.1
   */
  fatal(msg){
    this.output('FATAL',msg)
  }
}

/** 
 * Global instance of {@link OWLogger}
 * @since 0.0.1
 */
export const logger = new OWLogger();