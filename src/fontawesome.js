import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee, faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false; // Prevent automatic CSS injection
library.add(faCoffee, faUser, faHome); // Add icons you need
