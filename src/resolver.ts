import { Class, DependencyResolver } from "@plumjs/core";

import { ClientController } from "./controller/client-controller";
import { ClientPetController } from "./controller/client-pet-controller";
import { Container } from "../lib/ioc-container";
import { ClientRepository, PetRepository } from "./repository/repository";


export class Resolver implements DependencyResolver {
    container: Container
    constructor(){
        const container = new Container()
        container.register(PetRepository)
        container.register(ClientRepository)
        container.register(ClientController)
        container.register(ClientPetController)
        this.container = container
    }
    resolve(type: Class) {
        return this.container.resolve(type)
    }
}