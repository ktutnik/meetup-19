import { collection, model } from "@plumjs/mongoose";
import { array, val } from "@plumjs/plumier";

@collection()
export class PetDto {
    constructor(
        public name:string,
        public decease:string,
        @val.before()
        public birthday: Date
    ){}
}

@collection()
export class ClientDto {
    constructor(
        public name:string,
        @val.email()
        public email:string,
        @array(PetDto)
        @val.optional()
        public pets: PetDto[]
    ){}
}

export const PetModel = model(PetDto)
export const ClientModel = model(ClientDto)