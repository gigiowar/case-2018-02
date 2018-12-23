<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Users Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Age</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.firstname }}</td>
              <td>{{ user.lastname }}</td>
              <td>{{ user.age }}</td>
              <td>{{ user.updatedAt }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateUserToEdit(user)">Edit</a> -
                <a href="#" @click.prevent="deleteUser(user.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit User ID#' + model.id : 'New User')">
          <form @submit.prevent="saveUser">
            <b-form-group label="First Name">
              <b-form-input type="text" v-model="model.firstname"></b-form-input>
            </b-form-group>
            <b-form-group label="Last Name">
              <b-form-input type="text" v-model="model.lastname"></b-form-input>
            </b-form-group>
            <b-form-group label="Age">
              <b-form-input type="number" v-model="model.age"></b-form-input>
            </b-form-group>                        
            <div>
              <b-btn type="submit" variant="success">Save User</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>    
  </div>
</template>    

<script>
import api from '@/api';

export default {
  data() {
    return {
      loading: false,
      users: [],
      model: {},
    };
  },
  async created() {
    this.refreshUsers();
  },
  methods: {
    async refreshUsers() {
      this.loading = true;
      this.users = await api.getUsers();
      this.loading = false;
    },
    async populateUserToEdit(user) {
      this.model = Object.assign({}, user);
    },
    async saveUser() {
      if (this.model.id) {
        await api.updateUser(this.model.id, this.model);
      } else {
        await api.createUser(this.model);
      }
      this.model = {}; // reset form
      await this.refreshUsers();
    },
    async deleteUser(id) {
      if (confirm('Are you sure you want to delete this user?')) {
        // if we are editing a user we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {};
        }
        await api.deleteUser(id);
        await this.refreshUsers();
      }
    },
  },
};
</script>