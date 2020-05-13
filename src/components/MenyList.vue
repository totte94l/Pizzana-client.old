<template>
    <div class="container">
        <h1 class="mb-2">Din meny</h1>
        {{ msg }}
        <div id="menuItems" class="row justify-content-center">
            <div class="mb-3 col-8 menu-item" v-for="item in menu" :key="item.id">

                <!-- Edit menu item view -->
                <template v-if="editingItem && item.id == editingItemId">
                    <div class="form-group row mb-0">
                        <div class="col-1">
                            <h1 class="">{{ item.id }}.</h1>
                        </div>
                        <div class="col-9">
                            <input type="text" class="form-control" v-model="editName">
                        </div>
                        <div class="col-2">
                          <input type="text" v-model="editPrice" class="form-control">
                        </div>
                    </div>
                    <div>
                        <span class="font-weight-bold">Ingredienser:</span>
                        <p>
                            <textarea class="form-control" v-model="editIngredients"></textarea>
                        </p>
                        <div class="row align-self-center">
                            <div class="col-12">
                                <button v-on:click="saveEdit(item)" class="btn btn-success mr-2">Spara</button>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- Regular menu item view -->
                <template v-else>
                    <h1><span>{{ item.id }}. </span>{{ item.name }}<span class="float-right secondary_color">{{ item.price }}kr</span></h1>
                    <div>
                        <span class="font-weight-bold">Ingredienser:</span>
                        <p>
                            {{ item.ingredients }}
                        </p>
                        <div class="row align-self-center">
                            <div class="col-12">
                                <button class="btn btn-primary mr-2" v-on:click="startEdit(item)">Ändra</button>
                                <button class="btn btn-danger" v-on:click="deleteItem(item.id)">Ta bort</button>
                            </div>
                        </div>
                    </div>

                </template>
            </div>
        </div>
    </div>
</template>

<script>

import MenyService from '@/services/MenyService.js'

export default {
  data () {
    return {
      menu: this.$store.getters.menu,
      msg: '',
      editingItem: false,
      editingItemId: 0,
      editName: '',
      editIngredients: '',
      editPrice: 0
    }
  },
  methods: {
    async getMenu () {
      try {
        const response = await MenyService.getMenu()
        this.msg = response.msg
        this.menu = response.menu
        console.log(" menyListO" + response.menu)
        this.$store.dispatch('set_menu', { menu: this.menu })
        console.log(this.$store.getters.menu)
      } catch (error) {
        this.msg = error.response.data.msg
      }
    },
    startEdit (item) {
      this.editingItem = true
      this.editingItemId = item.id
      this.editName = item.name
      this.editIngredients = item.ingredients
      this.editPrice = item.priceprice
    },
    async saveEdit (item) {
      try {
        const data = {
          id: item.id,
          name: this.editName,
          ingredients: this.editIngredients,
          price: this.editPrice
        }

        const response = await MenyService.editMenu(data)
        this.$store.dispatch('update_menu_item', data)
        this.editingItem = false
      } catch (error) {
        this.msg = error.response.data.msg
      }
    },
    async deleteItem (id) {
      const vm = this
      const data = {
        id: id
      }

      MenyService.deleteItem(data).then(function () {
        vm.getMenu()
      })
    }
  },
  mounted: function () {
    this.getMenu()

  }
}
</script>

<style>
    #menuItems {
        padding: 10px;
    }

    .menu-item {
        border: 1px solid rgba(94, 94, 94, 0.158);
        padding: 20px;
    }

    .secondary_color {
      color: rgba(32, 32, 32, 0.856);
    }
</style>
