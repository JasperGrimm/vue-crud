/**
 * Created by vestnik on 27/03/16.
 */

import models from './../src/database'
import drivers from './../src/database/driver'

models.BaseModel.db = new drivers.LocalDb()

class Franchise extends models.BaseModel {
  constructor () {
    super()
    this.schema = {
      _primary: 'id',
      id: Number,
      city: {'ref': models.City}
    }
  }
}

let franchise = new Franchise()
franchise.id = 1
franchise.city = models.City.find(1)
franchise.save()
