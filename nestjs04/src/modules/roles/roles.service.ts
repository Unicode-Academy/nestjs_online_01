import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  findAll() {
    return this.roleRepository.find();
  }
  find(id: number, isPermission = false) {
    const options: FindOneOptions = { where: { id } };
    if (isPermission) {
      options.relations = {
        permissions: true,
      };
    }
    return this.roleRepository.findOne(options);
  }
  async create(body: Role) {
    const { name, status = true, permissions } = body;
    const role = await this.roleRepository.save({
      name,
      status,
    });
    if (role) {
      //Thêm permissions
      //Kiểm tra xem permission có tồn tại không?
      //Nếu không --> Thêm mới và trả về instance
      //Nếu có --> Trả về instance
      if (!permissions || !Array.isArray(permissions)) {
        return role;
      }
      const permissionList = await Promise.all(
        permissions.map(async (name: any) => {
          const permission = await this.permissionRepository.findOne({
            where: { name },
          });
          if (permission) {
            return permission;
          }
          return this.permissionRepository.save({
            name,
          });
        }),
      );
      if (permissionList) {
        //Thêm permissionList và role vào bảng trung gian
        role.permissions = permissionList;
        await this.roleRepository.save(role);
      }
    }
    return role;
  }

  async update(body: Role, id: number) {
    const { name, status = true, permissions } = body;
    await this.roleRepository.update(id, {
      name,
      status,
    });
    const role = await this.find(id);
    if (!permissions || !Array.isArray(permissions)) {
      return role;
    }
    const permissionList = await Promise.all(
      permissions.map(async (name: any) => {
        const permission = await this.permissionRepository.findOne({
          where: { name },
        });
        if (permission) {
          return permission;
        }
        return this.permissionRepository.save({
          name,
        });
      }),
    );

    role.permissions = permissionList;
    this.roleRepository.save(role);
    return role;
  }

  async delete(id: number) {
    const role = await this.find(id);
    if (!role) {
      return false;
    }
    await this.roleRepository.delete(id);
    return role;
  }
}
