import { Routes } from '@angular/router';
import { HopDongComponent } from './hop-dong/hop-dong.component';
import { TrangChuComponent } from './trang-chu/trang-chu.component';

export const routes: Routes = [
  { path: 'trang-chu', component: TrangChuComponent },
  { path: 'hop-dong', component: HopDongComponent },
  { path: '', pathMatch: 'full', redirectTo: 'trang-chu' },
];
