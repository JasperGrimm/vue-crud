import TableList from './components/TableList.vue'
import ModelBuilder from './modelBuilder'
const mb = new ModelBuilder('http://127.0.0.1:8080')
import models from './database'

let model1 = mb.get('user', {})
model1.setData({
  id: 1,
  name: 'Eugen342134'
})
model1.save()

let model2 = mb.get('user', {})
model2.setData({
  id: 2,
  name: 'Eugen2'
})
model2.save()

let model3 = models.User.find(1)
console.log(model3.name)

let model4 = models.User.findBy({
  name: 'Eugen'
})
console.log(model4)

let model5 = models.User.create()
model5.setData({
  id: 5,
  name: 'Eugen'
})
model5.save()



export default {
  TableList: TableList
}
