import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { Complaint } from './entities/complaint.entity';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  create(@Body() createComplaintDto: CreateComplaintDto): Promise<Complaint> {
    return this.complaintsService.create(createComplaintDto);
  }

  @Get()
  findAll(): Promise<Complaint[]> {
    return this.complaintsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Complaint> {
    return this.complaintsService.findOne(id);
  }

  @Get(':id/hierarchy')
  getHierarchy(@Param('id', ParseUUIDPipe) id: string): Promise<Complaint> {
    return this.complaintsService.getHierarchy(id);
  }
}