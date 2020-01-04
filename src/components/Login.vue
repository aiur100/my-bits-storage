<template>
    <div class="container">
        <div class="row ">
            
            <div class="col-lg-6 mx-auto">
                <div class="card mt-3">

                <div class="card-header">
                    <h3>Who are you?</h3>
                </div>    

                <div class="card-body">    
                    <form class="form-check">
                        <label class="float-left">Email</label>
                        <input type="email" v-model="form.email" class="form-control mb-3"/>

                        <label class="float-left">Password</label>
                        <input type="password" v-model="form.password" class="form-control mb-3"/>

                        <button class="btn btn-info btn-block" @click="logIn()">

                            <span ref="buttonMessage" v-show="!loggingIn">These My Bits, Yo!</span>
                            <div  ref="logginIn" v-show="loggingIn" class="spinner-border spinner-border-sm" role="status">
                                <span class="sr-only">Loading...</span>
                                
                            </div>
                        </button>
                    </form>
                </div>
            
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return { 
            form : {
                email: "",
                name: ""
            },
            loggingIn: false
        }
    },
    methods: {
        logIn(){
            this.loggingIn = true;
        }
    }
}
</script>