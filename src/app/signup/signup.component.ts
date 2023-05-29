import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  message: string = "";
  userError: any;

  constructor(public fb: FormBuilder) {

    this.myForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.checkIfMatchingPasswords("password", "confirmPassword")
    })

  }

  checkIfMatchingPasswords(passwordKey: string, confirmPasswordKey: string){
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if(password.value == confirmPassword.value){
        return;
      } else {
        confirmPassword.setErrors({
          notEqualToPassword: true
        })
      }

    }
  }

  onSubmit(signupform: any){
    console.log(signupform.value);
  }

  ngOnInit() {}

}
