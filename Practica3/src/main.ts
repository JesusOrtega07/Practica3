import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import Aura from '@primevue/themes/aura';
import App from './App.vue'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';        
import Lara from '@primevue/themes/lara';  

import InputNumber from 'primevue/inputnumber';


// PrimeIcons
import 'primeicons/primeicons.css';


const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Lara,
        options:{
            darkModeSelector: 'system'
        }
    }
});

app.component('InputText', InputText);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('InputNumber', InputNumber);

app.mount('#app'); 

