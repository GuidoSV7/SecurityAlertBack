import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from './entities/complaint.entity';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint)
    private complaintsRepository: Repository<Complaint>,
  ) {}

  async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
    if (createComplaintDto.parent_id) {
      const parentExists = await this.complaintsRepository.findOne({
        where: { id: createComplaintDto.parent_id },
      });
      if (!parentExists) {
        throw new NotFoundException('Parent complaint not found');
      }
    }
    
    const complaint = this.complaintsRepository.create(createComplaintDto);
    return this.complaintsRepository.save(complaint);
  }

  async findAll(): Promise<Complaint[]> {
    return this.complaintsRepository.find({
      relations: ['children'],
      where: { parent_id: null }, // Only main complaints
    });
  }

  async findOne(id: string): Promise<Complaint> {
    const complaint = await this.complaintsRepository.findOne({
      where: { id },
      relations: ['children', 'children.children'], // Recursive loading up to 2 levels
    });

    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }

    return complaint;
  }

  async getHierarchy(id: string): Promise<Complaint> {
    const complaint = await this.complaintsRepository
      .createQueryBuilder('complaint')
      .leftJoinAndSelect('complaint.children', 'children')
      .where('complaint.id = :id', { id })
      .getOne();

    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }

    return complaint;
  }
}