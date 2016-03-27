<template>
  <vs-alert v-bind:show="hasErrors" state="danger" dismissible>
    This is an alert
  </vs-alert>
  <vs-table hover responsive>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
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
    props: ['model'],
    computed: {
      items: function () {

      }
    },
    components: {
      vsAlert: components.alert,
      vsTable: components.tables
    }
  }
  export default component
</script>