<template>
  <b-row class="rule-edit" v-if="rule != null">
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3 mt-5">
          <b-link @click="$router.go(-1)">
            <font-awesome-icon icon="arrow-left-long" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">Back</h5>
          <b-button @click.prevent="saveSettings">update</b-button>
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
              <b-form-input
                id="details"
                name="details"
                v-model="rule.details"
                type="text"
                placeholder="Enter details"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="status" label-for="status">
              <b-form-input
                id="status"
                name="status"
                v-model="rule.status"
                type="text"
                placeholder="Enter status"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-4"
              label="DestinationPrefix"
              label-for="destinationPrefix"
            >
              <b-form-input
                id="destinationPrefix"
                name="destinationPrefix"
                v-model="rule.destinationPrefix"
                type="text"
                placeholder="Enter destinationPrefix"
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
                v-model="rule.sourcePrefix"
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
                v-model="rule.ipProtocol"
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
                v-model="rule.sourcePort"
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
                v-model="rule.destinationPort"
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
                v-model="rule.ICMPType"
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
                v-model="rule.ICMPCode"
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
                v-model="rule.TCPflags"
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
                v-model="rule.packetLength"
                type="number"
                placeholder="Enter packetLength"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-13" label="DSCP" label-for="DSCP">
              <b-form-input
                id="DSCP"
                name="DSCP"
                v-model="rule.DSCP"
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
                v-model="rule.FREncoding"
                type="text"
                placeholder="Enter FREncoding"
                required
              ></b-form-input>
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
  name: "FlowSpecEdit",
  data: function () {
    return {
      rule: null,
      details: "",
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
  mounted() {
    this.getRuleById();
  },
  methods: {
    async getRuleById() {
      const response = await FlowSpecService.getFlowSpecRuleById(
        "flowspec/" + this.$route.params.id
      );
      this.rule = response.data.rule;
    },
    async saveSettings() {
      this.errors = {};
      const response = await FlowSpecService.updateFlowSpecRules(
        "flowspec/update/" + this.$route.params.id,
        this.rule
      );
      if (response) {
        this.rule = response.data.rule;
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
