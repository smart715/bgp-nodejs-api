<template>
  <div className="container">
    <header className="jumbotron">
      <h3>
        <strong>{{ title }}</strong>
      </h3>
    </header>
    <b-button
      variant="primary"
      class="mr-2"
      size="sm"
      :to="{ name: 'login' }"
      v-if="title"
    >
      Login
    </b-button>
  </div>
</template>
<script>
import AuthService from "../services/auth.service";
export default {
  name: "Welcome",
  data() {
    return {
      title: "",
    };
  },
  mounted() {
    this.verifyUser();
  },
  methods: {
    async verifyUser() {
      const response = await AuthService.verifyUser(
        this.$route.params.confirmationCode
      );
      if (response.status === 200) {
        this.$router.push("/login");
        this.title = response.data.message;
      }
    },
  },
};
</script>
