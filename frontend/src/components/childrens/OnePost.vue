<!-- One post display component -->

<template>
  <article class="post grid">
    <section class="profile">
      <h3>{{post.user.username}}</h3>
      <p>{{post.user.userRole.role}}</p>
      <img class="avatars" :src="post.user.media.name" alt="User avatar">
    </section>
    <section>
      <header class="post-meta">
        <h2>Category : {{post.postCategory.category}}</h2>
        <p>Id : {{post.id}}</p>
        <p>Date : {{new Date(post.date).toLocaleString('fr-FR')}}</p>
      </header>
      <p>{{post.text}}</p>
      <img v-if="post.medias!=null" class="medias" :src="post.medias.name" alt="Pictures">
      <br>
      <footer>
        <router-link class="post-link" v-if="post.user.id==this.$cookies.get('user')" :to="{name: 'edit', params:{id:post.id}}"><i class="fa fa-pencil-square-o post-link"></i>Edit</router-link>
      </footer>
    </section>
  </article> 
</template>

<script>
export default {
  props: ["post"]
};
</script>
 