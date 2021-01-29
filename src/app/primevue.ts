import { App } from 'vue'

// TODO: is config import needed?
// import PrimeVue from 'primevue/config'

/** Import Css Styles */
import 'primevue/resources/themes/saga-blue/theme.css' //theme
import 'primevue/resources/primevue.min.css' //base css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css' //flex

/** Register Components */
import Button from 'primevue/button'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

type Plugin = Parameters<App['use']>[0]

const primeVueTheme: Plugin = (app) => {
  // app.use(PrimeVue)

  app.component('Button', Button)

  app.component('DataTable', DataTable)
  app.component('Column', Column)
}

export default primeVueTheme
