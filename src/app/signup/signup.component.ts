import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AjaxService } from '../services/ajax.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  userSignupDetailData: UserSignupDetail = new UserSignupDetail();

  constructor(private fb: FormBuilder,
              private http: AjaxService,
             ) { }

  ngOnInit(): void {
    this.initUserSignupDetailForm();
    
  }

  createSignupUser(){
    let value = this.signupForm.value;
    console.log(value);
    this.http.post("user/addUser", value).then(res => {
      if(res.ResponseBody){
        alert("Registred successfully");
        
      }
    } )

  }

  initUserSignupDetailForm(){
    this.signupForm = this.fb.group({
      userId: new FormControl(this.userSignupDetailData.userId),
      name: new FormControl(this.userSignupDetailData.name),
      mobile: new FormControl(this.userSignupDetailData.mobile),
      email: new FormControl(this.userSignupDetailData.email),
      password: new FormControl(this.userSignupDetailData.password)

    })

  }

}

class UserSignupDetail{
  userId: Number = 0;
  name: String = '';
  mobile: String = '';
  email: String = '';
  password: String = '';
}
