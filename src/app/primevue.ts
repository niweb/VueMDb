import { App } from "vue";

/** Import Css Styles */
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //base css
import "primeicons/primeicons.css"; //icons

/** Register Components */
import Button from "primevue/button";

const primeVueTheme = (app: App) => {
  app.component("Button", Button);
};

export default primeVueTheme;
