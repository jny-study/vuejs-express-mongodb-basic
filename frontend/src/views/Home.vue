<template>
  <div class="home">
    <div v-if="users">
      <ul v-for="(user, index) in users" :key="index">
        <li>{{user.id}}</li>
        <li>{{user.name}}</li>
        <li>{{user.age}}</li>
      </ul>
    </div>
    <form @submit.prevent="checkForm">
      <input type="text" v-model="id">
      <input type="text" v-model="name">
      <input type="text" v-model="age">
      <button type="submit">좆출</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      id: '',
      name: '',
      age: 0,
      users: null
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.$http.get('http://127.0.0.1:3000/')
      .then(res => this.users = res.data)
      .catch(err => console.log(err))
    },
    checkForm() {
      this.$http.post('http://127.0.0.1:3000/', 
      {
        id: this.id,
        name: this.name,
        age: this.age
      })
      .then(data => this.getUsers())
    },
  }
}
</script>
