/**
 * Created by vestnik on 26/03/16.
 */
import models from './database'
import { ucfirst } from './utils/string'

export default class {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  get (name, schema) {
    let model = models[ucfirst(name)].create()
    return model
  }

}
