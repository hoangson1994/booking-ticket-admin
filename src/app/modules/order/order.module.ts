import {NgModule} from '@angular/core';
import {OrderListComponent} from './order-list/order-list.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ROUTER_GROUPS} from '../../app-routing.module';
import { OrderCreateComponent } from './order-create/order-create.component';

@NgModule({
  declarations: [OrderListComponent, OrderCreateComponent],
  imports: [
    SharedModule,
    RouterModule.forRoot([ROUTER_GROUPS.ORDER_GROUP])
  ]
})
export class OrderModule {
}
