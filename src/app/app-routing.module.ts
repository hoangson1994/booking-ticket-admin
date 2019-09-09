import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';

/**
 * - Router group để side bar có thể import và tự động điều chỉnh các phần tử.
 * - Các module con sẽ lấy từng phần tử con của router groups để routing riêng
 */
export const ROUTER_GROUPS = {
  APP_GROUP: {
    name: null,
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        data: {
          display: false
        }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          name: 'Dashboard',
          icon: 'Dashboard',
          display: true
        }
      },
      {
        path: 'login',
        component: DashboardComponent,
        data: {
          name: 'Đăng nhập',
          icon: 'Dashboard',
          display: false
        }
      },
    ] as Routes
  }
};

const redirectRoute: Route = {
  path: '**',
  redirectTo: 'dashboard',
  pathMatch: 'full'
}

@NgModule({
  imports: [RouterModule.forRoot([ROUTER_GROUPS.APP_GROUP, redirectRoute])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
