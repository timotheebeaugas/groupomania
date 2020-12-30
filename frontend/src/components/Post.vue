<!-- See one post with its comments and a textarea to add a new comment. -->

<template> 
  <main>
    <post :post="post" v-for="post in posts" :key="post.id"></post>
    <comments :comment="comment" v-for="comment in comments" :key="comment.id"></comments>
    <h1>Post a new comment :</h1>
    <textarea @custom-event-name="setMessage" is="TextArea"></textarea>
  </main>
</template>

<script>

import TextArea from './childrens/TextAreaComment'
import Post from './childrens/OnePost'
import Comments from './childrens/AllComments'

export default {

  components: { TextArea,Post,Comments }, 

  data () {
    return {
     posts: [],
     comments: [],
    } 
  },

  methods:{
    // Retrieving new comments
    setMessage(res) {
      this.comments = res; 
    },
  }, 
  
  // Retrieving the selected post
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

    // Retrieving comments
    const response = await fetch(this.$urlRoot+"/comments/post/" + this.$route.params.id,{
      headers: {
        'Authorization': 'Bearer ' + this.$cookies.get('token')
      }
    })
    .then(
      response => response.json()
    );
    this.comments = response;
  }

}
</script>