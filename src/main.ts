import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VuesticPlugin } from "vuestic-ui";
import "vuestic-ui/dist/vuestic-ui.css";

createApp(App)
  .use(router)
  .use(VuesticPlugin, {
    colors: {
      primary: "#644ded",
    },
  })
  .mount("#app");

//color
// --gray-tone-100: #242533;
// --gray-tone-80: #484964;
// --gray-tone-60: #808192;
// --gray-tone-40: #abacbe;
// --gray-tone-20: #bcbcc6;
// --gray-tone-8: #eeeef2;
// --gray-tone-4: #f3f3f8;
// --light-tone: #f9f9fc;
// --white-full: #ffffff;
// --accent-tone-100: #644ded;
// --accent-tone-50: #ad9fff;
// --accent-opac-8: #dbd9e6;
// --secondary-blue-100: #e9e8fc;
// --secondary-yellow-100: #faf3e1;
