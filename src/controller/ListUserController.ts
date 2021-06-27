import { Request, Response } from "express";
import { ListUserService } from "../service/ListUserService";

class ListUserController {
     async handle(request: Request, response: Response){
         const listUsersService = new ListUserService();

         const users = await listUsersService.execute();

         return response.json(users);
     }
}

export { ListUserController };