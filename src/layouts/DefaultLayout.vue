<template>
<div class="container ">
    <!-- App title section -->
<!--    <div class="row m-1 p-4">-->
<!--        <div class="col">-->
<!--            <div class="p-1 h1 text-primary text-center mx-auto display-inline-block">-->
<!--                <i class="fa fa-check bg-primary text-white rounded p-2"></i>-->
<!--                <u>My App</u>-->
<!--            </div>-->
<!--        </div>-->

<!--    </div>-->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">

        <li class="nav-item">
          <a class="nav-link disabled" href="#"></a>
        </li>
      </ul>
      <button class="btn btn-outline-danger my-2 my-sm-0" type="button" v-on:click="logout">Logout</button>
    </div>
  </nav>
    <!-- Create todo section -->
    <div class="p-2 mx-4 border-black-25 border-bottom"></div>
    <div class="row mx-1 px-5 pb-3 w-80">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {
    name: 'DefaultLayout',

  methods: {
      logout: function (){
        this.$store.dispatch('logout')
      }
  }
}
</script>