<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">GoBGP</a>
    <div class="navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'home' }" class="nav-link">
          <font-awesome-icon icon="home" /> Home
        </router-link>
      </li>
      <li v-if="showAdminBoard" class="nav-item">
        <router-link :to="{ name: 'admin' }" class="nav-link"
          ><font-awesome-icon icon="users" /> Users</router-link
        >
      </li>
      <li v-if="showModeratorBoard" class="nav-item">
        <router-link :to="{ name: 'moderator' }" class="nav-link"
          >Moderator Board</router-link
        >
      </li>
      <!-- <li class="nav-item">
        <router-link v-if="currentUser" :to="{ name: 'user' }" class="nav-link"
          >User</router-link
        >
      </li> -->
      <li class="nav-item">
        <router-link v-if="currentUser" :to="{ name: 'rule' }" class="nav-link"
          ><font-awesome-icon icon="clipboard-list" /> Rules</router-link
        >
      </li>
    </div>
    <div v-if="!currentUser" class="navbar-nav ms-auto">
      <li class="nav-item">
        <router-link :to="{ name: 'register' }" class="nav-link">
          <font-awesome-icon icon="user-plus" /> Sign Up
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'login' }" class="nav-link">
          <font-awesome-icon icon="sign-in-alt" /> Login
        </router-link>
      </li>
    </div>
    <div v-else class="navbar-nav ms-auto">
      <li class="nav-item">
        <router-link to="/profile" class="nav-link">
          <font-awesome-icon icon="user" />
          {{ currentUser.username }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click.prevent="logOut">
          <font-awesome-icon icon="sign-out-alt" /> Logout
        </a>
      </li>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role === "admin";
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role === "moderator";
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
