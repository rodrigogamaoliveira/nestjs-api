import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./auth-guard/auth-guard.service";

@Controller("auth")
export class AuthController {
constructor(private readonly authService: AuthService) {}

@HttpCode(HttpStatus.OK)
@Post("login")
@Public()
login(@Body() loginDto) {
return this.authService.login(loginDto.email, loginDto.password);
}
}