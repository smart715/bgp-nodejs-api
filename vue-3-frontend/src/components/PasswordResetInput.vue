<template>
  <div class="col-md-12 p-5">
    <h1 class="text-center">Reset your password</h1>
    <div class="card">
      <Form
        @submit="handlePasswordReset"
        :validation-schema="schema"
        class="p-5"
      >
        <div class="form-group">
          <label for="password">New Password</label>
          <Field name="password" type="text" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block mt-2">
            <!-- <span class="spinner-border spinner-border-sm"></span> -->
            <span>Update</span>
          </button>
        </div>
      </Form>
      <p class="text-center text-danger">{{ title }}</p>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import AuthService from "../services/auth.service";
import * as yup from "yup";
export default {
  name: "PasswordResetInput",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      password: yup.string().required("Password is required!"),
    });
    return {
      password: "",
      loading: false,
      message: "",
      schema,
    };
  },
  mounted() {
    this.verifyUser();
  },
  methods: {
    async handlePasswordReset(value) {
      const url = "passwordReset";
      const response = await AuthService.passwordReset(url, {
        confirmationCode: this.$route.params.confirmationCode,
        password: value.password,
      });
      if (response.status == 200) {
        this.$router.push("/login");
      } else {
        this.$router.push("/passwordReset");
      }
    },
    async verifyUser() {
      const response = await AuthService.verifyUser(
        this.$route.params.confirmationCode
      );
      if (response.status === 200) this.title = response.data.message;
    },
  },
};
</script>
<style scoped>
.profile-img-card {
  width: 25%;
  height: 25%;
}
</style>
