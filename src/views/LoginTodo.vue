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
                // console.log(this.storedEmail)
                
            },
        }
    }
</script>

<style scoped>
    .container{
        width: 40vw;
        margin: 0 auto;
        padding: 30px 0;
    }
    .container > p{
        color: red
    }
    .welcome-hero{
        font-size: 32px;
        margin-bottom: 55px
    }
    .welcome-hero > p {
        margin: 0
    }
    div > p:first-child{
        font-weight: 900;
    }
    input{
        width: 25vw;
        border-radius: 9px;
        outline: none;
        padding: 10px;
        border: 1px solid;
        margin: 20px;
        font-size: 16px;
        background-color: #C2BAFD;
        color: white;
        font-weight: 900;
    }
    ::placeholder{
        color: white
    }
    button{
        display: block;
        margin: 0 auto;
        width: 26vw;
        font-size: 16px;
        background-color: white;
        border: none;
        cursor: pointer;
        padding: 10px 15px;
        border-radius: 4px;
        font-weight: 900;
        box-shadow: rgb(173 173 173) 0px 1px 10px;
    }
    form > p {
        margin-top: 50px
    }
    a{
        font-weight: 900;
        color: white
    }
    button:hover{
      background-color: hsl(0, 0%, 95%);
      transition: .1s;
    }
</style>