import { route, val } from "@plumjs/plumier";

import { inject } from "../ioc-container";
import { PetDto } from "../model/model";
import { ClientRepository, PetRepository } from "../repository/repository";

@inject.constructor()
@route.root("/client/:clientId/pet")
export class ClientPetController {
    constructor(private petRepository: PetRepository, private clientRepository: ClientRepository) { }

    @route.get("")
    async list(@val.mongoId() clientId: string) {
        const client = await this.clientRepository.get(clientId)
        return client.pets
    }

    @route.get(":id")
    async get(@val.mongoId() clientId: string, @val.mongoId() id: string) {
        return this.petRepository.get(id)
    }

    @route.post("")
    async save(@val.mongoId() clientId: string, data: PetDto) {
        const pet = await this.petRepository.save(data)
        const client = await this.clientRepository.get(clientId)
        client.pets.push(pet)
        await client.save()
        return pet
    }

    @route.put(":id")
    async modify(@val.mongoId() clientId: string, @val.mongoId() id: string, @val.partial(PetDto) data: Partial<PetDto>) {
        this.petRepository.modify(id, data)
    }

    @route.delete(":id")
    delete(@val.mongoId() clientId: string, @val.mongoId() id: string) {
        this.petRepository.delete(id)
    }
}