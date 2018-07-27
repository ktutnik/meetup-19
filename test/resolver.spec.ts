import { Resolver } from "../src/resolver";
import { PetRepository, ClientRepository } from "../src/repository/repository";
import { ClientPetController } from "../src/controller/client-pet-controller";
import { ClientController } from "../src/controller/client-controller";

describe("Resolver", () => {
    it("Should able to resolve PetRepository", () => {
        const resolver = new Resolver();
        const petRepo = resolver.resolve(PetRepository)
        expect(petRepo).toBeInstanceOf(PetRepository)
    })

    it("Should able to resolve ClientRepository", () => {
        const resolver = new Resolver();
        const petRepo = resolver.resolve(ClientRepository)
        expect(petRepo).toBeInstanceOf(ClientRepository)
    })

    it("Should able to resolve ClientPetController", () => {
        const resolver = new Resolver();
        const petRepo = resolver.resolve(ClientPetController)
        expect(petRepo).toBeInstanceOf(ClientPetController)
    })

    it("Should able to resolve ClientController", () => {
        const resolver = new Resolver();
        const petRepo = resolver.resolve(ClientController)
        expect(petRepo).toBeInstanceOf(ClientController)
    })
})