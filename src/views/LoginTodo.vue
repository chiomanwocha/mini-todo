<template>
    <div class="container">
        <p v-if="errorMessage">{{errorMessage}}</p>
        <div class="welcome-hero">
            <p>Welcome,</p>
            <p>Glad to see you !</p>
        </div>
        <form @submit.prevent>
            <input type="email" name="email" id="email" v-model="email" required placeholder="Email Address">
            <button @click="login" @keyup.enter="login">Login</button>
            <p>Don't have an account yet? <router-link :to="{name: 'SignUp'}">Sign up here</router-link></p>
        </form>
    </div>
</template>

<script>
import router from '@/router'

    export default {
        name: 'LoginTodo',
        data(){
            return{
                email: '',
                storedEmail: '',
                errorMessage: '',
                error: false
            }
        },
        mounted() {
            this.getDetails()
        },
        methods: {
            getDetails(){
                const localDetails = localStorage.getItem('userDetails')
                const convertedDetails= JSON.parse(localDetails)
                this.storedEmail = convertedDetails?.email
            },
            login(){
                if(this.storedEmail == this.email){
                    router.push('/todo')
                } 
                if (this.email.length <= 0){
                    this.error = true
                    this.errorMessage = 'email can not be empty'
                }
                else {
                    this.error = true
                    this.errorMessage = 'this email does not exist !'
                } 
            },
        }
    }
</script>

<style scoped src="@/assets/css/login-todo.css">
</style>