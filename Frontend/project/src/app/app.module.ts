import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'tasks/new',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'tasks/:id/edit',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppComponent,
    LoginComponent,
    TaskListComponent,
    TaskFormComponent,
    RegisterComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }