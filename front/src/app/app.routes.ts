import {Routes} from '@angular/router';
import {ListComponent} from '../../components/list/list.component';
import {HomeComponent} from '../../components/home/home.component';
import {MoralPetSittingComponent} from '../../components/moral-pet-sitting/moral-pet-sitting.component';
import {SitterRequestComponent} from '../../components/sitter-request/sitter-request.component';
import {ThanksComponent} from '../../components/thanks/thanks.component';
import {AdminComponent} from '../../components/admin/admin.component';
import {AdminSitterEditComponent} from '../../components/admin-sitter-edit/admin-sitter-edit.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'list', component: ListComponent},
  {path: 'moral-pet-sitting', component: MoralPetSittingComponent},
  {path: 'sitter-request', component: SitterRequestComponent},
  {path: 'thanks', component: ThanksComponent},
  {path: 'admin-sitter', component: AdminSitterEditComponent},
  {path: 'admin', component: AdminComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];
