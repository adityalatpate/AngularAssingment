import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogBoxComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-user-profile-template',
  templateUrl: './user-profile-template.component.html',
  styleUrls: ['./user-profile-template.component.css']
})
export class UserProfileTemplateComponent implements OnInit {

  userName:any
  name:string=""
  lastName:string=""
  age:string=""
  email:string=""
  phnNumber:string=""
  country:string=""
  state : string=""
  homeAddress1 : string=""
  homeAddress2 : string=""
  companyAddress1 : string=""
  companyAddress2 : string=""
  hobbiesArray:any=[]
  hobbiesArrayPrint:any=[]
  subscribed:boolean=false

  constructor(
    private route:ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>
    {
      this.userName=params['data']
      console.log(this.userName)
    })
    this.name=this.userName[0]
    this.lastName=this.userName[1]
    this.age =this.userName[4]
    this.email=this.userName[2]
    this.phnNumber=this.userName[3]
    this.country =this.userName[5]
    if (this.userName[6] == 'MH')
    {
      this.state= "Maharashtra"
    }
    else if (this.userName[6]=='CH')
    {
      this.state = "Chennai"
    }
    else if (this.userName[6]=='DEL')
    {
      this.state = "Delhi"
    } 
    else if (this.userName[6]=='CHI')
    {
      this.state = "Chicago"
    }
    else if (this.userName[6]=='Tex')
    {
      this.state = "Texas"
    }
    else if (this.userName[6]=='Fl')
    {
      this.state = "Florida"
    }
    else
    {
      this.state=""
    }

    this.homeAddress1 = this.userName[7]
    this.homeAddress2 = this.userName[8]
    this.companyAddress1 = this.userName[9]    
    this.companyAddress2 = this.userName[10]
    this.hobbiesArray = this.userName[11]
    this.subscribed=this.userName[12]     
  }
  openDialogBox()
  {
    this.dialog.open(RegisterDialogBoxComponent);
  } 
  refreshPage()
  {
    window.location.reload();
  }
  agree()
  {
    window.alert("Form Submitted!!")
  }
}
