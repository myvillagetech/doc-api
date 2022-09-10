import { IsEmail, IsNotEmpty } from "class-validator";

export class RefreshTokenDto {
    @IsEmail()
    refreshToken:string;

    @IsNotEmpty()
    password:string;
}
