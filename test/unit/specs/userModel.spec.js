/**
 * Created by vestnik on 27/03/16.
 */
import models from './../../../src/database'
import User from './../../../src/database/models/User'

describe('User model', () => {
  it('Should create User instance', () => {
    let user = models.User.create()
    expect(user instanceof User).toBeTruthy()
  })
})