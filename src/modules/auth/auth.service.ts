import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) { }
    async login(email: string, password: string) {
        const user = await this.usersService.findOneBy({ email });
        if(!user){
            throw new UnauthorizedException("CREDENCIAIS INCORRETAS - USUÁRIO INVÁLIDO");
        }
        const isAValidUser = await compare(password, user.password);
        if (!isAValidUser) {
            throw new UnauthorizedException("CREDENCIAIS INCORRETAS - SENHA INVÁLIDA");
        }
        const payload = { sub: user.id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}