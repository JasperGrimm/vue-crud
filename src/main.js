import TableList from './components/TableList.vue'
import ModelBuilder from './modelBuilder'
const mb = new ModelBuilder('http://127.0.0.1:8080')
import models from './database'
let id = parseInt(Math.random() * 10) + 3
let name = `User ${id}`
//

let city = mb.get('city', {})
city.name = 'Jam'
city.id = 1
city.save()

let user = mb.get('user', {})
user.setData({
  id: id,
  name: name,
  city: city
})
user.save()

console.log(user.city.name)

// let users = models.User.findBy({})
// console.log(users)

export {
  TableList,
  models,
  ModelBuilder
}
