<template>
  <div class="col-md-12 p-5">
    <div class="card card-container">
      <Form
        @submit="handlePasswordReset"
        :validation-schema="schema"
        class="p-5"
      >
        <div class="form-group">
          <label for="email">Email</label>
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
    };
  },
  methods: {
    async handlePasswordReset(value) {
      const url = "sendResetEmail";
      const response = await AuthService.sendResetEmail(url, value);
      if (response) {
        this.message = response.data.message;
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
