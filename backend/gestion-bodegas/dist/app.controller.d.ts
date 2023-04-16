import { AppService } from './app.service';
import { AppDto } from './app.dto';
import { AppEntity } from './app.entity';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    findAll(): Promise<AppEntity[]>;
    findOne(id: string): Promise<AppEntity>;
    create(appDto: AppDto): Promise<AppEntity>;
    update(id: string, appDto: AppDto): Promise<AppEntity>;
    delete(id: string): Promise<void>;
}
