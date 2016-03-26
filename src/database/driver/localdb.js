/**
 * Created by vestnik on 27/03/16.
 */
import DataDriver from './driver.base'

class LocalDb extends DataDriver {

  constructor () {
    super()
    this.localStorage = window.localStorage
  }

  set (key, value) {
    this.localStorage.setItem(key, JSON.stringify(value))
  }

  get (key) {
    return JSON.parse(this.localStorage.getItem(key))
  }

  remove (key) {
    this.localStorage.removeItem(key)
  }

}

export default LocalDb
