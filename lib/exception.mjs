/**
 * OCEANWAVE Core Exception
 */

/**
 * OCEANWAVE Error Types
 * @typedef {"ArgumentError" | "TypeError" } ErrorType
 * @since 0.0.1
 */

/**
 * OCEANWAVE Base Exception Class
 * @extends Error
 * @since 0.0.1
 */
export class OWBaseException extends Error {
  /**
   * OCEANWAVE Base Exception Constructor
   * @param {string} msg - Error message
   * @param {ErrorType} type - Error type
   * @param {string} [module='ow.core.exception'] - Exception module
   * @param {string} [cause=null] - The cause of this error
   */
  constructor (msg, type, module = 'ow.core.exception', cause = null) {
    super(msg)
    this.name = `${module}.${type}`
    this.cause = cause
    Error.captureStackTrace(this, this.constructor)
  }
  /**
   * Transform Error Object to printable format
   * @returns {string} Printable formatted string
   * @since 0.0.1
   */
  toString(){
    return this.stack + ((this.cause != null) ? `\n  cause: ${this.cause}` : '')
  }
}