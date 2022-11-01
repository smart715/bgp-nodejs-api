<template>
  <b-row class="users-edit" v-if="user != null">
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3 mt-5">
          <b-link @click="$router.go(-1)">
            <font-awesome-icon icon="arrow-left-long" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">Back</h5>
          <b-button @click.prevent="saveSettings">Save</b-button>
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
                v-model="user.username"
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
                v-model="user.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Role" label-for="role" class="mb-3">
              <b-form-select
                id="role"
                v-model="user.roleId"
                required
                :options="options"
              />
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
// import User from "../../models/User";
import UserService from "../../../services/user.service";
// import UiFormInput from "../../ui/UiFormInput.vue";
export default {
  name: "PageUserEdit",
  data: function () {
    return {
      user: null,
      role: 1,
      options: [
        {
          text: "User",
          value: 1,
        },
        {
          text: "Admin",
          value: 3,
        },
        {
          text: "Moderator",
          value: 2,
        },
      ],
      username: "",
      email: "",
      password: null,
      errors: {},
    };
  },
  components: {
    // UiFormInput,
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      const response = await UserService.getUserById("/users/" + this.userId);
      this.user = response.data.user;
      this.role = response.data.user.roleId;
    },
    async saveSettings() {
      this.errors = {};
      const response = await UserService.updateUser(
        "/users/edit/" + this.userId,
        {
          username: this.user.username,
          email: this.user.email,
          role: this.user.roleId,
          password: this.password,
        }
      );
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
