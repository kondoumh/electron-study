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
    async fetchData () {
      const skip = (this.pagination.page - 1) * this.pagination.rowsPerPage
      let url = `https://scrapbox.io/api/pages/kondoumh?skip=${skip}&limit=${this.pagination.rowsPerPage}&sort=${this.pagination.sortBy}`
      const res = await axios.get(url)
      this.items = await res.data.pages // .filter(page => page.pin === 0)
      this.pagination.totalItems = res.data.count // - res.data.pages.filter(page => page.pin !== 0).length
    },
    formatDate (timestamp) {
      let date = new Date()
      date.setTime(timestamp * 1000)
      const options = {
        year: "numeric", month: "numeric", day: "numeric",
        hour: "numeric", minute: "numeric", second: "numeric",
        hour12: false
      }
      return date.toLocaleString(navigator.language, options)
    },
    input (page) {
      this.fetchData()
    }
  },
  computed: {
    page () {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null ) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  watch: {
    pagination: {
      handler () {
        this.pagination.descending = false
        this.fetchData()
      }
    }
  },
  data: () => ({
    items: [],
    pagination: {
      sortBy: 'updated',
      rowsPerPage: 20,
      totalItems: 0
    },
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