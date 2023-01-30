import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.callApi()
  }
  countryName:any
  callApi()
  {
    this.http.get('assets/country.json').subscribe(res=>{
      console.log(res);
      this.countryName=res;
    })
  }
  openRegisterDialogueBox()
  {
    this.dialog.open(RegisterDialogBoxComponent);
  }
  checked: boolean =false;
  indeterminate: boolean =false;
  
}

@Component({
  selector: 'app-register-dialog-box',
  templateUrl: './register-dialog-box.html',
})
export class RegisterDialogBoxComponent implements OnInit{
  
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    ){}

  ngOnInit(): void 
  {
      this.callApi();
  }
  data:any
  url='../assets/images (1).jpg'
  Subscribed:boolean=false;
  ageValue=20;
  countryName:any;
  countryValue:string=""
  addressValue:string=""
  stateValue:string=""
  stateName:any;
  stateNameArray:any
  submitted:Boolean=false;
  homeAddressValue1:string=""
  homeAddressValue2:string=""
  companyAddressValue1:string=""
  companyAddressValue2:string=""
  registerForm: FormGroup = new FormGroup({
    user : new FormControl('',[Validators.required, Validators.maxLength(20)]),
    userLastName : new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    phnNumber : new FormControl('',[Validators.required,Validators.pattern("[0-9]*"),Validators.maxLength(10), Validators.minLength(10)])
  })

  get userDetail()
  {
    return this.registerForm.get('user')
  }
  
  get userLastName()
  {
    return this.registerForm.get('userLastName')
  }

  get userEmail()
  {
    return this.registerForm.get('email')
  }

  get userPhnNumber()
  {
    return this.registerForm.get('phnNumber')
  }

  callApi()
  {
    this.http.get('assets/country.json').subscribe(res=>
      {
        this.countryName=res;
        this.callStateApi();
      })      
  }
  callStateApi()
  {
    this.http.get('assets/state.json').subscribe(stateRes=>
      {
        this.stateName=stateRes
        // this.stateNameArray = JSON.stringify(this.stateName)
      })

  }
  
  closeDialogBox()
  {
    this.dialog.closeAll();
  }
  onSelect(event:any)
  {
    let fileType = event.target.files[0].type;
    if(fileType.match(/image\/*/))
    {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.url = event.target.results
      };
    }
    else
    {
      window.alert("Please Upload image in jpg or png format.")
    }
  }
  hobbiesInput:string= "";
  hobbiesArray:string[]=[];
  hello()
  {

    this.hobbiesArray.push(this.hobbiesInput);
    this.hobbiesInput="";
  }
  removeHobby(hobby:string)
  {
    const index = this.hobbiesArray.indexOf(hobby);

    if (index >= 0) {
      this.hobbiesArray.splice(index, 1);
    }
  }
  onSubmit(pageName:string):void
  {
    if(this.registerForm.invalid)
    {
      console.log(this.addressValue)
      window.alert("Please fill Valid Data")
    }
    else if(this.addressValue =="")
    {
      window.alert("Please fill Address")
    }
    else if(this.homeAddressValue1=="" )
    {
      if(this.companyAddressValue1=="")
      {
        window.alert("Please fill the Address fields")
      }
      else if(this.hobbiesArray.length == 0 )
      {
        window.alert("Please Enter your Hobbies.")
      }
      else
      {
      
        this.data=[this.registerForm.value.user, this.registerForm.value.userLastName, this.registerForm.value.email, this.registerForm.value.phnNumber, this.ageValue, this.countryValue, this.stateValue, this.homeAddressValue1, this.homeAddressValue2, this.companyAddressValue1, this.companyAddressValue2, this.hobbiesArray, this.Subscribed]
        this.dialog.closeAll()
        this.router.navigate([`${pageName}`],{queryParams:{data:this.data}});
      }
    }
    else if(this.hobbiesArray.length == 0 )
    {
      window.alert("Please Enter your Hobbies.")
    }
    else
    {
      this.data=[this.registerForm.value.user, this.registerForm.value.userLastName, this.registerForm.value.email, this.registerForm.value.phnNumber, this.ageValue, this.countryValue, this.stateValue, this.homeAddressValue1, this.homeAddressValue2, this.companyAddressValue1, this.companyAddressValue2, this.hobbiesArray, this.Subscribed]
       
      this.dialog.closeAll()
      this.router.navigate([`${pageName}`],{queryParams:{data:this.data}});
    }
  }
}
