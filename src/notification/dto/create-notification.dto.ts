import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class CreateNotificationDto {
    @IsNotEmpty()
    @IsString()
    userId: string;
    
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    username: string;
}