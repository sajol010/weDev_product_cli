<template>
<div class="container-fluid">
  <div class="row">
    <h3>New Product</h3>
  </div>
  <div class="row">
    <form v-on:submit="addNewProduct">
      <div class="form-group">
        <label for="productName">Title</label>
        <input type="text" class="form-control" id="productName" aria-describedby="nameHelp" placeholder="Product Title" v-model="formData.title">
        <small id="nameHelp" class="form-text text-danger" v-if="errors.title">{{errors.title}}</small>
      </div>
      <div class="form-group">
        <label for="productPrice">Price</label>
        <input type="number" class="form-control" id="productPrice" aria-describedby="priceHelp" placeholder="Product Price" v-model="formData.price">
        <small id="priceHelp" class="form-text text-danger" v-if="errors.price">{{errors.price}}</small>
      </div>

      <div class="form-group">
        <label for="productDescription">Description</label>
       <textarea class="form-control" id="productDescription" aria-describedby="descriptionHelp" v-model="formData.description"/>
        <small id="descriptionHelp" class="form-text text-danger" v-if="errors.description">{{errors.description}}</small>
      </div>

      <div class="form-group">
        <label for="imgDescription">Image</label>
        <input class="form-control" type="file" id="imgDescription" aria-describedby="imgHelp" @change="getImage"/>
        <small id="imgHelp" class="form-text text-danger" v-if="errors.image">{{errors.image}}</small>
      </div>
      <div class="form-group mt-2">
        <router-link to="/products" class="btn btn-warning">Cancel</router-link>
        &nbsp;<button type="submit" class="btn btn-primary">Submit</button>
      </div>

    </form>
  </div>

</div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ProductAdd',
  data(){
    return{
      formData:{
        title: '',
        price: '',
        description: '',
        image: ''
      },
      errors:{

      }
    }
  },
  methods:{
    addNewProduct: function (e){
      e.preventDefault()
      console.log(this.validate())
      if (this.validate()){
        return;
      }
      let formData = new FormData();
      let $this = this;
      formData.append('title', this.formData.title);
      formData.append('price', this.formData.price);
      formData.append('description', this.formData.description);
      formData.append('image', this.formData.image);
      axios.post('product/add', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response){
        let res = response.data;

        if(res.status == 'OK'){
        
        $this.$router.push({path:'/products'});
        }

      });

    },
    getImage: function (event){
      this.formData.image = event.target.files[0];
    },

    validate: function (){
      this.errors = [];
      let is_error = false;
      if (!this.formData.title){
        this.errors['title'] = 'Title is required';
        is_error = true;
      }

      if (!this.formData.price){
        this.errors['price'] = 'Price is required';
        is_error = true;
      }
      if (!this.formData.description){
        this.errors['description'] = 'Description is required';
        is_error = true;
      }

      if (!this.formData.image){
        this.errors['image'] = 'Image is required';
        is_error = true;
      }

      return is_error;
    }
  }
}
</script>