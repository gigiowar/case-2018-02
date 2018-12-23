import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/',
  json: true,
});

export default {
  async execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data,
    }).then(req => req.data);
  },
  getUsers() {
    return this.execute('get', '/api/users');
  },
  getUser(id) {
    return this.execute('get', `/api/users/${id}`);
  },
  createUser(data) {
    return this.execute('post', '/api/users', data);
  },
  updateUser(id, data) {
    return this.execute('put', `/api/users/${id}`, data);
  },
  deleteUser(id) {
    return this.execute('delete', `/api/users/${id}`);
  },
  getMedicines() {
    return this.execute('get', '/api/medicines');
  },
  getMedicine(id) {
    return this.execute('get', `/api/medicines/${id}`);
  },
  createMedicine(data) {
    return this.execute('post', '/api/medicines', data);
  },
  updateMedicine(id, data) {
    return this.execute('put', `/api/medicines/${id}`, data);
  },
  deleteMedicine(id) {
    return this.execute('delete', `/api/medicines/${id}`);
  },
  getDrugs() {
    return this.execute('get', '/api/drugs');
  },
  getDrug(id) {
    return this.execute('get', `/api/drugs/${id}`);
  },
  createDrug(data) {
    return this.execute('post', '/api/drugs', data);
  },
  updateDrug(id, data) {
    return this.execute('put', `/api/drugs/${id}`, data);
  },
  deleteDrug(id) {
    return this.execute('delete', `/api/drugs/${id}`);
  },
  getUserMedicines() {
    return this.execute('get', '/api/userMedicines');
  },
  getUserMedicine(id) {
    return this.execute('get', `/api/userMedicines/${id}`);
  },
  createUserMedicine(data) {
    return this.execute('post', '/api/userMedicines', data);
  },
  updateUserMedicine(id, data) {
    return this.execute('put', `/api/userMedicines/${id}`, data);
  },
  deleteUserMedicine(id) {
    return this.execute('delete', `/api/userMedicines/${id}`);
  },
};
