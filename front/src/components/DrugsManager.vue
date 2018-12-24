<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Drugs Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Medicine ID</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="drug in drugs" :key="drug.id">
              <td>{{ drug.id }}</td>
              <td>{{ drug.drugname }}</td>
              <td>{{ drug.medicineId }}</td>
              <td>{{ drug.updatedAt }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateDrugToEdit(drug)">Edit</a> -
                <a href="#" @click.prevent="deleteDrug(drug.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Drug ID#' + model.id : 'New Drug')">
          <form @submit.prevent="saveDrug">
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.drugname"></b-form-input>
            </b-form-group>
            <b-form-group label="Medicine">
              <b-form-select v-model="model.idMedicine" :options="optionsMed" class="mb-3" />
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Drug</b-btn>
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
      drugs: [],
      model: {},
      optionsMed: [],
      medicines: [],
    };
  },
  async created() {
    this.refreshDrugs();
  },
  methods: {
    async refreshDrugs() {
      this.loading = true;
      this.drugs = await api.getDrugs();
      this.medicines = await api.getMedicines();
      this.optionsMed = [];
      this.medicines.map((med) => {
        const obj = {};
        obj.value = med.id;
        obj.text = med.medname;
        this.optionsMed.push(obj);
        return true;
      });
      this.loading = false;
    },
    async populateDrugToEdit(drug) {
      this.model = Object.assign({}, drug);
    },
    async saveDrug() {
      if (this.model.id) {
        await api.updateDrug(this.model.id, this.model);
      } else {
        await api.createDrug(this.model);
      }
      this.model = {}; // reset form
      await this.refreshDrugs();
    },
    async deleteDrug(id) {
      if (confirm('Are you sure you want to delete this drug?')) { // eslint-disable-line no-alert
        // if we are editing a drug we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {};
        }
        await api.deleteDrug(id);
        await this.refreshDrugs();
      }
    },
  },
};
</script>