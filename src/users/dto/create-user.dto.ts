import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateUserDto {
   
    userId?: number;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly phone: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly password: string;
    
    dob: Date;

    active: boolean;

    roles: Array<string>;

    address: object;
}
