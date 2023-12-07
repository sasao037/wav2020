<template>
  <v-app>
    <v-main>
      <Menu />
      <Reserve />
    </v-main>
  </v-app>
</template>

<script>
import router from "../../router";
import Menu from "./Menu.vue";
import Reserve from "./Reserve.vue";


export default {
  name: "WavHome",
  components: {
    Menu,
    Reserve,
  },
  // mounted() {
  //    this.checkLoggedIn();
  //},
  methods: {
      checkLoggedIn() {
        this.$session.start();
        if (!this.$session.has("token")) {
          router.push("/auth");
        }
      }
  },
}

</script>
