import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PostDetailsComponent } from './Post/post-details/post-details.component';
// import { PostHomeComponent } from './Post/post-home/post-home.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';

export const routes: Routes = [

  {
    path:'',
    component: HomeComponent
  },
  {
    path:'users',
    component: UsersComponent
  },
  {
    path:'categories',
    component: CategoriesComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
