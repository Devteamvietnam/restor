<template>
        <div class="q-gutter-md flex flex-center flex-beetwen ">
            <q-card class="my-card" bordered="bordered">
                <q-card-section>
                    <div class="text-h3 text-orange-9 text-center q-pa-xs">{{name}}
                    </div>
                    <div class="text-caption text-grey q-mt-sm q-pa-md">
                        <img
                            id="profile-img"
                            src="https://svgur.com/i/65U.svg"
                            class="profile-img-card"/>
                        <q-form @submit.prevent="handleLogin">
                            <div class="q-mt-sm q-pa-md">
                                <q-input
                                    class="col-12"
                                    id="username"
                                    color="green"
                                    ref="username"
                                    v-model="user.username"
                                    placeholder="Username"
                                    required="required"
                                    outlined="outlined"
                                    autofocus="autofocus"
                                    dense="dense">
                                    <template v-slot:prepend>
                                        <q-icon name="fas fa-user-shield" class="cursor-pointer"></q-icon>
                                    </template>
                                </q-input>
                            </div>
                            <div class="q-mt-sm q-pa-md">
                                <q-input
                                    class="col-12"
                                    id="password"
                                    color="green"
                                    :type="isPwd? 'password': 'text'"
                                    required="required"
                                    v-model="user.password"
                                    placeholder="Password"
                                    outlined="outlined"
                                    autofocus="autofocus"
                                    dense="dense">
                                    <template v-slot:prepend>
                                        <q-icon name="fas fa-lock" class="cursor-pointer"></q-icon>
                                    </template>
                                    <template v-slot:append>
                                        <q-icon
                                            :name="isPwd ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer"
                                            @click="isPwd = !isPwd"></q-icon>
                                    </template>
                                </q-input>
                            </div>
                            <div class="checkbox">
                                <q-checkbox
                                  id="rememberMe"
                                  v-model="rememberMe"
                                  label="Remember me"
                                />
                            </div>
                            <div class="q-mt-sm q-pa-md text-center text-h4 text-blue-9">
                                <q-btn
                                    :disabled="loading"
                                    class="btnLogin"
                                    type="submit"
                                    color="primary"
                                    :loading="submitting"
                                    label="Login"
                                    no-caps="no-caps">
                                    <template v-slot:loading>
                                        <q-spinner-puff/>
                                    </template>
                                </q-btn>
                            </div>
                        </q-form>
                    </div>
                        <div class="row justify-end">
                         <p>Coppyrint © 2020 Devteam</p>
                        </div>
                </q-card-section>
            </q-card>
        </div>
</template>

<script>
import User from '../../services/login/user'
export default {
  name: 'Sign',
  data () {
    return {
      check: false,
      loading: false,
      rememberMe: false,
      user: new User('', ''),
      message: '',
      submitting: false,
      isPwd: true,
      name: 'Login'
    }
  },
  methods: {
    handleLogin () {
      this.loading = true
      if (this.user.username && this.user.password) {
        this
          .$store
          .dispatch('auth/login', this.user)
          .then(() => {
            this
              .$q
              .notify(
                { icon: 'done', message: 'Login Success Welcome to  Restorang Admin', color: 'green', textColor: 'white', timeout: 3000 }
              )
            this
              .$router
              .push('/rem')
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 401) {
                this
                  .$q
                  .notify(
                    { icon: 'announcement', color: 'red', message: 'Error: Unauthorized', textColor: 'white', timeout: 3000 }
                  )
              } else if (error.response.status === 404) {
                this
                  .$q
                  .notify(
                    { icon: 'announcement', color: 'red', textColor: 'white', timeout: 3000, message: 'User name not found!' }
                  )
              } else {
              }
            }
          })
          . finally(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>

<style scoped="scoped">
    .my-card {
        width: 100%;
        max-width: 450px;
        margin-top: 80px;
    }
    .btnLogin {
        width: 150px;
    }
    .btnConfirm {
        width: 150px;
        margin-left: 15px;
    }
    .btnCancel {
        width: 150px;
        margin-right: 15px;
    }
    label {
        display: block;
        margin-top: 10px;
    }

    .card-container.card {
        max-width: 350px !important;
        padding: 40px;
    }

    .card {
        background-color: #f7f7f7;
        padding: 20px 25px 30px;
        margin: 50px auto 25px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    }

    .profile-img-card {
        width: 190px;
        height: 180px;
        margin: 0 auto 10px;
        display: block;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
    }
    .checkbox {
      margin-left: 10px;
    }
</style>
