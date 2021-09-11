<template>
  <div>
    <BarLoader :loading="loading" :color="'#68d391'" :size="'100px'" />
    <PxAssetsTable v-if="!loading" :assets="assets" />
  </div>
</template>

<script>
import BarLoader from "@saeris/vue-spinners";
import PxAssetsTable from "@/components/PxAssetsTable";
import api from "@/api";

export default {
  name: "Home",
  components: { BarLoader, PxAssetsTable },
  data() {
    return {
      isLoading: true,
      assets: [],
    };
  },
  created() {
    api
      .getAssets()
      .then((data) => (this.assets = data))
      .finally(() => (this.isLoading = false));
  },
};
</script>
