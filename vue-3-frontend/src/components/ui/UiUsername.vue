<template>
  <b-link v-if="asLink" :to="user.url" class="d-flex align-items-center">
    <span :class="bold ? 'font-weight-bold' : ''" class="username">{{
      user.name
    }}</span>
    <i class="bi-patch-check-fill ml-1" style="color: #00aff0;font-size: 13px;margin-top: 3px;" v-if="user.isCreator"></i>
    <span class="text-muted small-username ml-1" v-if="full">{{
      "@" + user.username
    }}</span>
  </b-link>
  <div v-else class="d-flex align-items-center">
    <span :class="bold ? 'font-weight-bold' : ''" class="">{{
      user.name
    }}</span>
    <i class="bi-patch-check-fill ml-1" style="color: #00aff0;font-size: 13px;margin-top: 3px;" v-if="user.isCreator"></i>
    <span class="text-muted small-username ml-1" v-if="full">{{
      "@" + user.username
    }}</span>
  </div>
</template>
<script>
import User from "../models/User";
export default {
  props: {
    user: User,
    full: {
      type: Boolean,
      default: false,
    },
    asLink: {
      type: Boolean,
      default: true,
    },
    bold: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
