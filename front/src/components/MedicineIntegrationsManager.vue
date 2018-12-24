<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Medical Integrations Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Drug1 ID</th>
              <th>Drug2 ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="medicineIntegration in medicineIntegrations" :key="medicineIntegration.id">
              <td>{{ medicineIntegration.id }}</td>
              <td>{{ medicineIntegration.idDrug1 }}</td>
              <td>{{ medicineIntegration.idDrug2 }}</td>
              <td>{{ medicineIntegration.name }}</td>
              <td>{{ medicineIntegration.description }}</td>
              <td>{{ medicineIntegration.updatedAt }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateMedicineIntegrationToEdit(medicineIntegration)">Edit</a> -
                <a href="#" @click.prevent="deleteMedicineIntegration(medicineIntegration.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit MedicineIntegration ID#' + model.id : 'New Medical Integration')">
          <form @submit.prevent="saveMedicineIntegration">
            <b-form-group label="Drug1">
              <b-form-select v-model="model.idDrug1" :options="optionsDrg" class="mb-3" />
            </b-form-group>
            <b-form-group label="Drug2">
              <b-form-select v-model="model.idDrug2" :options="optionsDrg" class="mb-3" />
            </b-form-group>                           
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.name"></b-form-input>
            </b-form-group>  
            <b-form-group label="Description">
              <b-form-textarea type="text" v-model="model.description"></b-form-textarea>
            </b-form-group> 
            <div>
              <b-btn type="submit" variant="success">Save Medical Integration</b-btn>
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
      medicineIntegrations: [],
      model: {},
      optionsDrg: [],
      drug: [],
    };
  },
  async created() {
    this.refreshMedicineIntegrations();
  },
  methods: {
    async refreshMedicineIntegrations() {
      this.loading = true;
      this.medicineIntegrations = await api.getMedicineIntegrations();
      this.drugs = await api.getDrugs();
      this.optionsDrg = [];
      this.drugs.map((drug) => {
        const obj = {};
        obj.value = drug.id;
        obj.text = drug.drugname;
        this.optionsDrg.push(obj);
        return true;
      });
      this.loading = false;
    },
    async populateMedicineIntegrationToEdit(medicineIntegration) {
      this.model = Object.assign({}, medicineIntegration);
    },
    async saveMedicineIntegration() {
      if (this.model.id) {
        await api.updateMedicineIntegration(this.model.id, this.model);
      } else {
        await api.createMedicineIntegration(this.model);
      }
      this.model = {}; // reset form
      await this.refreshMedicineIntegrations();
    },
    async deleteMedicineIntegration(id) {
      if (confirm('Are you sure you want to delete this medicineIntegration?')) { // eslint-disable-line no-alert
        // if we are editing a medicineIntegration we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {};
        }
        await api.deleteMedicineIntegration(id);
        await this.refreshMedicineIntegrations();
      }
    },
  },
};
</script>