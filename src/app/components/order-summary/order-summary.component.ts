import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { EventService } from '../../services/event.service';
import Swal from 'sweetalert2';
import { GlobalFunctionsService } from '../../services/global-functions.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
  @ViewChild('seatPickerContainer', { read: ViewContainerRef, static: true }) seatPickerContainer!: ViewContainerRef;
  UUID: any = sessionStorage.getItem('uuid');
  order: Order[] = [];
  event: any;
  total: number = 0;
  isLoading: number = 1;
  usermail: any;
  username:any;
  event_id: number;
  isButtonDisabled: boolean = false;

  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute, private eventService: EventService, public funcs: GlobalFunctionsService) {
    this.event_id = Number(this.route.snapshot.paramMap.get('id'));
    this.usermail = sessionStorage.getItem('usermail');
    this.username = sessionStorage.getItem('username');
  }
  orderForm: FormGroup = new FormGroup({
    usermail: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    session_id: new FormControl(this.UUID, Validators.required),
  })
  

  ngOnInit(): void {
    Swal.close();
    this.getEventSeatSummaryBySession_id();
  }
  private getEventSeatSummaryBySession_id(): void {  
    this.isLoading = 1;
    this.eventService.getEvent(this.event_id).subscribe(event => {
      this.event = event;
    });
    this.eventService.getEventSeatSummaryBySession_id(this.event_id,this.UUID,0).subscribe(order => {
      this.order = order;
      this.isLoading = 0;
      this.isLoading = 0;
      this.calculateTotal();
    })

  }
  private calculateTotal(): void {
    this.total = this.order.reduce((accumulated, currentValue) => {
      return accumulated + Number(currentValue.event_price);
    }, 0);
  }
  seatPicker(event_id: any, seatPickerContainer: any) {
    this.funcs.seatPicker(this.event_id, this.seatPickerContainer);
  }
  hasError(field: string): boolean {
    const errorsObject = this.orderForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);
    if (errors.length && (this.orderForm.get(field)?.touched || this.orderForm.get(field)?.dirty)) {
      return true
    }
    return false;
  }
  getCurrentError(field: string): string {
    const errorsObject = this.orderForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);
    if (!errors) {
      return ''
    }
    return errors[0];
  }
  saveOrder() {
    Swal.fire({
      title: "Processant la comanda",
      html: "Espera uns segons",
    });
    this.orderService.createOrder(this.orderForm.value).subscribe(
      order => {
        Swal.fire({
          title: "Entrades enviades",
          html: "Revisa la teva bústia de correu",

          willClose: () => {
            sessionStorage.setItem('uuid','');
            this.router.navigate(['restart']);
          }
        })
      }, error => { alert(error); }
    );

  }
}