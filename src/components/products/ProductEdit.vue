<template>
<div class="container-fluid">
  <div class="row">
    <h3>Edit Product</h3>
  </div>
  <div class="row">
    <h5 class="text text-success" v-if="success">Data Updated</h5>
    <form v-on:submit="editProduct">
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
        <small id="imgHelp" class="form-text text-danger" v-if="image_link != ''">Image preview : <img height="70" width="70" :src="image_link"></small>
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
  name: 'ProductEdit',
  data(){
    return{
      formData:{
        title: '',
        price: '',
        description: '',
        image: '',
        id: ''
      },
      image_link: '',
      errors:{

      },
      success: false
    }
  },
  methods:{
    getProduct: function(){
      let product_id = this.formData.id
      let $this = this;
      axios.get('product/'+product_id).then(function(response){
        let res = response.data;
        if(res.status == 'OK'){
          $this.formData.title = res.data.title
          $this.formData.price = res.data.price
          $this.formData.description = res.data.description
          $this.image_link = res.data.image_link
        }
      });
    },
    editProduct: function (e){
      e.preventDefault()
      console.log(this.validate())
      if (this.validate()){
        return;
      }
      let product_id = this.formData.id
      let $this = this;
      let formData = new FormData();
      formData.append('title', this.formData.title);
      formData.append('price', this.formData.price);
      formData.append('description', this.formData.description);
      formData.append('image', this.formData.image);
      formData.append('_method', 'PUT');
      axios.post('product/'+product_id, formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response){

        let res = response.data;

        if(res.status == 'OK'){
        
            $this.success = true
        }

      });

    },
    getImage: function (event){
      this.formData.image = event.target.files[0];
      console.log(this.formData.image)
      this.image_link =URL.createObjectURL(event.target.files[0]);
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


      return is_error;
    }
  },
  mounted: function(){
    this.formData.id = this.$route.params.id;
    this.getProduct();
  }
}
</script>