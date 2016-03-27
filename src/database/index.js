/**
 * Created by vestnik on 27/03/16.
 */

import LocalDb from './driver/localdb'
import BaseModel from './models/base.model'
import User from './models/User'
import City from './models/City'

BaseModel.db = new LocalDb()

export default {
  BaseModel,
  User,
  City
}
