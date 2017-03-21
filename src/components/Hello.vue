<template>
  <div class="container">
    <a href="#/results" class="affix">To submitted forms &#8594;</a>
    <form class="col-sm-6 offset-sm-3" @submit.prevent="validateForm">
      <div class="form-group" v-bind:class="{ 'has-danger': errors.has('name') }">
        <label for="test" >Name</label>
        <input v-model="form.Name" type="text" v-validate data-vv-rules="required|min:6" name="name" class="form-control" id="test" aria-describedby="nameHelp" placeholder="Enter name">
        <span v-show="errors.has('name')"  v-bind:class="{ 'text-danger': errors.has('name') }" >{{ errors.first('name') }}</span>
      </div>
      <div class="form-group" v-bind:class="{ 'has-danger': errors.has('email') }">
        <label for="test" >Email address</label>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        <input v-model="form.Email" type="text" v-validate data-vv-rules="required|email" name="email" class="form-control" id="test" aria-describedby="emailHelp" placeholder="Enter email">
        <span v-show="errors.has('email')"  v-bind:class="{ 'text-danger': errors.has('email') }" >{{ errors.first('email') }}</span>
      </div>
      <div class="form-group" v-bind:class="{ 'has-danger': errors.has('birth') }">
        <label for="exampleInputEmail1">Date of birth</label>
        <input v-model="form.Birthday" type="date" v-validate data-vv-rules="required|date_format:YYYY-MM-DD" name="birth" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        <span v-show="errors.has('birth')" v-bind:class="{ 'text-danger': errors.has('birth') }">{{ errors.first('birth') }}</span>
      </div>
      <div class="form-group" v-bind:class="{ 'has-danger': errors.has('gender') }">
        <label for="exampleSelect1">Gender</label>
        <select v-model="form.Gender" v-validate data-vv-rules="required|in:Male,Female" name="gender" class="form-control" id="exampleSelect1">
          <option disabled selected value> -- select an option -- </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <span v-show="errors.has('gender')" v-bind:class="{ 'text-danger': errors.has('gender') }">{{ errors.first('gender') }}</span>
      </div>
      <div class="form-group" v-bind:class="{ 'has-danger': errors.has('phone') }">
        <label for="test">Phone number</label>
        <input v-model="form.Phone" type="text" v-validate data-vv-rules="required|numeric|min:6" name="phone" class="form-control" id="test" aria-describedby="phoneHelp" placeholder="Enter phone">
        <span v-show="errors.has('phone')"  v-bind:class="{ 'text-danger': errors.has('phone') }" >{{ errors.first('phone') }}</span>
      </div>
      <fieldset class="form-group"  v-bind:class="{ 'has-danger': errors.has('contact_method') }">
        <label>Contact me via:</label>
        <div class="form-check">
          <label class="form-check-label">
            <input type="radio" v-model="form.ContactMethod" class="form-check-input" name="contact_method" id="optionsRadios1" v-validate  data-vv-rules="required|in:1,2" value="1">
            Phone
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input type="radio" v-model="form.ContactMethod" class="form-check-input" name="contact_method" id="optionsRadios2" value="2">
            Email
          </label>
        </div>
        <span class="help is-danger" v-show="errors.has('contact_method')" v-bind:class="{ 'text-danger': errors.has('contact_method') }">{{ errors.first('contact_method') }}</span>
      </fieldset>
      <div class="form-check" v-bind:class="{ 'has-danger': errors.has('terms') }">
        <label class="form-check-label">
          <input v-model="form.Terms" name="terms" v-validate  data-vv-rules="required" type="checkbox" class="form-check-input">
          I agree on handling my personal data.
        </label>
        <div>
          <span class="help is-danger" v-show="errors.has('terms')" v-bind:class="{ 'text-danger': errors.has('terms') }">{{ errors.first('terms') }}</span>
        </div>
      </div>
      <p class="control">
        <button type="submit" class="btn btn-info" name="button">Apply</button>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      form: {
        Name: '',
        Email: '',
        Birthday: '',
        Gender: '',
        ContactMethod: '',
        Terms: '',
        Phone: '',
      }
    }
  },
  methods: {
    validateForm() {
      this.$validator.validateAll();
      if (!this.errors.any()) {
            this.$http.post('http://localhost:63913/api/contact', this.$data.form, {
              headers: {
                'content-type': 'application/json'
              }
            }).then(data => {
              this.$data.form = {
                Name: '',
                Email: '',
                Birthday: '',
                Gender: '',
                ContactMethod: '',
                Terms: '',
                Phone: '',
              };
            }, err => {
              console.log(err)
            })
            .then(() => {
              this.errors.clear();
            });
        }
        else {
          console.log(this.errors.any())
        }
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
.affix {
    top:30px;
    right: 30px;
    position:fixed;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

label {
  color: #60C0E0;
}

a {
  color: #42b983;
}

form {
  padding: 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}
</style>
