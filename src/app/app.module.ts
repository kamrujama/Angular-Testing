import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RFormsComponent } from './r-forms/r-forms.component';
import { PipeComponent } from './pipe-component/pipe.component';
import { CustomePipe } from './Pipes/custome.pipe';
import { FilterPipe } from './Pipes/Filter/filter.pipe';
import { StrengthPipe } from './Pipes/strength/strength.pipe';
import { PostsComponent } from './Post/posts/posts.component';
import { PostDetailsComponent } from './Post/post-details/post-details.component'
import { RouterModule } from '@angular/router';
import { PostHomeComponent } from './Post/post-home/post-home.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    RFormsComponent,
    PipeComponent,
    CustomePipe,
    FilterPipe,
    StrengthPipe,
    PostsComponent,
    PostDetailsComponent,
    PostHomeComponent,
    HomeComponent,
    UsersComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
