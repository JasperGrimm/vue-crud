/**
 * Created by vestnik on 27/03/16.
 */
import DataDriver from '../driver/driver.base'
import { log } from './../../utils'

class BaseModel {
  constructor () {
    this.data = {}
    this.schema = {}
  }

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

  isRelation (field) {
    const type = this.schema[field]
    if (typeof type === 'undefined') return false
    return type.hasOwnProperty('ref')
  }

  getRelation (field) {
    if (this.isRelation(field)) {
      const key = this.data[field]
      const model = this.schema[ field ].ref
      if (typeof model === 'function') { // @TODO Only One-To-One supported now!
        const ref = model.find(key)
        return ref
      }
    }
    return null
  }

  static _proxy (instance) {
    if (typeof Proxy === 'undefined') {
      return instance
    }
    let proxy = new Proxy(instance, {
      get: function (obj, name) {
        if (name === 'data') {
          if (!obj.data) obj.data = {}
          return obj.data
        }
        if (!obj[name]) {
          if (obj.isRelation(name)) {
            return obj.getRelation(name)
          }
          if (obj.data === null) {
            obj.data = {}
          }
          if (typeof obj.data[name] !== 'undefined') {
            return obj.data[name]
          }
          return null
        } else {
          return obj[name]
        }
      },
      set: function (obj, name, value) {
        if (name === 'data') {
          obj.data = value
          return true
        }
        if (obj.schema.hasOwnProperty(name)) {
          obj.data[name] = value
        }
        return value
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

  setData (data) {
    this.data = data
  }

  save () {
    for (let [field, type] of Object.entries(this.schema)) {
      if (type.hasOwnProperty('ref')) {
        log('This is relational field')
        if (typeof type.ref !== 'function') {
          // log('This is to-many relation')
        } else {
          const ref_item = this.data[field]
          ref_item.save() // save references
          const ref_schema = ref_item.schema
          this.data[field] = this.data[field][ref_schema._primary]
        }
      }
    }
    this.db.set(this.entity_name, this.data)
  }

  remove () {

  }
}

export default BaseModel
