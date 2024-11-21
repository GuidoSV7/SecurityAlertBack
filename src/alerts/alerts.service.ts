import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository, DataSource } from 'typeorm';
import { Alert } from './entities/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { NotificationfcmService } from 'src/notificationfcm/notificationfcm.service';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class AlertsService {
  private readonly logger = new Logger('alertsService');
  

  constructor(

   

    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly notificationfcmService:NotificationfcmService,
    


    private readonly dataSource: DataSource
  ){}

  async create(createAlertDto: CreateAlertDto) {
    try {
      const { ...AlertDetails} = createAlertDto;
      // Get all user tokens
    const users = await this.userRepository.find();
    const tokens = users
      .filter(user => user.tockenFCM) // Filter out users without tokens
      .map(user => user.tockenFCM);


      const alert= this.alertRepository.create({
        ...AlertDetails
      });

      await this.notificationfcmService.sendNotificationToMultipleTokens({
        tokens,
        title: alert.tipoEvento,
        body: alert.nivelAlerta
      })

      return await this.alertRepository.save(alert);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.alertRepository.find({
      take: limit,
      skip: offset,
     
    });
    
  }


  async findOne(id : string) {

    let alert: Alert;

      const queryBuilder = this.alertRepository.createQueryBuilder();
      alert= await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!alert){
      throw new NotFoundException( `Alert con id ${id} no encontrada`);
    }

    return alert;
    
  }

  async update(id: string, updateAlertDto: UpdateAlertDto) {

    const {...toUpdate} = updateAlertDto;

    const alert= await this.alertRepository.preload({ id,...toUpdate});

    if(!alert){
      throw new NotFoundException(`Alert con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(alert);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Alert');
    }
  
    
  }




  async remove(id: string) {

    const alert= await this.findOne(id);

    await this.alertRepository.remove(alert);

    return { mensaje: `La alert con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllAlerts(){
    const query = this.alertRepository.createQueryBuilder('alert');

    try{
      return await query
       .delete()
       .where({})
       .execute(); 



    } catch(error){
      this.logger.error(error.message);
      return error.message;
    }
  }
  
}
