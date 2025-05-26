import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email });
    }

    create(data: Partial<User>): User {
        return this.repository.create(data);
    }

    async save(data: User): Promise<User> {
        return this.repository.save(data);
    }

    async findAll() {
        return this.repository.find();
    }
}