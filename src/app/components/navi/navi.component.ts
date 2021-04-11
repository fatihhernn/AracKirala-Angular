import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  existToken:boolean=false

  constructor() { }


  ngOnInit(): void {



    if(localStorage.getItem("token")===null){
      this.existToken=false;
    }else{
      this.existToken=true;
    }

  }

  logout(){
    localStorage.removeItem("token")
  }
  refreshPage(){
    window.location.reload();
  }
}
