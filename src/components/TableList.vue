<template>
  <vs-alert v-bind:show="hasErrors" state="danger" dismissible>
    This is an alert
  </vs-alert>
  <vs-table hover responsive>
    <table>
      <thead>
      <tr>
        <th v-for="field in fields" track-by="$index">{{ field.label }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in view_items" track-by="$index">
        <td v-for="field in fields" track-by="$index">
          <div v-if="field.component">
            <component :is="field.component" :item="getByKey(item, field.name)"></component>
          </div>
          <div v-else>{{ item[field.name] }}</div>
        </td>
      </tr>
      </tbody>
    </table>
  </vs-table>

  <vs-pagination v-if="features.pagination"
      size="md"
      variant="primary"
      :total-rows="total"
      :current-page.sync="page"
      :per-page="items_per_page">
  </vs-pagination>
</template>
<style>

</style>
<script>
  import components from 'vuestrap-base-components/dist/vuestrapBase'

  let childComponents = {
    vsAlert: components.alert,
    vsTable: components.tables,
    vsPagination: components.pagination
  }

  const component = {
    data () {
      return {
        page: 1,
        msg: 'hello vue2',
        hasErrors: true
      }
    },
    props: {
      model: {
        type: Function,
        required: true
      },
      fields: {
        required: true
      },
      items_per_page: {
        type: Number,
        default: 10
      },
      features: {
        default: function () {
          return {
            pagination: true
          }
        }
      }
    },
    methods: {
      getByKey: function (item, key) {
        return item[key]
      }
    },
    computed: {
      items: function () {
        return this.model.findBy({})
      },
      view_items: function () {
        let items = this.items.map(function (item) {
          let obj = {}
          for (let field of this.fields) {
            if (typeof field.component !== 'undefined') {
              obj[field.name] = item[field.name]
            } else {
              if (typeof field.get !== 'undefined') {
                obj[field.name] = field.get(item[field.name])
              } else {
                obj[field.name] = item[field.name]
              }
            }
          }
          return obj
        }.bind(this))

        if (!this.features.pagination) {
          return items
        }
        const slice = [
          this.items_per_page * (this.page - 1),
          this.items_per_page * this.page
        ]
        return items.slice(slice[0], slice[1])
      },
      total: function () {
        return this.items.length
      }
    }
  }
  component.components = childComponents
  export default component
</script>