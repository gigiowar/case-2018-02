<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Medicines Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="medicine in medicines" :key="medicine.id">
              <td>{{ medicine.id }}</td>
              <td>{{ medicine.medname }}</td>
              <td>{{ medicine.updatedAt }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateMedicineToEdit(medicine)">Edit</a> -
                <a href="#" @click.prevent="deleteMedicine(medicine.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Medicine ID#' + model.id : 'New Medicine')">
          <form @submit.prevent="saveMedicine">
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.medname"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Medicine</b-btn>
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
      medicines: [],
      model: {},
    };
  },
  async created() {
    this.refreshMedicines();
  },
  methods: {
    async refreshMedicines() {
      this.loading = true;
      this.medicines = await api.getMedicines();
      this.loading = false;
    },
    async populateMedicineToEdit(medicine) {
      this.model = Object.assign({}, medicine);
    },
    async saveMedicine() {
      if (this.model.id) {
        await api.updateMedicine(this.model.id, this.model);
      } else {
        await api.createMedicine(this.model);
      }
      this.model = {}; // reset form
      await this.refreshMedicines();
    },
    async deleteMedicine(id) {
      if (confirm('Are you sure you want to delete this medicine?')) { // eslint-disable-line no-alert
        // if we are editing a medicine we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {};
        }
        await api.deleteMedicine(id);
        await this.refreshMedicines();
      }
    },
  },
};
</script>