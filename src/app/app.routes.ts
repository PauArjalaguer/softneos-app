import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { RestartComponent } from './components/restart/restart.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    // { path: '', redirectTo: 'inici', pathMatch: 'full' },   
    { path: '', component: EventListComponent },
    { path: 'resum/:id', component: OrderSummaryComponent },
    { path: 'restart', component: RestartComponent },
    { path: 'login', component: LoginComponent }

];
