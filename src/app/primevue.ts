import { App } from 'vue'

/** Import Css Styles */
import 'primevue/resources/themes/saga-blue/theme.css' //theme
import 'primevue/resources/primevue.min.css' //base css
import 'primeicons/primeicons.css' //icons

/** Register Components */
import Button from 'primevue/button'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const primeVueTheme = (app: App) => {
  app.component('Button', Button)

  app.component('DataTable', DataTable)
  app.component('Column', Column)
}

export default primeVueTheme
