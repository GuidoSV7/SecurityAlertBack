import { IsString, IsNumber, IsOptional, IsUrl, IsUUID } from 'class-validator';

export class CreateComplaintDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  photoUrl: string;

  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;

  @IsOptional()
  @IsUUID()
  parent_id?: string;
}