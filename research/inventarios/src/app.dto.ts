import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AppDto {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public productId: string;

  @IsString()
  @IsNotEmpty()
  public productName: string;

  @IsString()
  @IsNotEmpty()
  public productDescription: string;

  @IsString()
  @IsNotEmpty()
  public countryCode: string;

  @IsNumber()
  @IsNotEmpty()
  public count: number;
}
