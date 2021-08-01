<template>
  <div>
    <h3 class="text-center text-white pt-5">Login form</h3>
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AuthLayout",
};
</script>

