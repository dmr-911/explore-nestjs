import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UsersService } from './users.service';

@Controller('users') // /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get() // GET /users
  getAllUsers(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    // return {
    //   role: role ? role : 'INTERN',
    //   users: [],
    // };
    return this.usersService.getAllUsers(role);
  }

  @Get(':id') // GET /users/:id
  getUser(@Param('id', ParseIntPipe) id: number) {
    // return { id };
    return this.usersService.getUser(id);
  }

  @Post() // POST /users
  createUser(
    @Body(ValidationPipe)
    user: CreateUserDto,
  ) {
    // return user;
    return this.usersService.createUser(user);
  }

  @Patch(':id') // PATCH /users/:id
  updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUser: UpdateUserDto,
  ) {
    // return { id, updateUser };
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete(':id') // GET /users/:id
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    // return { id };
    return this.usersService.deleteUser(id);
  }
}
