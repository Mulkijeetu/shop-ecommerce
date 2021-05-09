import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from './user/Signup.jsx'
import Signin from './user/Signin.jsx'
import Home from './core/Home'
import PrivateRoute from './/auth/PrivateRoute'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashBoard'
import AdminRoute from './/auth/AdminRoute'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile'
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/updateCategory';

export default function Routes() {
    return (
        <BrowserRouter>
        <Switch>
            
            <Route path="/" exact component={Home}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/shop" exact component={Shop}/>
            <Route path="/product/:productId" exact component={Product}/>
            <Route path="/cart" exact component={Cart} />

            <PrivateRoute path='/user/dashboard' exact component={UserDashboard}/>
            <PrivateRoute path="/profile/:userId" exact component={Profile} />
            <PrivateRoute path="/admin/products" exact component={ManageProducts} />
            
            <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}/>
            <AdminRoute path='/create/category' exact component={AddCategory}/>
            <AdminRoute path='/create/product' exact component={AddProduct}/>
            <AdminRoute path="/admin/orders" exact component={Orders} />
            <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
            <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
        
        </Switch>
        </BrowserRouter>
    )
}
