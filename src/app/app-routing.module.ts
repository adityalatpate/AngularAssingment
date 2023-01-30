import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UserProfileTemplateComponent } from './user-profile-template/user-profile-template.component';

const routes: Routes = [
  {path:'', component: HomePageComponent},
  {path:'userProfile', component: UserProfileTemplateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
