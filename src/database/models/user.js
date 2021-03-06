/**
 * Created by vestnik on 27/03/16.
 */
import BaseModel from './base.model'
import City from './City'

class User extends BaseModel {
  constructor () {
    super()
    this.schema = {
      _primary: 'id',
      id: Number,
      name: String,
      email: String,
      city: {'ref': City}
    }
  }
}
export default User
