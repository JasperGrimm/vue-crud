<template>
  <vs-alert v-bind:show="hasErrors" state="danger" dismissible>
    This is an alert
  </vs-alert>
  <vs-table hover responsive>
    <table>
      <thead>
      <tr>
        <th v-for="field in fields" track-by="$index">{{ field }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" track-by="$index">
        <td v-for="field in fields" track-by="$index">{{ item[field] }}</td>
      </tr>
      </tbody>
    </table>
  </vs-table>
</template>
<style>

</style>
<script>
  import components from 'vuestrap-base-components/dist/vuestrapBase'
  const component = {
    data () {
      return {
        msg: 'hello vue2',
        hasErrors: true
      }
    },
    props: ['model', 'items', 'fields'],
    components: {
      vsAlert: components.alert,
      vsTable: components.tables
    }
  }
  export default component
</script>