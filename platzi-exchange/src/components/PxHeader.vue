<template>
  <header class="shadow w-screen">
    <nav>
      <nav class="flex items-center justify-between flex-wrap bg-green-400 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <PxIcon class="mr-2" />
          <router-link
            class="font-semibold text-xl tracking-tight"
            :to="{ name: 'home' }"
          >
            PlatziExchange
          </router-link>
          <div
            class="
              hidden
              sm:block
              w-full
              blok
              flex-grow
              lg:flex lg:items-center lg:wauto
            "
          >
            <div class="text-sm lg:flex-grow">
              <router-link
                class="
                  block
                  mt-4
                  lg:inline-block lg:mt-0
                  text-teal-200
                  hover:text-white
                  mr-4
                "
                v-for="l in links"
                :key="l.title"
                :to="l.to"
              >
                {{ l.title }}
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
import PxIcon from "@/components/PxIcon";

export default {
  name: "PxHeader",
  props: {
    links: {
      type: Array,
      default: () => {},
    },
  },
  components: {
    PxIcon,
  },
};
</script>

<style scoped></style>
