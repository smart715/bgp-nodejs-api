<template>
  <div class="col-md-12 p-5">
    <div class="card card-container">
      <Form
        @submit="handlePasswordReset"
        :validation-schema="schema"
        class="p-5"
      >
        <div class="form-group">
          <label for="email">New Password</label>
          <Field name="email" type="email" class="form-control" />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block">
            <!-- <span class="spinner-border spinner-border-sm"></span> -->
            <span>Send By Email</span>
          </button>
        </div>
      </Form>
      <p class="text-center text-danger">{{ message }}</p>
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
      email: yup.string().required("Email is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  mounted() {
    if (this.$route.path === "/passwordResetInput/:confirmationCode") {
      this.verifyUser();
    }
  },
  methods: {
    async handlePasswordReset(value) {
      const url = "passwordReset";
      const response = await AuthService.passwordReset(url, value);
      if (response.status == 200) {
        this.$route.push("/login");
      } else {
        this.$route.push("/passwordReset");
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
