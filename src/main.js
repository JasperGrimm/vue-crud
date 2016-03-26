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

export default {
  TableList: TableList
}
