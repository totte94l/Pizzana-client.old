<template>
  <div class="container mt-3 mb-3" id="addNewItem">
      <div class="row">
        <div class="col-12 mt-3">
          <div class="form-group row mb-0">
            <div class="col-10">
                <input type="text" class="form-control" placeholder="Namn" v-model="name">
            </div>
            <div class="col-2">
              <input type="text" placeholder="Pris" v-model="price" class="form-control">
            </div>
          </div>
          <div class="mt-2">
            <span class="font-weight-bold">Ingredienser:</span>
            <textarea class="form-control" v-model="ingredients"></textarea>

            <div class="form-check mt-3">
              <input type="checkbox" class="form-check-input" id="isGlutenFree" value="">
              <label for="isGlutenFree" class="form-check-label">Glutenfri</label>
            </div>

            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="isLactoseFree">
              <label for="isLactoseFree" class="form-check-label">Laktosfri</label>
            </div>

            <div class="row align-self-center mt-3">
                <div class="col-12">
                    <button v-on:click="addItem" class="btn btn-success mr-2">Spara</button>
                </div>
            </div>
          </div>
        </div>
        {{ msg }}
      </div>
  </div>
</template>

<script>
import MenyService from '../services/MenyService'

export default {
  name: 'AddMenyItem',
  data () {
    return {
      name: '',
      price: 0,
      ingredients: '',
      glutenFree: false,
      lactoseFree: false,
      msg: '',
      menu: ''
    }
  },
  methods: {
    async addItem () {
      const vm = this
      const data = {
        name: this.name,
        ingredients: this.ingredients,
        category: 'Kategori',
        glutenFree: false,
        lactoseFree: false,
        price: this.price
      }

      const response = MenyService.addItem(data).then(function () {
        
      })
    }
  }
}
</script>

<style>
  #addNewItem {
    border: 1px solid rgba(75, 75, 75, 0.322);
    padding: 20px;
    border-radius: 10px;;
  }
</style>
