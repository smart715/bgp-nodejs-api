<template>
  <div class="col-md-12 p-5">
    <h1 class="text-center">Reset your password</h1>
    <div class="card p-5" v-if="show">
      <p>
        Check your email for a link to reset your password.If it doesn't appear
        within a few minutes, check your spam folder
      </p>
      <b-link class="btn btn-success btn-block w-100" :to="{ name: 'login' }">
        <!-- <span class="spinner-border spinner-border-sm"></span> -->
        <span>Return to sign in</span>
      </b-link>
    </div>
    <div class="card" v-else>
      <Form
        @submit="handlePasswordReset"
        :validation-schema="schema"
        class="p-5"
      >
        <p>
          <b>
            Enter your user account's verified email address and we will send
            you a password reset link
          </b>
        </p>
        <div class="form-group">
          <Field
            name="email"
            type="email"
            class="form-control"
            placeholder="test@gmail.com"
          />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group mt-2">
          <button class="btn btn-success btn-block w-100">
            <!-- <span class="spinner-border spinner-border-sm"></span> -->
            <span>Send password reset email</span>
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
  name: "PasswordReset",
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
      show: false,
    };
  },
  methods: {
    async handlePasswordReset(value) {
      const url = "sendResetEmail";
      const response = await AuthService.sendResetEmail(url, value);
      if (response.status == 200) {
        this.message = response.data.message;
        this.show = true;
        return;
      }
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
