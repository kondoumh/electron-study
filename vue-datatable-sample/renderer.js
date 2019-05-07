// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const app = new Vue({
  el: '#app',
  async mounted () {
    const rowsPerPage = this.pagination.rowsPerPage
    const skip = (this.pagination.page - 1) * rowsPerPage
    const res = await axios.get(`https://reqres.in/api/users?page=${skip}&per_page=${rowsPerPage}`)
    this.items = res.data.data
    //this.$store.commit('saveTableData', this.items)
  },
  methods: {
    nzDate: function (dt) {
      return moment(dt).format('DD/MM/YYYY')
    }
  },
  data: () => ({
    search: '',
    // totalItems: 0,
    items: [],
    pagination: {
      sortBy: 'Date'
    },
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'First Name', value: 'first_name' },
      { text: 'Last Name', value: 'last_name' },
      { text: 'Avatar', value: 'avatar' }
    ]
  })
})