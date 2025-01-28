/**
 * OCEANWAVE Core App Frame
 */
import { OWBaseException } from "./exception.mjs"
import { logger } from "./logger.mjs"

/**
 * @callback MainFunction
 * @param {Array} args - Command list of the program.
 * @returns {number} Exit code
 * @@since 0.0.1
 */

/** 
 * OCEANWAVE Core App Frame Class
 * @since 0.0.1
 */
export class OWAPPFrame {
  /**
   * Debug mode symbol
   * @readonly
   * @type {boolean}
   * @since 0.0.1
   * @example <caption>Use the following code to enable debug mode:</caption>
   * core.app.enableDebug()
   */
  debug;
  /** OCEANWAVE Core App Frame Constructor */
  constructor() {
    this.debug = false
  }
  /**
   * Entry point of OCEANWAVE CLI Program
   * @param {MainFunction} fn 
   * @since 0.0.1
   */
  main(fn){
    try{
      var code = fn(process.argv.slice(1))
      if(typeof(code)!='number'){
        throw new OWBaseException('MainFunction fn must return a number as exit code.','df','df','trh')
      }
      logger.info(`Program exit with code: ${code}`)
      logger.closeLogFile()
    }catch(err){
      logger.fatal(err.toString())
      logger.info(`Program exit with code: -1`)
      logger.closeLogFile()
    }
  }
  /**
   * Enable debug mode
   * @see {@link OWAPPFrame#debug}
   * @since 0.0.1
   */
  enableDebug(){
    this.debug = true
  }
}