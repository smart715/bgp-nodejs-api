<template>
  <div class="mt-5">
    <h1 class="text-center">Users</h1>
    <div class="d-flex justify-content-end w-100 mx-3">
      <h5 class="p-0 my-3 mx-2"><font-awesome-icon icon="search" /></h5>
      <b-nav pills>
        <b-nav-form class="mr-2">
          <b-form-input
            :placeholder="'Username search'"
            v-model="q"
            type="search"
            @input="handleSearchChange"
            class="mr-1"
          ></b-form-input>
        </b-nav-form>
      </b-nav>
    </div>
    <b-row class="users" v-if="total > 0">
      <b-table
        id="user-table"
        ref="user-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
        hover
        responsive
        class="small nowrap"
      >
        <template #cell(actions)="data">
          <b-button
            variant="primary"
            class="mr-2"
            size="sm"
            :to="'/admin/user/edit/' + data.item.id"
          >
            <font-awesome-icon icon="pencil" />
          </b-button>
          <b-button
            @click.prevent="del(data.item)"
            variant="danger"
            size="sm"
            class="ms-1"
          >
            <font-awesome-icon icon="trash" />
          </b-button>
        </template>
        <template #cell(roleId)="data">
          {{ showRoleName(data.item.roleId) }}
        </template>
        <template #cell(createdAt)="data">
          {{ getDateString(data.item.createdAt) }}
        </template>
        <template #cell(updatedAt)="data">
          {{ getDateString(data.item.updatedAt) }}
        </template>
        <template #cell(status)="data">
          <b-form-checkbox
            v-model="data.item.status"
            @change="changeStatus(data.item)"
            name="check-button"
            switch
          >
          </b-form-checkbox>
        </template>
      </b-table>
      <b-row class="text-center m-3 d-block">
        <b-pagination
          v-model="currentPage"
          align="center"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="user-table"
        ></b-pagination>
      </b-row>
    </b-row>
    <b-row v-else>
      <p class="text-center">No user</p>
    </b-row>
  </div>
</template>
<script>
import UserService from "../services/user.service";
import { DateTime } from "luxon";
export default {
  name: "BoardAdmin",
  data() {
    return {
      q: "",
      total: 0,
      perPage: 6,
      currentPage: 1,
      items: [],
      fields: [
        { key: "id", label: "Id" },
        { key: "username", label: "Username" },
        { key: "email", label: "Email" },
        { key: "createdAt", label: "CreatedAt" },
        { key: "updatedAt", label: "UpdatedAt" },
        { key: "roleId", label: "Role" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions", tdClass: "full" },
      ],
    };
  },
  watch: {
    currentPage(newPage) {
      this.loadUsers(newPage);
    },
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    loadUsers(page = this.currentPage) {
      const url = "/users";
      UserService.getAdminBoard(url, {
        currentPage: page,
        perPage: this.perPage,
        text: this.q,
      }).then(
        (response) => {
          this.items = response.data.users;
          this.total = response.data.total;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    async del(item) {
      const url = "/users/delete/" + item.id;
      const response = await UserService.removeUser(url);
      if (response.status === 200) {
        this.loadUsers();
      }
    },
    handleSearchChange() {
      this.loadUsers();
    },
    showRoleName(roleId) {
      switch (roleId) {
        case 1:
          return "user";
        case 2:
          return "moderator";
        case 3:
          return "admin";
        default:
          return "user";
      }
    },
    async changeStatus(item) {
      const url = "/users/changeStatus/" + item.id;
      const response = await UserService.changeStatus(url, item);
      if (response.status === 200) {
        this.loadUsers();
      }
    },
    getDateString(date) {
      return DateTime.fromISO(date).toFormat("yyyy-M-d");
    },
  },
};
</script>
