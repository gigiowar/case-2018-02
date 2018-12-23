import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import UsersManager from '@/components/UsersManager';
import MedicinesManager from '@/components/MedicinesManager';
import DrugsManager from '@/components/DrugsManager';
import UserMedicinesManager from '@/components/UserMedicinesManager';
import MedicineIntegrationsManager from '@/components/MedicineIntegrationsManager';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/users',
      name: 'Users',
      component: UsersManager,
    },
    {
      path: '/medicines',
      name: 'Medicines',
      component: MedicinesManager,
    },
    {
      path: '/drugs',
      name: 'Drugs',
      component: DrugsManager,
    },
    {
      path: '/userMedicines',
      name: 'Users Medicines',
      component: UserMedicinesManager,
    },
    {
      path: '/medicineIntegrations',
      name: 'Medicine Integrations',
      component: MedicineIntegrationsManager,
    },
  ],
});
