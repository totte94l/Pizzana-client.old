<template>
	<div>
		<div class="container mt-5">
            <div class="row w-100 justify-content-center">
                <div class="col-6 ">
                    <div id="login_form" class="form-group">
                        <label for="inp_username">Användarnamn:</label>
                        <input name="inp_username" type="text" class="form-control" v-model="username" />
                        <label for="inp_password" class="mt-2">Lösenord:</label>
                        <input name="inp_password" type="text" class="form-control" v-model="password" />
                        <input type="button" class="btn btn-primary mt-2" @click="login" value="Logga in" />
                        <p class="mt-4 alert alert-warning" v-if="msg">{{ msg }}</p>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import AuthService from '@/services/AuthService.js'

export default {
  data () {
    return {
      username: '',
      password: '',
      msg: ''
    }
  },
  methods: {
    async login () {
      try {
        const credentials = {
          username: this.username,
          password: this.password
        }
        const response = await AuthService.login(credentials)
        this.msg = response.msg

        const token = response.token
        const user = response.user

        this.$store.dispatch('login', { token, user })

        this.$router.push('/')
      } catch (error) {
        this.msg = error.response.data.msg
      }
    }
  }
}
</script>

<style>

</style>
