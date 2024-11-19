import {Routes} from '@angular/router';
import {ListComponent} from '../../components/list/list.component';
import {HomeComponent} from '../../components/home/home.component';
import {MoralPetSittingComponent} from '../../components/moral-pet-sitting/moral-pet-sitting.component';
import {SitterRequestComponent} from '../../components/sitter-request/sitter-request.component';
import {ThanksComponent} from '../../components/thanks/thanks.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'list', component: ListComponent},
  {path: 'moral-pet-sitting', component: MoralPetSittingComponent},
  {path: 'sitter-request', component: SitterRequestComponent},
  {path: 'thanks', component: ThanksComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];
