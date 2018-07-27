import { route } from "@plumjs/core";
import { val } from "@plumjs/plumier";

import { inject } from "../../lib/ioc-container";
import { ClientDto } from "../model/model";
import { ClientRepository } from "../repository/repository";

@inject.constructor()
export class ClientController {
    constructor(private clientRepository:ClientRepository){}

    //GET /client
    @route.get("")
    list(){
        return this.clientRepository.all()
    }
    
    //GET /client/<id>
    @route.get(":id")
    get(@val.mongoId() id: string) {
        return this.clientRepository.get(id)
    }

    //POST /client
    @route.post("")
    save(data: ClientDto) {
        return this.clientRepository.save(data)
    }

    //PUT /client/<id>
    @route.put(":id")
    modify(@val.mongoId() id: string, @val.partial(ClientDto) data: Partial<ClientDto>) {
        this.clientRepository.modify(id, data)
    }

    //DELETE /client/<id>
    @route.delete(":id")
    delete(@val.mongoId() id: string) {
        this.clientRepository.delete(id)
    }
}