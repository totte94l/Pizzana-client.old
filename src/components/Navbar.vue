<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div class="container">
            <a class="navbar-brand" href="#">Pizzana</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <template v-if="isLoggedIn">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item mr-auto">
                            <a class="nav-link" href="#">Restauranginformation</a>
                        </li>
                        <li class="nav-item mr-auto">
                            <routerLink to="/meny" class="nav-link">Meny</routerLink>
                        </li>
                    </ul>

                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item mr-auto">
                            <a class="nav-link" href="#">{{ user.username }}</a>
                        </li>
                        <li class="nav-item mr-auto">
                            <a class="nav-link" href="#">Logga ut</a>
                        </li>
                    </ul>
                </template>

                <template v-else>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item mr-auto">
                            <routerLink to="login" class="nav-link" href="#">Logga in</routerLink>
                        </li>
                        <li class="nav-item mr-auto">
                            <routerLink to="sign-up" class="nav-link">Registrera konto</routerLink>
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </nav>
</template>

<script>


export default {
    name: "Navbar",

    data () {
        return {
            username: '',
            password: '',
            msg: ''
        }
    },
    methods: {
        
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        },
        user() {
            return this.$store.getters.getUser
        }
    }
}
</script>
