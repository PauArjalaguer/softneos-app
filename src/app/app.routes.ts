import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { RestartComponent } from './components/restart/restart.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardEventEditComponent } from './components/dashboard-event-edit/dashboard-event-edit.component';

export const routes: Routes = [   
    { path: '', component: EventListComponent },
    { path: 'resum/:id', component: OrderSummaryComponent },    
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard/event/:event_id', component: DashboardEventEditComponent },
    {path: 'restart',component:RestartComponent}

















     // { path: '', redirectTo: 'inici', pathMatch: 'full' },   
    //{ path: 'restart', component: RestartComponent },

];
