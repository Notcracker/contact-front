<template>
  <div v-if="forms.length" class="container">
    <a href="#" class="affix" >&#8592; back</a>
    <form class="col-sm-6 offset-sm-3">
      <div class="form-group">
        <label for="exampleSelect1">Select filter:</label>
        <select v-model="filter.field" class="form-control" id="exampleSelect1">
          <option>Name</option>
          <option>Email</option>
          <option>Phone</option>
          <option>Birthday</option>
          <option>Gender</option>
        </select>
      </div>
      <div class="form-group">
        <input v-model="filter.value" v-on:keyup="toFilter" type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter the search string...">
      </div>
    </form>
    <br>
    <div class="col-sm-6 offset-sm-3">
      <ul class="list-group" v-for="form in filtered">
        <li class="list-group-item list-group-item-info">{{form.Name}}</li>
        <li class="list-group-item">Email: {{form.Email}}</li>
        <li class="list-group-item">Phone: {{form.Phone}}</li>
        <li class="list-group-item">Birthday: {{form.Birthday}}</li>
        <li class="list-group-item">Gender: {{form.Gender}}</li>
      </ul>
    </div>
  </div>
  <div v-else-if="!forms.length" class="container">
    <a href="#" class="affix" >&#8592; back</a>
    <h3>No form has been submitted yet.</h3>
  </div>
</template>

<script>
export default {
  name: 'results',
  data() {
    return {
      forms: [ ],
      filtered: [ ],
      filter: {
        field: 'Name',
        value: ''
      }
    }
  },
  beforeCreate() {
    this.$http.get('http://localhost:63913/api/contact')
    .then(data => {

      for (let form in data.body) {
        let parsedForm = JSON.parse(data.body[form].jsonString)

        data.body[form] = parsedForm;
      }
      this.$data.forms = data.body;
      this.$data.filtered = data.body;
    }, err => {
      console.log(err);
    })
  },
  methods: {
    toFilter() {

      if (this.$data.filter.value !== "") {

        this.$data.filtered = this.$data.forms.filter( (form) => {
          return form[this.$data.filter.field].match(this.$data.filter.value);
        })
      }
      else {
        this.$data.filtered = this.$data.forms;
      }
    },
  },
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.affix {
    top:30px;
    left: 30px;
    position:fixed;
}
.list-group {
  margin-bottom: 20px;
}
</style>
