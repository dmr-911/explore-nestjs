import { Injectable } from '@nestjs/common';

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
    if (role) {
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  getUser(id: string | number) {
    return this.users.find((user) => user.id == id);
  }

  createUser(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ADMIN' | 'ENGINEER';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const highestId = usersByHighestId[0].id;
    const newUser = {
      id: highestId + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string | number, updateUser: any = {}) {
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
