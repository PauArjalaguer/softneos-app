import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inici', pathMatch: 'full' },
   { path: 'inici', component: EventListComponent },
    /*
        { path: 'pagar/:show_id/:event_id/:showName', component: PaymentComponent },
        { path: 'resum/:show_id/:event_id/:showName', component: OrderSummaryComponent },
        { path: 'comprar/:show_id/:event_id/:showName', component: SeatsListComponent },
        { path: 'espectacle/:id/:showName', component: EventsListComponent },
        { path: 'inici', component: ShowsListComponent },
        { path: 'login', component: LoginComponent },
    
        { path: 'dashboard/event/:event_id', component: DashboardEventEditComponent },
        { path: 'dashboard', component: DashboardComponent }, */



];
