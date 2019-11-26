<template>
  <div>
    2019/11/26 demo用
    <table>
      <tr>
        <th>-</th>
        <th>done</th>
        <th>session_id</th>
        <th>url</th>
        <th>timestamp</th>
        <th>remove</th>
      </tr>
      <tr v-for="status in view_status" :key="status.id">
        <td>
          <input type="checkbox" v-bind:checked="status.done" @change="toggle(status)">
        </td>

        <td>{{status.done}}</td>
        <td> {{status.session_id}}</td>
        <td> <a v-bind:href="status.url">{{status.url}}</a></td>
        <td> {{status.timestamp.toDate() | dateFilter}}</td>
        <td>
          <button v-on:click="remove(status.id)">remove</button>
        </td>

      </tr>
    </table>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data: function() {
      return {
        session_id: '',
        url: '',
        done: false
      }

    },
    created: function() {
      this.$store.dispatch('view_status/init')
      this.$store.dispatch('view_status/popup')
    },
    methods: {
      remove(id) {
        this.$store.dispatch('view_status/remove', id)
      },
      toggle(status) {
        this.$store.dispatch('view_status/toggle', status)
      },
    },
    computed: {
      view_status() {
        // return this.$store.state.view_status.statuses
        return this.$store.getters['view_status/orderedStatus']
      }
    },
    filters: {
      dateFilter: function(date) {
        return moment(date).format('YYYY/MM/DD HH:mm:ss')
      }
    }

  }

</script>


<style>
table {
  width: 70%;
  border-collapse:separate;
  border-spacing: 0;
}

table th:first-child{
  border-radius: 5px 0 0 0;
}

table th:last-child{
  border-radius: 0 5px 0 0;
  border-right: 1px solid #3c6690;
}

table th{
  text-align: center;
  color:white;
  background: linear-gradient(#829ebc,#225588);
  border-left: 1px solid #3c6690;
  border-top: 1px solid #3c6690;
  border-bottom: 1px solid #3c6690;
  box-shadow: 0px 1px 1px rgba(255,255,255,0.3) inset;
  width: 10%;
  padding: 10px 0;
}

table td{
  text-align: center;
  border-left: 1px solid #a8b7c5;
  border-bottom: 1px solid #a8b7c5;
  border-top:none;
  box-shadow: 0px -3px 5px 1px #eee inset;
  width: 10%;
  padding: 10px 0;
}


table td:last-child{
  border-right: 1px solid #a8b7c5;
}

table tr:last-child td:first-child {
  border-radius: 0 0 0 5px;
}

table tr:last-child td:last-child {
  border-radius: 0 0 5px 0;
}
</style>