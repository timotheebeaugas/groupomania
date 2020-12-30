<!-- Textarea for edit one post -->

<template>
 <section class="textarea">  
    <form @submit.prevent="editPost">
      <div class="listCategory">
        <h2>Categorys:</h2>
        <ul>      
          <li :category="category" v-for="category in categorys" :key="category.id">
            <input type="radio" v-model="pickedCategory" :id="category.id" name="category" :value="category.id" checked="checked" required>
            <label :for="category.id">{{category.category}}</label>
          </li>
        </ul>
      </div>
      <p>{{ message }}</p>
      <br>
      <textarea style="width: 100%;" v-model="message" placeholder="Add text"></textarea>
      <br>
      <button type="submit">Send</button> 
    </form> 
  </section>
</template>
 
<script>

export default {

  props: ["textarea"],

  data () {
    return {
      message : '',
      categorys: [],
      pickedCategory : '',
    }
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

    // Retrieve the message to edit 
    const postresponse = await fetch(this.$urlRoot+"/posts/" + this.$route.params.id,{
      headers: {
        'Authorization': 'Bearer ' + this.$cookies.get('token')
      }
    })
    .then(
      postresponse => postresponse.json()
    );
    this.message = postresponse[0].text; 
    
  },

  methods:{

    // Update the post and receive the response from the server
    async editPost(){
      if(this.message != ''){
        const editPost = await fetch(this.$urlRoot+"/posts/edit/"+ this.$route.params.id,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$cookies.get('token')
          },
          body: JSON.stringify({
            message: this.message,
            category: this.pickedCategory,
          })
        })
        const res = await editPost.json();
        this.$emit('custom-event-name',res);
      }
    },

  },
  
};
</script>