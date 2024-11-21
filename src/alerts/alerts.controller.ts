import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Alert } from './entities/alert.entity';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}
  @Post()
  @ApiResponse({status:201, description:'alert Creado exitosamente', type: Alert})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertsService.create(createAlertDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.alertsService.findAll(paginationDto);
  }

  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string ,
        @Body() updateAlertDto: UpdateAlertDto) 
        {
    return this.alertsService.update(id, updateAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertsService.remove(id);
  }
}
