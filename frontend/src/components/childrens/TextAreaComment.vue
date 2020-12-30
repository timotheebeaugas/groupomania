<!-- Textarea for send comments -->

<template>
 <section class="textarea">  
    <form @submit.prevent="sendNewPost">
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
    }
  },

  methods:{

    // Send a new comment
    async sendNewPost(){
      if(this.message != ''){
        const sendComment = await fetch(this.$urlRoot+"/comments/"+ this.$route.params.id, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$cookies.get('token')
          },
          body: JSON.stringify({
            message: this.message,
            user: this.$cookies.get('user')
          })
        })
        const res = await sendComment.json();
        this.$emit('custom-event-name',res);
        this.message = '';
      }
    },
    
  },

};
</script>