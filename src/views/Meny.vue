<template>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <button class="btn btn-success">Lägg till ny rätt</button>
          <NewMenyItem />
        </div>

      </div>
      <div class="row">
        <div class="col-12">
          <MenyList />
        </div>
      </div>
    </div>
</template>

<script>

import MenyList from '../components/MenyList'
import NewMenyItem from '../components/AddMenyItem'

export default {
  components: {
    MenyList,
    NewMenyItem
  }
}
</script>

<style>

</style>
