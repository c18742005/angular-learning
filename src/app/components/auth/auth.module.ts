import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }