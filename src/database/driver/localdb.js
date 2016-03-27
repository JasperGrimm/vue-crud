/**
 * Created by vestnik on 27/03/16.
 */
import DataDriver from './driver.base'
import { filter } from 'lodash/collection'

class LocalDb extends DataDriver {

  create_key (name, key) {
    return `${name.toLowerCase()}_${key}`
  }

  constructor () {
    super()
    this.localStorage = window.localStorage
  }

  __append (name, value) {
    let all = JSON.parse(this.localStorage.getItem(`collection_${name.toLowerCase()}`))
    if (!all) {
      all = []
    }
    let exists = false
    all.map((item, index) => {
      if (item.id === value.id) {
        all[index] = value
        exists = true
      }
    })
    if (!exists) {
      all.push(value)
    }
    this.localStorage.setItem(`collection_${name.toLowerCase()}`, JSON.stringify(all))
  }

  set (name, value) {
    const _key = this.create_key(name, value.id)
    this.localStorage.setItem(_key, JSON.stringify(value))

    this.__append(name, value)
  }

  get (name, key) {
    const _key = this.create_key(name, key)
    return JSON.parse(this.localStorage.getItem(_key))
  }

  remove (name, key) {
    const _key = this.create_key(name, key)
    this.localStorage.removeItem(_key)
  }

  findBy (name, predicate) {
    const collection = JSON.parse(this.localStorage.getItem(`collection_${name.toLowerCase()}`))
    let found = filter(collection, predicate)
    return found
  }
}

export default LocalDb
