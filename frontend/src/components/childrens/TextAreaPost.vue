<!-- Textarea for send posts -->

<template>
 <section class="textarea">
    <h1>Send a new post:</h1> 
    <form @submit.prevent="sendNewPost">
      <div class="listCategory">
        <h2>Categorys:</h2>
        <ul>
          <li v-for="category in categorys" :key="category.id">
            <input type="radio" v-model="pickedCategory" :id="category.id" name="category" :value="category.id" required>
            <label :for="category.id">{{category.category}}</label>
          </li>
        </ul>
      </div>
      <p>{{ message }}</p>
      <br>
      <textarea aria-label="Add test in this area" style="width: 100%;" v-model="message" placeholder="Add text"></textarea>
      <br>
      <input aria-label="Add image in this input" type="file" @change="onFileSelected" accept="image/png, image/jpeg, image/gif">
      <br>
      <button type="submit">Send</button> 
    </form> 
  </section>
</template>

<script>
import axios from 'axios'

export default {

  props: ["textarea"],

  data () {
    return {
      categorys: [],
      message : '',
      pickedCategory : 1,
      selectedFile : null
    }
  },
  methods:{

    // Listen if a file has been selected
    onFileSelected(event){
      this.selectedFile = event.target.files[0]
    },

    // Send a new post
    sendNewPost(){
      if(this.message != '' || this.selectedFile != null){
        const fd = new FormData();
        fd.append('user', this.$cookies.get('user'));
        fd.append('category', this.pickedCategory);
        fd.append('message', this.message);
          if(this.selectedFile != null){
            fd.append('image', this.selectedFile, this.selectedFile.name);
          }
        axios.post(this.$urlRoot+"/posts", fd,
        {
          headers: {'Authorization': 'Bearer ' + this.$cookies.get('token')}
        })
          .then(res => {
            this.$emit('custom-event-name',res);
        })
        this.message = '';
        this.selectedFile = null;
      }
    },
    
  },

  async mounted() {
    
    // Retrieve the list of posts categories
    const responseCategorys = await fetch(this.$urlRoot+"/categorys",{
      headers: {
        'Authorization': 'Bearer ' + this.$cookies.get('token')
      }
    })
    .then(
      responseCategorys => responseCategorys.json() 
    );
    this.categorys = responseCategorys;
  }

};
</script>