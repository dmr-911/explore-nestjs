import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'jdoe@me.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@me.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'jdoe@me.com',
      role: 'INTERN',
    },
  ];

  getAllUsers(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    const roles = ['INTERN', 'ADMIN', 'ENGINEER'];

    if (role && !roles.includes(role)) {
      throw new NotFoundException('Role not found');
    }

    if (role) {
      const filteredUsers = this.users.filter((user) => user.role === role);

      if (filteredUsers.length === 0) {
        throw new NotFoundException('Users not found');
      }
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  getUser(id: string | number) {
    const user = this.users.find((user) => user.id == id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  createUser(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const highestId = usersByHighestId[0].id;
    const newUser = {
      id: highestId + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string | number, updateUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUser,
        };
      }
      return user;
    });

    return updateUser;
  }

  deleteUser(id: string | number) {
    const removedUser = this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
