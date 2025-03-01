import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Setting } from 'src/entities/settings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [SettingsService],
  imports: [TypeOrmModule.forFeature([Setting])],
  exports: [SettingsService],
})
export class SettingsModule {}
