<!-- Comments display component -->

<template>
  <article class="comment grid">
    <section class="profile">
      <h3>{{comment.user.username}}</h3>
      <p>{{comment.user.userRole.role}}</p>
      <img class="avatars" :src="comment.user.media.name" alt="User avatar">
    </section>
    <section> 
      <header class="post-meta">
        <p>Date : {{new Date(comment.date).toLocaleString('fr-FR')}}</p>
        <p>Id : {{comment.id}}</p>
      </header>
      <p>{{comment.text}}</p>
    </section>
  </article> 
</template>

<script>
export default {
  props: ["comment"]
};
</script>
