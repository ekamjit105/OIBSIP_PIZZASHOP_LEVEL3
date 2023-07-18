import "./App.css";
import TopBar from "./components/TopBar"
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import About from "./components/About"
import Contact from "./components/Contact";
import Policy from "./components/Policy";
import NavBar  from "./components/NavBar";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import OrdersScreen from "./screens/OrdersScreen";
import AdminScreen from "./screens/AdminScreen";

function App() {
  return (
    <BrowserRouter>
      <TopBar/>
      <NavBar/>
      <Switch>
        
       
        <Route path="/admin" component={AdminScreen} />
        <Route path="/about" component={About} exact/>
        <Route path="/contact" component={Contact} exact/>
        <Route path="/policy" component={Policy} exact/>
        <Route path="/cart"  component={CartScreen} exact/>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/register" component={RegisterScreen} exact/>
        <Route path="/login" component={LoginScreen} exact/>
        <Route path="/myorders" component={OrdersScreen} exact/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
