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
    instance.setData(this.db.get(this.name, key))
    return this._proxy(instance)
  }

  static findBy (predicate) {
    let self = this
    return this.db.findBy(this.name, predicate).map((item) => {
      const instance = self.create()
      instance.setData(item)
      return instance
    })
  }

  constructor (data = null) {
    this.data = data
  }

  setData (data) {
    this.data = data
  }

  save () {
    this.db.set(this.entity_name, this.data)
  }

  remove () {

  }
}

export default BaseModel
