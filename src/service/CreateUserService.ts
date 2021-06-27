import { getCustomRepository  } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({ name, email, admin = false, password } : IUserRequest){
        const usersRepository = getCustomRepository(UserRepositories);
        
        if(!email){
            throw new Error("Email invalido");
        }

        const userAlreadyExists = await usersRepository.findOne({email,
        });

        if(userAlreadyExists){
            throw new Error("Usuario já existe");
        }

        const passwordHash = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService };