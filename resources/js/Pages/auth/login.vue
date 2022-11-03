<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Login Form</h2>
        <div class="text-center mb-5 text-dark">Made with bootstrap</div>
        <div class="card my-5">

          <form class="card-body cardbody-color p-lg-5">

            <div class="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="200px" alt="profile">
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" id="Username" v-model="loginForm.email"
                aria-describedby="emailHelp" placeholder="User Name">
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" v-model="loginForm.password"
                placeholder="password">
            </div>
            <div class="text-center"><button type="submit" @click.prevent="logIn()" class="btn btn-color px-5 mb-5 w-100">Login</button></div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
              Registered? <a href="/register" class="text-dark fw-bold"> Create an
                Account</a>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "./../../services/api.service"
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      pageTransitionDuration: 3000,
      email: "",
      password: "",
      touched: {
        email: false,
        password: false
      },
      modelValidations: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          min: 5
        }
      }
    };
  },
  methods: {
    logIn() {
      ApiService.post('/api/auth/login',this.loginForm)
      .then(response => {
        const apiData = response.data;
        this.setAuth(apiData.token);
      })
      .catch(error => console.error(error.data))
    },
    setAuth(token){
      localStorage.setItem("auth_token",token);
      ApiService.setAuthToken();
      this.$store.dispatch("auth/setAuthStatus");
    },
    setStore(){
      try{

      }catch(error){
        console.log(error)
      }
    }
  }

}
</script>

<style scoped>
.btn-color {
  background-color: #0e1c36;
  color: #fff;

}

.profile-image-pic {
  height: 200px;
  width: 200px;
  object-fit: cover;
}



.cardbody-color {
  background-color: #ebf2fa;
}

a {
  text-decoration: none;
}
</style>