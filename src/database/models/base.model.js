/**
 * Created by vestnik on 27/03/16.
 */
import DataDriver from '../driver/driver.base'

class BaseModel {
  get db () {
    return this.constructor._db
  }

  static get db () {
    return this._db
  }

  static set db (db) {
    if (!(db instanceof DataDriver)) {
      throw new Error('db must be an instance of DataDriver class')
    }
    this._db = db
  }

  get entity_name () {
    return this.constructor.name.toLowerCase()
  }

  constructor (data = null) {
    this.data = data
  }

  setData (data) {
    this.data = data
  }

  static create_key (key) {
    return `${this.name.toLowerCase()}_${key}`
  }

  static _proxy (instance) {
    let proxy = new Proxy(instance, {
      get: function (proxy, name) {
        if (!proxy[name]) {
          return proxy.data[name]
        } else {
          return proxy[name]
        }
      }
    })
    return Object.create(proxy)
  }

  static create () {
    let instance = new this()
    return this._proxy(instance)
  }

  static find (key) {
    let instance = new this()
    instance.setData(this.db.get(this.create_key(key)))
    return this._proxy(instance)
  }

  save () {
    const key = `${this.entity_name}_${this.data.id}`
    this.db.set(key, this.data)
  }

  remove () {

  }
}

export default BaseModel
