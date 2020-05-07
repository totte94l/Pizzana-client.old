<template>
    <div class="container">
        <h1 class="mb-2">Din meny</h1>
        {{ msg }}
        <div id="menuItems" class="row justify-content-between">
            <div class="mb-3 col-12 menu-item" v-for="item in menu" :key="item.id">

                <template v-if="editingItem && item.id == editingItemId">
                    <div class="form-group row mb-0">
                        <div class="col-1">
                            <h1 class="">{{ item.id }}.</h1>
                        </div>
                        <div class="col-11">
                            <input type="text" class="form-control" v-model="editName">
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

                <template v-else>
                    <h1><span>{{ item.id }}. </span>{{ item.name }}</h1>
                    <div>
                        <span class="font-weight-bold">Ingredienser:</span>
                        <p>
                            {{ item.ingredients }}
                        </p>
                        <div class="row align-self-center">
                            <div class="col-12">
                                <button class="btn btn-primary mr-2" v-on:click="startEdit(item)">Ändra</button>
                                <button class="btn btn-danger">Ta bort</button>
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
    data() {
        return {
            menu: this.$store.getters.menu,
            msg: "",
            editingItem: false,
            editingItemId: 0,
            editName: "",
            editIngredients: ""
        }
    },
    methods: {
        async getMenu () {
            try {

                const response = await MenyService.getMenu()

                this.msg = response.msg
                this.menu = response.menu

                this.$store.dispatch('set_menu', { menu: this.menu })
            } catch (error) {
                this.msg = error.response.data.msg
            }
        },
        startEdit(item) {
            this.editingItem = true;
            this.editingItemId = item.id;
            this.editName = item.name;
            this.editIngredients = item.ingredients;
        },
        async saveEdit(item) {
            try {
                const data = {
                    id: item.id,
                    name: this.editName,
                    ingredients: this.editIngredients
                }

                const response = await MenyService.editMenu(data)
                this.$store.dispatch('update_menu_item', data)
                this.editingItem = false
            } catch (error) {
                this.msg = error.response.data.msg
            }
        },
        deleteItem(id) {
            
        }
    },
    mounted: function() {
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
</style>