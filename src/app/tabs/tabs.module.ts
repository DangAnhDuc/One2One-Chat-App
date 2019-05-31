import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      { path: 'tab1', loadChildren: './chats/chats.module#ChatsPageModule' },
      { path: 'tab2', loadChildren: './groups/groups.module#GroupsPageModule' },
      { path: 'tab3', loadChildren: './profile/profile.module#ProfilePageModule' },
  ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
