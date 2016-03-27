/**
 * Created by vestnik on 27/03/16.
 */
import BaseModel from './base.model'

class City extends BaseModel {
  constructor () {
    super()
    this.schema = {
      _primary: 'id',
      id: Number,
      name: String
    }
  }
}
export default City
