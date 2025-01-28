/**
 * OCEANWAVE Core Module
 */

import { OWAPPFrame } from "./lib/appframe.mjs";
import { OWFileSystem } from "./lib/filesystem.mjs";
import { OWJSON } from "./lib/json.mjs";
import { OWLogger,logger } from "./lib/logger.mjs";
import { OWBaseException } from "./lib/exception.mjs";

export { OWBaseException }
export { OWFileSystem, OWJSON }

/** 
 * OCEANWAVE Core Class
 * @since 0.0.1
 */
class OWCore{
  /**
   * Instance of {@link OWAPPFrame}
   * @since 0.0.1
   */
  app;
  /**
   * Instance of {@link OWFileSystem}
   * @since 0.0.1
   */
  fs;
    /**
   * Instance of {@link OWLogger}
   * @since 0.0.1
   */
  log;
  constructor(){
    this.app = new OWAPPFrame()
    this.fs = new OWFileSystem()
    this.log = logger
  }
}

/**
 * Global instance of {@link OWCore}
 * @since 0.0.1
 */
export const core = new OWCore()