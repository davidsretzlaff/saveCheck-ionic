import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component',
  templateUrl: './component.page.html',
  styleUrls: ['./component.page.scss'],
})
export class ComponentPage implements OnInit {

  constructor(
    private router: Router
  ) { }
 
  ngOnInit() {
   
  }

ionViewWillEnter(){
  this.router.navigate(['tabs/search/1']);
}


}
