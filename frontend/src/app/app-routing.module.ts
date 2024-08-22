import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontLayoutComponent } from './layout/front-layout/front-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {path:'',component:FrontLayoutComponent,children:[
    {path:'',loadChildren:()=>import('./views/front/home/home.module').then(m=>m.HomeModule)},
    {path:'commandes',loadChildren:()=>import('./views/front/commandes/commandes.module').then(m=>m.CommandesModule)},
    {path:'cart',loadChildren:()=>import('./views/front/cart/cart.module').then(m=>m.CartModule)},
    { path:'details/:id/:articleIndex/:client_id', loadChildren:()=>import('./views/front/details/details.module').then(m=>m.DetailsModule) },
    {path:'login',loadChildren:()=>import('./views/front/loginuser/loginuser.module').then(m=>m.LoginuserModule)},
    {path:'register',loadChildren:()=>import('./views/front/register/register.module').then(m=>m.RegisterModule)},
  ]},


  {path:'admin',component:AdminLayoutComponent,children:[
    {path:'',loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    {path:'login',loadChildren:()=>import('./views/admin/loginadmin/loginadmin.module').then(m=>m.LoginadminModule)},
    {path:'commandes',loadChildren:()=>import('./views/admin/commandes/commandes.module').then(m=>m.CommandesModule)},
    {path:'categories',loadChildren:()=>import('./views/admin/categories/categories.module').then(m=>m.CategoriesModule)},
    {path:'dashboard',loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    {path:'loginadmin',loadChildren:()=>import('./views/admin/loginadmin/loginadmin.module').then(m=>m.LoginadminModule)},
    {path:'allproducts',loadChildren:()=>import('./views/admin/allproducts/allproducts.module').then(m=>m.AllproductsModule)},
    {path:'addproduct',loadChildren:()=>import('./views/admin/addproduct/addproduct.module').then(m=>m.AddproductModule)},

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
