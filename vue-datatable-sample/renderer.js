// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const app = new Vue({
  el: '#app',
  async mounted () {
    this.fetchData()
    //this.$store.commit('saveTableData', this.items)
  },
  methods: {
    async fetchData() {
      const rowsPerPage = this.pagination.rowsPerPage
      const skip = (this.pagination.page - 1) * rowsPerPage
      const res = await axios.get(`https://scrapbox.io/api/pages/kondoumh?skip=${skip}&limit=25`)
      this.items = await res.data.pages
      this.totalPages = res.data.count
    },
    formatDate: function(timestamp) {
      let date = new Date()
      date.setTime(timestamp * 1000)
      const options = {
        year: "numeric", month: "numeric", day: "numeric",
        hour: "numeric", minute: "numeric", second: "numeric",
        hour12: false
      }
      return date.toLocaleString(navigator.language, options)
    }
  },
  watch: {
    pagination: {
      handler() {
        this.fetchData()
      }
    }
  },
  data: () => ({
    search: '',
    totalPages: 0,
    items: [],
    pagination: {},
    headers: [
      { text: 'pin', value: 'pin', sortable: false, width: '5%' },
      { text: 'views', value: 'views', width: '10%' },
      { text: 'linked', value: 'linked', width: '10%' },
      { text: 'updated', value: 'updated', width: '25%' },
      { text: 'title', value: 'title', sortable: false, width: '30%'},
      { text: 'image', value: 'image', sortable: false, width: '25%' }
    ]
  })
})