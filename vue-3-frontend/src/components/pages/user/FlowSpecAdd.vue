<template>
  <b-row class="rule-edit mt-5">
    <h1 class="text-center">Add new rule</h1>
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3 mt-5">
          <b-link @click="$router.go(-1)">
            <font-awesome-icon icon="arrow-left-long" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">Back</h5>
          <b-button @click.prevent="saveSettings">Save</b-button>
        </div>
      </b-row>
      <b-form>
        <b-row>
          <div class="w-100 mx-3 mt-3">
            <b-form-group
              id="input-group-2"
              label="details"
              label-for="details"
            >
              <b-form-textarea
                id="details"
                v-model="details"
                placeholder="Enter details"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group label="Status" label-for="status" class="mb-3">
              <b-form-select
                id="status"
                v-model="status"
                required
                :options="options"
              />
            </b-form-group>
            <b-form-group
              id="input-group-4"
              label="DestinationPrefix"
              label-for="destinationPrefix"
            >
              <b-form-input
                id="destinationPrefix"
                name="destinationPrefix"
                v-model="destinationPrefix"
                type="text"
                placeholder="Enter destinationPrefix"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-4"
              label="RateLimit"
              label-for="rate_limit"
            >
              <b-form-input
                id="rate_limit"
                name="rate_limit"
                v-model="rate_limit"
                type="text"
                placeholder="Enter rate limit"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-5"
              label="SourcePrefix"
              label-for="sourcePrefix"
            >
              <b-form-input
                id="sourcePrefix"
                name="sourcePrefix"
                v-model="sourcePrefix"
                type="text"
                placeholder="Enter sourcePrefix"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-6"
              label="IpProtocol"
              label-for="ipProtocol"
            >
              <b-form-input
                id="ipProtocol"
                name="ipProtocol"
                v-model="ipProtocol"
                type="text"
                placeholder="Enter ipProtocol"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-7"
              label="SourcePort"
              label-for="sourcePort"
            >
              <b-form-input
                id="sourcePort"
                name="sourcePort"
                v-model="sourcePort"
                type="number"
                placeholder="Enter sourcePort"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-8"
              label="DestinationPort"
              label-for="destinationPort"
            >
              <b-form-input
                id="destinationPort"
                name="destinationPort"
                v-model="destinationPort"
                type="number"
                placeholder="Enter destinationPort"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-9"
              label="ICMPType"
              label-for="ICMPType"
            >
              <b-form-input
                id="ICMPType"
                name="ICMPType"
                v-model="ICMPType"
                type="text"
                placeholder="Enter ICMPType"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-10"
              label="ICMPCode"
              label-for="ICMPCode"
            >
              <b-form-input
                id="ICMPCode"
                name="ICMPCode"
                v-model="ICMPCode"
                type="number"
                placeholder="Enter ICMPCode"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-11"
              label="TCPflags"
              label-for="TCPflags"
            >
              <b-form-input
                id="TCPflags"
                name="TCPflags"
                v-model="TCPflags"
                type="text"
                placeholder="Enter TCPflags"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-12"
              label="packetLength"
              label-for="packetLength"
            >
              <b-form-input
                id="packetLength"
                name="packetLength"
                v-model="packetLength"
                type="number"
                placeholder="Enter packetLength"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-13" label="DSCP" label-for="DSCP">
              <b-form-input
                id="DSCP"
                name="DSCP"
                v-model="DSCP"
                type="text"
                placeholder="Enter DSCP"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-14"
              label="FREncoding"
              label-for="FREncoding"
            >
              <b-form-input
                id="FREncoding"
                name="FREncoding"
                v-model="FREncoding"
                type="text"
                placeholder="Enter FREncoding"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="IS blocked" label-for="block" class="mb-3">
              <b-form-select
                id="block"
                v-model="is_blocked"
                :options="booleanOptions"
                required
              />
            </b-form-group>
          </div>
        </b-row>
      </b-form>
    </b-col>
  </b-row>
</template>
<script>
import FlowSpecService from "../../../services/flow-spec.service";
// import UiFormInput from "../../ui/UiFormInput.vue";
export default {
  name: "FlowSpecCreate",
  data: function () {
    return {
      rate_limit: 0,
      details: "",
      is_blocked: false,
      status: "active",
      destinationPrefix: "",
      sourcePrefix: "",
      ipProtocol: "",
      sourcePort: 0,
      destinationPort: 0,
      ICMPType: "",
      ICMPCode: 0,
      TCPflags: "",
      packetLength: 0,
      DSCP: "",
      FREncoding: "",
      errors: {},
      options: [
        {
          value: "active",
          text: "Active",
        },
        {
          value: "inactive",
          text: "Inactive",
        },
      ],
      booleanOptions: [
        {
          value: true,
          text: "True",
        },
        {
          value: false,
          text: "False",
        },
      ],
    };
  },
  components: {
    // UiFormInput,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    async saveSettings() {
      this.errors = {};
      const response = await FlowSpecService.createFlowSpecRules(
        "flowspec/create",
        {
          rate_limit: this.rate_limit,
          details: this.details,
          status: this.status,
          is_blocked: this.is_blocked,
          destinationPrefix: this.destinationPrefix,
          sourcePrefix: this.sourcePrefix,
          ipProtocol: this.ipProtocol,
          sourcePort: this.sourcePort,
          destinationPort: this.destinationPort,
          ICMPType: this.ICMPType,
          ICMPCode: this.ICMPCode,
          TCPflags: this.TCPflags,
          packetLength: this.packetLength,
          DSCP: this.DSCP,
          FREncoding: this.FREncoding,
        }
      );
      if (response) {
        this.$router.push({ name: "rule" });
        // this.user = response.data.user;
        // this.$bvToast.toast("saved", {
        //   autoHideDelay: 2000,
        //   title: "Success",
        //   solid: true,
        //   toaster: "b-toaster-bottom-left",
        // });
      }
    },
  },
};
</script>
