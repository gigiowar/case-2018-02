<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">User Medicines Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Medicine ID</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="userMedicine in userMedicines" :key="userMedicine.id">
              <td>{{ userMedicine.id }}</td>
              <td>{{ userMedicine.idUser }}</td>
              <td>{{ userMedicine.idMedicine }}</td>
              <td>{{ userMedicine.updatedAt }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateUserMedicineToEdit(userMedicine)">Edit</a> -
                <a href="#" @click.prevent="deleteUserMedicine(userMedicine.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit UserMedicine ID#' + model.id : 'New User Medicine')">
          <form @submit.prevent="saveUserMedicine">
            <b-form-group label="User ID">
              <b-form-input type="text" v-model="model.idUser"></b-form-input>
            </b-form-group>
            <b-form-group label="Medicine ID">
              <b-form-input type="text" v-model="model.idMedicine"></b-form-input>
            </b-form-group>  
            <div>
              <b-btn type="submit" variant="success">Save User Medicine</b-btn>
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
      userMedicines: [],
      model: {},
    };
  },
  async created() {
    this.refreshUserMedicines();
  },
  methods: {
    async refreshUserMedicines() {
      this.loading = true;
      this.userMedicines = await api.getUserMedicines();
      this.loading = false;
    },
    async populateUserMedicineToEdit(userMedicine) {
      this.model = Object.assign({}, userMedicine);
    },
    async saveUserMedicine() {
      if (this.model.id) {
        await api.updateUserMedicine(this.model.id, this.model);
      } else {
        const warnings = await api.createUserMedicine(this.model);
        if (warnings.length > 0) {
          alert(JSON.stringify(warnings));
        }
        console.log(warnings);
      }
      this.model = {}; // reset form
      await this.refreshUserMedicines();
    },
    async deleteUserMedicine(id) {
      if (confirm('Are you sure you want to delete this userMedicine?')) {
        // if we are editing a userMedicine we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {};
        }
        await api.deleteUserMedicine(id);
        await this.refreshUserMedicines();
      }
    },
  },
};
</script>