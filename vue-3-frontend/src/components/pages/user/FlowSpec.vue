<template>
  <div class="mt-5">
    <b-button variant="primary" class="mr-2" size="sm" :to="'/flowspec/create'">
      Create
    </b-button>
    <b-row class="rules" v-if="total > 0">
      <div class="d-flex align-items-center w-100 mx-3">
        <h5 class="text-uppercase p-0 my-3 flex-grow-1">Search</h5>
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
      <b-table
        id="rules-table"
        :items="specRules"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
        ref="rules-table"
        hover
        responsive
        class="small nowrap"
      >
        <template #cell(actions)="data">
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
      <p class="text-center">No spec rules</p>
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
        { key: "uuid", label: "UUID" },
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
  },
};
</script>
