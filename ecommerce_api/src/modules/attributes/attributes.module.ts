import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { AdminAttributesController } from './admin.attributes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from 'src/entities/attribute.entity';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { AttributeValue } from 'src/entities/attribute-value.entity';
import { AdminValueController } from './admin.value.controller';
import { ValueService } from './value.service';

@Module({
  controllers: [
    AttributesController,
    AdminAttributesController,
    AdminValueController,
  ],
  providers: [AttributesService, ValueService],
  imports: [TypeOrmModule.forFeature([Attribute, AttributeValue]), AuthModule],
  exports: [ValueService],
})
export class AttributesModule {}
