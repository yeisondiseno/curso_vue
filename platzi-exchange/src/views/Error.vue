<template>
  <div class="flex-col items-center">
    <h1 class="text-red-400 text-6xl">
      Error de página
    </h1>
    <p class="text-red-200 text-xl text-center">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis vitae placeat fuga dignissimos repudiandae ipsam distinctio error, blanditiis ducimus architecto quam eligendi ad atque eum maxime tempora dolorum aut provident!
    </p>
    <router-link 
      to='/'
      class="mt-5 text-xl text-green-600 hover:underline"
    >
      Volver a la página de inicio 
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Error',
  }
</script>