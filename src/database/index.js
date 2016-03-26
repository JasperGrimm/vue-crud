/**
 * Created by vestnik on 27/03/16.
 */

import LocalDb from './driver/localdb'
import BaseModel from './models/base.model'
import User from './models/User'

BaseModel.db = new LocalDb()

export default {
  User
}
