import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }


  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  onSubmit(): void {
    if (this.form.valid) {
      const {username, password} = this.form.value;
      if (this.authService.login(username, password)) {
        this.router.navigate(['/facts']);
      } else {
        alert('Incorrect username or password.');
      }
    }
  }
}
