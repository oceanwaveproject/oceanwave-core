/**
 * OCEANWAVE Core Filesystem
 */

import fs from "node:fs";
import * as nodepath from "node:path";

/**
 * OCEANWAVE Core Filesystem Class
 * @since 0.0.1
 */
export class OWFileSystem{
  /** OCEANWAVE Core Filesystem Constructor */
  constructor(){}
  /**
   * Read file
   * @param {string} path - File path
   * @returns {any} - File content
   * @since 0.0.1
   */
  read(path){
    return fs.readFileSync(path,'utf8')
  }
  /**
   * Write file
   * @param {string} path - File path
   * @param {string} text - File content
   * @since 0.0.1
   */
  write(path,text){
    fs.writeFileSync(path,text,'utf8')
  }
  /**
   * Make dir
   * @param {string} path - dir path
   * @since 0.0.1
   * @example <caption>If you want to create recursive directory:</caption>
   * core.fs.mkdir('foo/bar')
   * @example <caption>Alternatively, you can create a directory through an absolute path</caption>
   * core.fs.mkdir('/foo/bar')
   */
  mkdir(path){
    var dirs = path.split('/')
    var present_dir = (nodepath.isAbsolute(path)) ? '' : '.' 
    for(var i in dirs){
      present_dir = present_dir + '/' + dirs[i]
      var dir_exists = this.dirExists(present_dir)
      if(!dir_exists){
        fs.mkdirSync(present_dir)
      }
    }
  }
  /**
   * List the files in this directory
   * @param {string} path - Dir path
   * @returns {Array} A list of files in this directory
   * @since 0.0.1
   */
  readDir(path){
    return fs.readdirSync(path)
  }
  /**
   * Check dir exists
   * @param {string} path - Dir path
   * @returns {boolean} If the dir exists
   * @since 0.0.1
   */
  dirExists(path){
    return fs.existsSync(path)
  }
  /**
   * Check file exists
   * @param {string} path - File path
   * @returns {boolean} If the file exists
   * @since 0.0.1
   */
  fileExists(path){
    try{
      fs.accessSync(path,fs.F_OK)
    }catch(err){
      return false
    }
    return true
  }
}
