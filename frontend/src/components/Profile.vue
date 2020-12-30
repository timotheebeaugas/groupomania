<!-- Profile page allowing to change your avatar and delete your own account. -->

<template>
  <main class="container">
    <section class="container control-panel"> 
      <h1>Change avatar :</h1>
      <br>
      <span class="message">{{ validationMessage }}</span>
      <br>
      <input aria-label="Add image in this input" type="file" @change="onFileSelected" accept="image/png, image/jpeg">
      <br>
      <button @click="onUpload">Upload</button>
    </section>
    <section v-if="80!=this.$cookies.get('user')" class="container control-panel">
        <h1>Delete my account :</h1>
        <p>Be careful this action is irreversible and will delete all your posts :</p>
        <button @click="deleteAccount" type="submit">Delete</button> 
    </section>
  </main>
</template>

<script>
import axios from 'axios'

export default {

  data (){
    return {
      selectedFile : null,
      validationMessage: '',
      profiles: [], 
    }
  },

methods:{
  // Listen if a file has been selected
  onFileSelected(event){
    this.selectedFile = event.target.files[0]
  },
  // Sending the image and receiving the server response
  onUpload(){
    const fd = new FormData();
    fd.append('user', this.$cookies.get('user'));
    fd.append('image', this.selectedFile, this.selectedFile.name);
    axios.post(this.$urlRoot+"/medias", fd,{
      headers: {
        'Authorization': 'Bearer ' + this.$cookies.get('token')
      }
    })
    .then(res => {
      this.profiles = res.data; 
      this.$root.$emit('avatarChange', res.data);      
    })
  },
    // Deletion of user account
    deleteAccount(){
      fetch(this.$urlRoot+"/users", { 
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$cookies.get('token')
        },
        body: JSON.stringify({
          userId: JSON.parse(this.$cookies.get('user')),
        })
      })
      .then(function(response) {
        response.json();
        document.location.href='/login'
      });
      this.$cookies.remove('user');
      this.$cookies.remove('token');
    },      
  },

};
</script>