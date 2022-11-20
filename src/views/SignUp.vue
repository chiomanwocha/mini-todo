<template>
  <div class="container">
    <form class="signup-page" @submit.prevent="signUp">
      <div class="welcome-hero">
        <p>Create Account</p>
        <p>to get started now !</p>
      </div>
      <div class="firstname">
        <input type="text" id="firstname" name="firstname" placeholder="First Name" required v-model="userDetails.firstName">
      </div>
      <div class="lastname">
        <input type="text" id="lastname" name="lastname" placeholder="Last Name" required v-model="userDetails.lastName">
      </div>
      <div>
        <input type="email" id="email" name="email" placeholder="Email Address" required v-model="userDetails.email">
      </div>
      <button>Submit</button>
      <p>Already have an account ? <router-link to="/">login</router-link></p>
    </form>
  </div>
  
</template>

<script>
  import router from '@/router'
  // import axios from "axios";
  export default {
    name: 'SignUp',
    data() {
      return{
        userDetails: {
          firstName: '',
          lastName: '',
          email: ''
        },
        storageDetails: []
      }
    },
    methods: {
      signUp() {
        // // const details = axios.post()
        localStorage.setItem('userDetails', JSON.stringify(this.userDetails))
        router.push('/')

        // let data = localStorage.getItem('userDetails');
        // if (!data) {
        //   const data = this.storageDetails
        //   data.push(this.userDetails)
        //   localStorage.setItem('userDetails', JSON.stringify(data))
        //   router.push('/')
        // } else {
        //   let updateDate = JSON.parse(data)
        //   updateDate.push(this.userDetails)
        //   localStorage.setItem('userDetails', JSON.stringify(updateDate))
        //   router.push('/')
        // }
      }
    }
  }
</script>

<style scoped>
    .container{
        width: 40vw;
        margin: 0 auto;
        padding: 30px 0;
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
        margin: 10px;
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
        margin: 30px auto 0;
        width: 26vw;
        font-size: 16px;
        background-color: hsl(0, 0%, 100%);
        border: none;
        cursor: pointer;
        padding: 10px 15px;
        border-radius: 4px;
        font-weight: 900;
        box-shadow: rgb(202, 202, 202) 0px 0px 10px;
    }
    button:hover{
      background-color: hsl(0, 0%, 95%);
      transition: .1s;
    }
    form > p {
        margin-top: 50px
    }
    a{
        font-weight: 900;
        color: white
    }
</style>