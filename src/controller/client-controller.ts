import { route } from "@plumjs/core";
import { val } from "@plumjs/plumier";

import { inject } from "../ioc-container";
import { ClientDto } from "../model/model";
import { ClientRepository } from "../repository/repository";

@inject.constructor()
export class ClientController {
    constructor(private clientRepository:ClientRepository){}

    @route.get("")
    list(){
        return this.clientRepository.all()
    }
    
    @route.get(":id")
    get(@val.mongoId() id: string) {
        return this.clientRepository.get(id)
    }

    @route.post("")
    save(data: ClientDto) {
        return this.clientRepository.save(data)
    }

    @route.put(":id")
    modify(@val.mongoId() id: string, @val.partial(ClientDto) data: Partial<ClientDto>) {
        this.clientRepository.modify(id, data)
    }

    @route.delete(":id")
    delete(@val.mongoId() id: string) {
        this.clientRepository.delete(id)
    }

    
}