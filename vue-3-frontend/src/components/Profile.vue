<template>
  <b-row class="profile-edit mt-5" v-if="profile != null">
    <h1 class="text-center">Profile Edit</h1>
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3 mt-5">
          <b-link @click="$router.go(-1)">
            <font-awesome-icon icon="arrow-left-long" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">Back</h5>
          <b-button @click.prevent="saveSettings">Update</b-button>
        </div>
      </b-row>
      <b-form>
        <b-row>
          <div class="w-100 mx-3 mt-3">
            <b-form-group
              id="input-group-1"
              label="Username"
              label-for="username"
              description="We'll never share your username with anyone else."
            >
              <b-form-input
                id="username"
                name="username"
                v-model="profile.username"
                type="text"
                placeholder="Enter username"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-2"
              label="Email"
              label-for="email"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="email"
                name="email"
                v-model="profile.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-4"
              label="New password"
              label-for="password"
            >
              <b-form-input
                id="password"
                name="password"
                v-model="password"
                type="text"
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>
          </div>
        </b-row>
      </b-form>
    </b-col>
  </b-row>
</template>
<script>
import UserService from "../services/user.service";
export default {
  name: "ProfileEdit",
  data: function () {
    return {
      profile: null,
      password: null,
      errors: {},
    };
  },
  mounted() {
    this.loadProfile();
  },
  methods: {
    async loadProfile() {
      const response = await UserService.getUserProfile("profile");
      this.profile = response.data.profile;
    },
    async saveSettings() {
      this.errors = {};
      const response = await UserService.updateProfile("profile/update", {
        username: this.profile.username,
        email: this.profile.email,
        password: this.password,
      });
      if (response) {
        this.user = response.data.user;
        // this.$bvToast.toast("saved", {
        //   autoHideDelay: 2000,
        //   title: "Success",
        //   solid: true,
        //   toaster: "b-toaster-bottom-left",
        // });
      }
    },
  },
};
</script>
