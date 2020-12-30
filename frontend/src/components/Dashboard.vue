<!-- Forms to delete messages, delete users, add an admin and create a new category -->

<template>
  <main class="container">
  <section class="control-panel">  
    <h1>Dashboard</h1>
      <span class="message">{{ validationMessage }}</span>

        <form @submit.prevent="deletePost">
          <h2>Delete a post :</h2>
          <br>
          <input aria-label="Add a post in this input" type="number" v-model="PostID" placeholder="Add post ID">
          <br>
          <button type="submit">Delete</button> 
        </form>

        <form @submit.prevent="deleteComment">
          <h2>Delete a comment :</h2>
          <br>
          <input aria-label="Add comment in this input" type="number" v-model="CommentID" placeholder="Add comment ID">
          <br>
          <button type="submit">Delete</button> 
        </form>

        <form @submit.prevent="upgradeUser">
          <h2>Add a new moderator :</h2>
          <br>
          <input aria-label="Add username in this input" type="text" v-model="UpgradeByUsername" placeholder="Add username">
          <br>
          <button type="submit">Add</button> 
        </form>

        <form @submit.prevent="creatCategory">
          <h2>Add a new category :</h2>
          <br>
          <input aria-label="Add category in this input" type="text" v-model="categoryName" placeholder="Add a new category" required="required">
          <br>
          <button type="submit">Add</button> 
        </form>

    </section>
  </main>  
</template>

<script>
export default {

data (){
  return {
    validationMessage: '',
    PostID : '',
    CommentID : '',
    UpgradeByUsername : '',
    categoryName : ''

  }
    },

  methods:{
    // Delete one post with its ID
    async deletePost(){
      const response = await fetch(this.$urlRoot+"/posts", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('token')
        }, 
        body: JSON.stringify({
          PostID: this.PostID,
          userId: this.$cookies.get('user')
        })
      })
      .then(function(response) {
        return response.json();
      });
        if(response.error){
          this.validationMessage = response.error;
        }else{
          this.validationMessage = response;
        }
      this.PostID = '';
    },

    // Delete one comment with its ID
    async deleteComment(){
      const response = await fetch(this.$urlRoot+"/comments", {
        method: "DELETE",
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('token')
        },
        body: JSON.stringify({
          CommentID: this.CommentID
        })
      })
      .then(function(response) {
        return response.json();
      });
        if(response.error){
          this.validationMessage = response.error;
        }else{
          this.validationMessage = response;
        }
      this.CommentID = ''; 
    },

    // Add new admin with his username
    async upgradeUser(){
      const response = await fetch (this.$urlRoot+"/users/role", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('token')
        },
        body: JSON.stringify({
          UpgradeByUsername: this.UpgradeByUsername
        })
      })
      .then(function(response) {
        return response.json();
      });
        if(response.error){
          this.validationMessage = response.error;
        }else{
          this.validationMessage = response;
        }
      this.UpgradeByUsername = ''; 
    },

    // Create a new category
    async creatCategory(){
      const response = await fetch (this.$urlRoot+"/categorys", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('token')
        },
        body: JSON.stringify({
          categoryName: this.categoryName,
        })
      })
      .then(function(response) {
        return response.json();
      });
        if(response.error){
          this.validationMessage = response.error;
        }else{
          this.validationMessage = response;
        }
      this.categoryName = ''; 
    }

  },

};
</script>