import { HttpStatusError } from "@plumjs/plumier";

import { ClientDto, ClientModel, PetDto, PetModel } from "../model/model";


export class PetRepository{
    async all(){
        return PetModel.find({})
    }

    async get(id:string){
        const pet = await PetModel.findById(id)
        if (!pet) throw new HttpStatusError(400, `No pet found with id ${id}`)
        return pet
    }

    async modify(id:string, data:Partial<PetDto>){
        const pet = await this.get(id)
        Object.assign(pet, data)
        await pet.save()
    }

    save(data:Partial<PetDto>){
        return new PetModel(data).save()
    }

    async delete(id:string){
        const pet = await this.get(id)
        pet.remove()
    }
}

export class ClientRepository{
    async all(){
        await PetModel.findById("5b5905f081a4267a89b3c7bd")
        return ClientModel.find({}).populate("pets")
    }

    async get(id:string){
        await PetModel.findById("5b5905f081a4267a89b3c7bd")
        const pet = await ClientModel.findById(id).populate("pets")
        if (!pet) throw new HttpStatusError(400, `No client found with id ${id}`)
        return pet
    }
    
    async modify(id:string, data:Partial<ClientDto>){
        const pet = await this.get(id)
        Object.assign(pet, data)
        await pet.save()
    }

    save(data:ClientDto){
        return new ClientModel(data).save()
    }

    async delete(id:string){
        const pet = await this.get(id)
        pet.remove()
    }
}