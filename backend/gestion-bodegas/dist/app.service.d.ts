import { Repository } from 'typeorm';
import { AppEntity } from './app.entity';
export declare class AppService {
    private readonly appRepository;
    constructor(appRepository: Repository<AppEntity>);
    findAll(): Promise<AppEntity[]>;
    findOne(id: string): Promise<AppEntity>;
    create(appEntity: AppEntity): Promise<AppEntity>;
    update(id: string, newAppEntity: AppEntity): Promise<AppEntity>;
    delete(id: string): Promise<void>;
}
