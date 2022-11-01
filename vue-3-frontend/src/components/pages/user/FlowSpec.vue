<template>
  <div class="mt-5">
    <h1 class="text-center">Manual Rules</h1>
    <b-button variant="primary" class="mr-2" size="sm" :to="'/flowspec/create'">
      <font-awesome-icon icon="plus" /> Add
    </b-button>
    <div class="d-flex justify-content-end w-100 mx-3">
      <h5 class="p-0 my-3 mx-3">
        <font-awesome-icon icon="search" />
      </h5>
      <b-nav pills>
        <b-nav-form class="mr-2">
          <b-form-input
            :placeholder="'Detail search'"
            v-model="q"
            type="search"
            @input="handleSearchChange"
            class="mr-1"
          ></b-form-input>
        </b-nav-form>
      </b-nav>
    </div>
    <b-row class="rules" v-if="total > 0">
      <b-table
        id="rules-table"
        :items="specRules"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
        ref="rules-table"
        hover
        class="small nowrap"
      >
        <template #cell(actions)="data">
          <b-dropdown
            id="dropdown-dropleft"
            dropleft
            variant="primary"
            text="Actions"
            class="sm-1"
          >
            <b-dropdown-item href="#">
              <b-nav-form class="">
                <span class="d-flex align-items-center me-1">Rate</span>
                <b-form-input
                  :placeholder="'Detail search'"
                  v-model="data.item.rate_limit"
                  type="text"
                  @input="handleRateLimitChange(data.item)"
                ></b-form-input>
              </b-nav-form>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#">
              <div class="d-flex justify-content-center">
                <b-button
                  @click.prevent="block(data.item)"
                  variant="primary"
                  size="sm"
                  class="ms-1"
                >
                  {{ data.item.is_blocked ? "Blocked" : "UnBlocked" }}
                </b-button>
              </div>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>
              <div class="d-flex justify-content-between">
                <b-button
                  variant="primary"
                  class="mr-2"
                  size="sm"
                  :to="'/flowspec/edit/' + data.item.id"
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
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <b-row class="text-center m-3 d-block">
        <b-pagination
          v-model="currentPage"
          align="center"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="rules-table"
        ></b-pagination>
      </b-row>
    </b-row>
    <b-row v-else>
      <p class="text-center">No rules</p>
    </b-row>
  </div>
</template>
<script>
import FlowSpecService from "../../../services/flow-spec.service";

export default {
  name: "FlowSpec",
  data() {
    return {
      q: "",
      specRules: [],
      currentPage: 1,
      perPage: 6,
      total: 0,
      fields: [
        { key: "id", label: "Id" },
        { key: "uuid", label: "Uuid" },
        { key: "details", label: "Details" },
        { key: "status", label: "status" },
        { key: "destinationPrefix", label: "destinationPrefix" },
        { key: "sourcePrefix", label: "sourcePrefix" },
        { key: "ipProtocol", label: "ipProtocol" },
        { key: "sourcePort", label: "sourcePort" },
        { key: "destinationPort", label: "destinationPort" },
        { key: "ICMPType", label: "ICMPType" },
        { key: "ICMPCode", label: "ICMPCode" },
        { key: "TCPflags", label: "TCPflags" },
        { key: "packetLength", label: "packetLength" },
        { key: "DSCP", label: "DSCP" },
        { key: "FREncoding", label: "FREncoding" },
        { key: "actions", label: "Actions", tdClass: "full" },
      ],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  watch: {
    currentPage(newPage) {
      this.loadFlowSpec(newPage);
    },
  },
  mounted() {
    this.loadFlowSpec();
  },
  methods: {
    async loadFlowSpec(page = this.currentPage) {
      const url = "flowspec";
      const response = await FlowSpecService.getFlowSpecRules(url, {
        currentPage: page,
        perPage: this.perPage,
        text: this.q,
      });
      if (response) {
        this.specRules = response.data.specRules;
        this.total = response.data.total;
      }
    },
    async del(item) {
      const url = "flowspec/delete/" + item.id;
      const response = await FlowSpecService.removeFlowSpecRule(url);
      if (response.status === 200) {
        this.loadFlowSpec();
      }
    },
    handleSearchChange() {
      this.loadFlowSpec();
    },
    async handleRateLimitChange(item) {
      const url = "flowspec/update/" + item.id;
      await FlowSpecService.updateFlowSpecRules(url, item);
    },
    async block(item) {
      item.is_blocked = true;
      const url = "flowspec/update/" + item.id;
      await FlowSpecService.updateFlowSpecRules(url, item);
    },
  },
};
</script>
