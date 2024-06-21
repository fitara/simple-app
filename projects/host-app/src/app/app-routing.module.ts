import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'projects/host-app/src/app/dashboard/dashboard.component';

const MFE_URL = 'http://localhost:4201/remoteEntry.js'

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { 
    path: 'todos', 
    loadChildren: () => {
      return loadRemoteModule({
          remoteEntry: MFE_URL,
          remoteName: 'mfeApp',
          exposedModule:  "./TodoModule"
      }).then(m => m.TodoListModule).catch(err => console.log(err))
    }  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }