import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from 'src/entities/settings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async getOption(key: string) {
    const setting = await this.settingRepository.findOne({
      where: { opt_key: key },
    });
    if (setting) {
      return setting.opt_value;
    }
    return false;
  }
}
