/**
 * Created by vestnik on 26/03/16.
 */
import models from './database'

export default class {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  get (name, schema) {
    let model = models.User.create()
    return model
  }

}
