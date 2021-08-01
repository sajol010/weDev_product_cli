<template>
 <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12">
            <form id="login-form" class="form" v-on:submit="login" method="post">
              <h3 class="text-center text-info">Login</h3>

              <ul v-if="errors.length > 0">
                  <li v-for="(error, index) in errors" :key="index">{{error}}</li>
              </ul>
              <div class="form-group">
                <label for="username" class="text-info">Username:</label><br />
                <input
                  type="text"
                  name="username"
                  id="username"
                  class="form-control"
                  v-model="email"
                v-on:keyup="validate"/>
              </div>
              <div class="form-group">
                <label for="password" class="text-info">Password:</label><br />
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  v-model="password"
                  v-on:keyup="validate"
                />
              </div>
              <div class="form-group">
               
                <button
                  type="submit"
                  class="btn btn-info btn-md"
                >Submit</button>

                <div id="register-link" class="text-right">
                <a href="#" class="text-info">Register here</a>
              </div>
              </div>

            </form>
          </div>
        </div>
</template>

<script>
// import axios from "axios";
// import store from "@/store/index";
import { mapGetters } from 'vuex'
export default {
  name: "AuthLayout",
  data(){
      return {
          email: '',
          password: '',
          errors:[],
          isFormSubmitted:false
      }

  },
  methods: {
      login: function(e){
          let $this = this;
          this.isFormSubmitted = true;

          e.preventDefault()
              if(!this.validate()){
                  return;
              }

        this.$store.dispatch('login', { email: this.email, password: this.password })
          // let formData = new FormData();
          // formData.append('email', this.email);
          // formData.append('password', this.password);
          // axios.post('auth/login', formData).then(function(response){
          //     let res = response.data
          //   // if(res.status){
          //
          //   // }
          // });
          
      },
      validate: function(){
        if(!this.isFormSubmitted){
            return;
        }
           this.errors = [];
          if(this.email == ''){
              this.errors.push('Please enter a valid email')
          }
          if(this.password == ''){
              this.errors.push('Please enter password')
          }
          return !this.errors.length;
      }
  },
  created() {

  },
  mounted() {
 
  },
  computed:{
    ...mapGetters([
        'isAutenticated'
    ])
  }
};
</script>



<style>
body {
  margin: 0;
  padding: 0;
  background-color: #17a2b8;
  height: 100vh;
}
#login .container #login-row #login-column #login-box {
  margin-top: 120px;
  max-width: 600px;
  height: 320px;
  border: 1px solid #9c9c9c;
  background-color: #eaeaea;
}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
#login
  .container
  #login-row
  #login-column
  #login-box
  #login-form
  #register-link {
  margin-top: -85px;
}
</style>