/**
 * Created by vestnik on 27/03/16.
 */

import models from './../src/database'
import drivers from './../src/database/driver'

models.BaseModel.db = new drivers.LocalDb()

let city = new models.City()
city.name = 'Simferopol'
city.id = 1

let user = new models.User()
user.name = 'Jasper'
user.id = 1
user.city = city
user.save() // city will be saved automatically