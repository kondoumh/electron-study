// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const app = new Vue({
  el: '#app',
  async mounted () {
    const rowsPerPage = this.pagination.rowsPerPage
    const skip = (this.pagination.page - 1) * rowsPerPage
    const res = await axios.get(`https://scrapbox.io/api/pages/kondoumh`)
    this.items = await res.data.pages
    //this.$store.commit('saveTableData', this.items)
  },
  methods: {
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
  data: () => ({
    search: '',
    // totalItems: 0,
    items: [],
    pagination: {
      descending: true,
      sortBy: 'updated'
    },
    headers: [
      { text: 'pin', value: 'pin' },
      { text: 'views', value: 'views' },
      { text: 'linked', value: 'linked' },
      { text: 'updated', value: 'updated' },
      { text: 'title', value: 'title' },
      { text: 'image', value: 'image', sortable: false }
    ]
  })
})