<!-- Homepage. Textarea to send a new post. See the last ten messages and change the page. -->

<template> 
  <div> 
    <main>
      <textarea @custom-event-name="setMessage" is="TextArea"></textarea>
      <post :post="post" v-for="post in posts" :key="post.id"></post>
    </main>
    <footer>
      <paginate
        :active-class="'paginate-active'"
        :pageCount="totalPageCount"  
        :clickHandler="clickCallback"
        :prevText="'Prev'"
        :nextText="'Next'"
        :containerClass="'className'">
      </paginate>
    </footer>
  </div>

</template>

<script>

import Post from './childrens/AllPosts'
import TextArea from './childrens/TextAreaPost'
import Paginate from 'vuejs-paginate'

export default {

  components: { Post, TextArea, Paginate }, 

  data () {
    return {
    posts: [],
    pageNum: 1,
    totalPageCount : 0,
    }
  },

  methods:{

    // Retrieving new posts
    setMessage(res) {
      this.posts = res.data; 
    },

    // Reload posts if the page number changes
    async clickCallback(pageNum){
      this.pageNum = pageNum;
      const response = await fetch(this.$urlRoot+"/posts/page/"+ this.pageNum,{
        headers: {
          'Authorization': 'Bearer ' + this.$cookies.get('token')
        }
      })
      .then(
        response => response.json()
      );
      this.posts = response; 
    },
  },

  async mounted() {
    // Display of the ten posts of the selected page
    const response = await fetch(this.$urlRoot+"/posts/page/"+ this.pageNum,{
      headers: {
        'Authorization': 'Bearer ' + this.$cookies.get('token')
      }
    })
    .then(
      response => response.json() 
    );
    this.posts = response;

    // Retrieving the total number of pages
    const responsetotalPageCount = await fetch(this.$urlRoot+"/posts/count/",{
      headers: {
        'Authorization': 'Bearer ' + this.$cookies.get('token')
      }      
    })
    .then(
      responsetotalPageCount => responsetotalPageCount.json() 
    );
    this.totalPageCount = Math.ceil(responsetotalPageCount.count/10); 
    
  } 

}
</script>



