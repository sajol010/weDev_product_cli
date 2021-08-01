<template>
  <div class="row m-1 p-3 px-5">
    <div class="col-auto d-flex align-items-center px-1 pr-3 justify-content-end">
      <router-link to='/products/create' class="btn btn-info">Add New</router-link>
    </div>
  </div>
    <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Image</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">price</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

    <tr v-for="(product, index) in products" :key="index">
      <th scope="row">{{index+1}}</th>
      <td><img height="60" width="60" :src="product.image_link" ></td>
      <td>{{product.title}}</td>
      <td>{{product.description}}</td>
      <td>{{product.price}}</td>
      <td><router-link :to="'/products/edit/'+product.id" class="btn btn-info">Edit</router-link> <button type="button" class="btn btn-danger" v-on:click="deleteProduct(product.id)">Delete</button></td>
    </tr>
  </tbody>
</table>
</template>


<script>
import axios from "axios";

export default {
    
    name: 'ProductList',
  data(){
      return {
        products: []
      }
  },
  methods: {
    getProducts: function (){
      let $this = this;
      axios.get('/product/list').then(function (response){
            response = response.data
          if (response.status == 'OK'){
            $this.products = response.data

          }
      });
    },
    deleteProduct: function(id){
      let $this = this;
      axios.delete('/product/'+id).then(function (response){
            response = response.data
          if (response.status == 'OK'){
            $this.getProducts();

          }
      });
    }
  },
  mounted() {
      this.getProducts();


  }
}
</script>