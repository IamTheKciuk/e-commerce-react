import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
    Home,
    SingleProduct,
    Cart,
    Checkout,
    Error,
    About,
    Products,
    Private,
} from "./pages";

function App() {
    return (
        <Router>
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <Switch>
                <Route exact path="/">
                    <Home></Home>
                </Route>
                <Route exact path="/about">
                    <About></About>
                </Route>
                <Route exact path="/cart">
                    <Cart></Cart>
                </Route>
                <Route exact path="/products">
                    <Products></Products>
                </Route>
                <Route
                    exact
                    path="/products/:id"
                    children={<SingleProduct />}
                ></Route>
                <Route exact path="/checkout">
                    <Checkout></Checkout>
                </Route>
                <Route to="*">
                    <Error></Error>
                </Route>
            </Switch>
            <Footer></Footer>
        </Router>
    );
}

export default App;
