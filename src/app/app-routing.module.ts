import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VesselCreateComponent } from './vessel-create/vessel-create.component';
import { VesselDetailsComponent } from './vessel-details/vessel-details.component';
import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'create', component: VesselCreateComponent },
    { path: 'vessel/:id', component: VesselDetailsComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }