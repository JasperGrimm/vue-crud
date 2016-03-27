<template>
 <table-list :model="model" :fields="fields" :items_per_page="items_per_page" :features="features"></table-list>
</template>
<style>

</style>
<script>
 import {TableList, models} from 'vue-crud'
 import schema from './../../../crud/schemas/user.js'
 import CityBlock from './../../../crud/components/city-block'
 import Vue from 'vue'

 let fields = [
  { name: 'name', label: 'Name' },
  { name: 'id', label: 'Id' },
  { name: 'city', label: 'City', component: 'cityBlock' }
 ]

 TableList.components['cityBlock'] = Vue.extend(CityBlock)

 export default {
  data () {
   return {
    schema: schema,
    model: models.User,
    fields: fields,
    items_per_page: 5,
    features: {
     pagination: true
    }
   }
  },
  components: {TableList}
 }
</script>