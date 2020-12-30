<!-- See one message and edit the text and the category -->

<template> 
  <section>
    <post :post="post" v-for="post in posts" :key="post.id"></post>
    <h1>Edit post :</h1>
    <textarea @custom-event-name="setMessage" is="TextArea"></textarea>
  </section>
</template>

<script>

import TextArea from './childrens/TextAreaEditPost'
import Post from './childrens/OnePost'

export default {

  components: { TextArea,Post }, 

  data () {
    return {
     posts: [],
    } 
  },

  methods:{
    // Message update
    setMessage(res) {
      this.posts = res; 
    },
    
  },
  // Retrieving the message to display
  async mounted() {
    const postresponse = await fetch(this.$urlRoot+"/posts/" + this.$route.params.id,{
      headers: {
        'Authorization': 'Bearer ' + this.$cookies.get('token')
      }
    })
    .then(
      postresponse => postresponse.json()
    );
    this.posts = postresponse;
  }

}
</script>