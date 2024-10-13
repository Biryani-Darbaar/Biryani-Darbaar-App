import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  bookOutline,
  ellipse,
  homeOutline,
  square,
  triangle,
} from "ionicons/icons";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";
import { BookOpenText, House, NotebookText, User } from "lucide-react";

/* Theme variables */

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/Menu">
            <Menu />
          </Route>
          <Route path="/Order">
            <Order />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Home" href="/Home">
            {/* <IonIcon aria-hidden="true" icon={homeOutline} /> */}
            <House />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Menu" href="/Menu">
            {/* <IonIcon aria-hidden="true" icon={bookOutline} /> */}
            <BookOpenText />
            <IonLabel>Menu</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Order" href="/Order">
            {/* <IonIcon aria-hidden="true" icon={square} /> */}
            <NotebookText />
            <IonLabel>Order</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Profile" href="/Profile">
            {/* <IonIcon aria-hidden="true" icon={square} /> */}
            <User/>
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
