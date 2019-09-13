import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import {VoyageFormComponent} from './modules/voyages/voyage-form/voyage-form.component';
import {LoginComponent} from './modules/auth/login/login.component';
import {VehicleCategoryFormComponent} from './modules/vehicle/vehicle-category-form/vehicle-category-form.component';
import {VehicleCategoryListComponent} from './modules/vehicle/vehicle-category-list/vehicle-category-list.component';
import {VehiclesListComponent} from './modules/vehicle/vehicles-list/vehicles-list.component';
import {VehiclesFormComponent} from './modules/vehicle/vehicles-form/vehicles-form.component';
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
        path: 'auth/login',
        component: LoginComponent,
        data: {
          name: 'Đăng nhập',
          icon: 'Dashboard',
          display: false
        }
      },
    ] as Routes
  },
    VEHICLE_GROUP: {
        name: 'Nhóm xe',
        path: 'vehicles',
        children: [
            {
                path: 'vehicle-category-form',
                component: VehicleCategoryFormComponent,
                data: {
                    name: 'Thêm nhóm xe',
                    icon: '',
                    display: true
                }
            }, {
                path: 'vehicle-category-list',
                component: VehicleCategoryListComponent,
                data: {
                    name: 'Danh sách nhóm xe',
                    icon: '',
                    display: true
                }
            }, {
                path: 'vehicle-list',
                component: VehiclesListComponent,
                data: {
                    name: 'Danh sách xe',
                    icon: '',
                    display: true
                }
            }, {
                path: 'vehicle-form',
                component: VehiclesFormComponent,
                data: {
                    name: 'Thêm xe',
                    icon: '',
                    display: true
                }
            },
        ] as Routes
    },
    VOYAGE_GROUP: {
        name: 'Quản lý tuyến đường',
        path: 'voyages',
        children: [
            {
                path: 'create',
                component: VoyageFormComponent,
                data: {
                    name: 'Thêm tuyến đường',
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
};

@NgModule({
  imports: [RouterModule.forRoot([ROUTER_GROUPS.APP_GROUP, redirectRoute])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
