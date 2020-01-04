<template>
  <div id="app" class="container">

    <div class="row">
      
      <div class="col-lg-6 mx-auto mt-3">

        <b-alert :show="showAlert" :variant="alertVariant">{{alertMessage}}</b-alert>

        <amplify-authenticator v-bind:authConfig="this.authConfig"></amplify-authenticator>

      </div>


      <div class="col-lg-12" v-if="userLoggedIn">

        <div class="card">

          <div class="card-header">
            <h2>Your Bits
              <amplify-sign-out v-bind:signOutConfig="signOutConfig" class="float-right"></amplify-sign-out> 
            </h2>
             
          </div>

          <div class="card-body">
            
            <div class="row justify-content-center">
            
              <amplify-photo-picker v-bind:photoPickerConfig="photoPickerConfig"></amplify-photo-picker>
              
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import Login from './components/Login.vue';
import { components } from 'aws-amplify-vue'
import { AmplifyEventBus } from 'aws-amplify-vue';
import { Auth } from 'aws-amplify';
import * as utils from 'serverless-tools';

// app.js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './font.css';
import './main.css';


export default {
  name: 'app',
  components: {
    Login,
    ...components
  },
  mounted(){
    
  },
  created(){

    AmplifyEventBus.$on('fileUpload',img => {
      this.showAlertBox("Your file was uploaded!","success");
    });
    
    AmplifyEventBus.$on('authState', info => {
      if(info === 'signedIn')
      {
        this.showAlertBox("You signed in!","success");
        this.userLoggedIn = true;
        

        Auth.currentAuthenticatedUser().then(user => {
          console.log("Authenticated User: ",user);
          this.user = user;
          this.userLoggedIn = true;
        }).catch(e => {
          console.error(e);
        });
        
      }

      if(info === 'signedOut')
      {
        this.user = null;
        this.userLoggedIn = false;
        this.showAlertBox("You signed out! Have a great day!","success");
      }

    });

    Auth.currentAuthenticatedUser().then(user => {
      console.log("Authenticated User: ",user);
      this.user = user;
      this.userLoggedIn = true;
    }).catch(e => {
      console.error(e);
    })
  
  },
  methods: {
    async showAlertBox(message,variant)
    {
        this.alertVariant = variant;
        this.showAlert = true;
        this.alertMessage = message;
        await utils.sleep(2000);
        this.showAlert = false;
    },
    signOutNow()
    {
      
    }
  },
  data(){
    return {
      user: {},
      userLoggedIn: false,
      showAlert: false,
      alertVariant: "success",
      signOutButtonText: "",
      alertMessage: "",
      photoPickerConfig: {
        path: "data",
      },
      authConfig: {
        usernameAttributes: "Email",
        signInConfig: {
          header: "These My Bits...Who are you?",
          username: ""
        },
        signUpConfig: {
          header: "These My Bits...You want to put bits?",
          hideAllDefaults: true,
          signUpFields: [
            {
                label: 'Email',
                key: 'username',
                required: true,
                displayOrder: 1,
                type: 'string',
                signUpWith: true
              },
              {
                label: 'Password',
                key: 'password',
                required: true,
                displayOrder: 2,
                type: 'password'
              },
              {
                label: 'PhoneNumber',
                key: 'phone_number',
                required: true,
                displayOrder: 3,
                type: 'string'
              }
          ]
        },

      }
    }
  }
}
</script>

<style>

</style>
