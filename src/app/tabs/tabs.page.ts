import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  tab1:string="ChatsPage"
  tab2:string="GroupsPage"
  tab3:string="ProfilePage"
  
  constructor() { }

  ngOnInit() {
  }

}
