/**
 * Created by vestnik on 27/03/16.
 */

import models from './../src/database'
import drivers from './../src/database/driver'

models.BaseModel.db = new drivers.LocalDb()
