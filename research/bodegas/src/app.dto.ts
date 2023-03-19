import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AppDto {
  @IsString()
  @IsNotEmpty()
  readonly productId: string;

  @IsString()
  @IsNotEmpty()
  readonly countryCode: string;

  @IsNumber()
  @IsNotEmpty()
  readonly count: number;
}
