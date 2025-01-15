import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

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
  getUser(@Param('id') id: string) {
    // return { id };
    return this.usersService.getUser(id);
  }

  @Post() // POST /users
  createUser(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ADMIN' | 'ENGINEER';
    },
  ) {
    // return user;
    return this.usersService.createUser(user);
  }

  @Patch(':id') // PATCH /users/:id
  updateUser(@Param('id') id: string, @Body() updateUser: any = {}) {
    // return { id, updateUser };
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete(':id') // GET /users/:id
  deleteUser(@Param('id') id: string) {
    // return { id };
    return this.usersService.deleteUser(id);
  }
}
