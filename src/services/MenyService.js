import axios from 'axios'

const url = 'http://localhost:3000/api/'

export default {
  getMenu () {
    return axios
      .get(url + 'menu-items/')
      .then(response => response.data)
  },
  editMenu (data) {
    return axios
      .put(url + 'edit-item/', data)
      .then(response => response.data)
  },
  deleteItem (data) {
    return axios
      .delete(url + 'delete-item/', { data: { data } })
      .then(response => response.msg)
  },
  addItem (data) {
    console.log(data)
    return axios
      .post(url + 'add-item', { data })
      .then(function (response) {
        return response.msg
      })
  }
}
