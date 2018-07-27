import { ClientRepository } from "../src/repository/repository";
import { ClientModel } from "../src/model/model";
import { MongooseFacility } from "../node_modules/@plumjs/mongoose";
import { PlumierApplication } from "../node_modules/@plumjs/core";


describe("Repository", () => {
    describe("Client Repository", () => {
        beforeAll(async () => {
            const facility = new MongooseFacility({ uri: "mongodb://localhost:27017/pet-api-test" })
            facility.setup({ config: { mode: "production" } } as PlumierApplication)
        })

        beforeEach(async () => {
            await ClientModel.remove({})
        })

        it("Should be able to get client", async () => {
            const client = await new ClientModel({ email: "dibya-wiweka@gmail.com", name: "Dibya Wiweka", pets: [] }).save()
            const repo = new ClientRepository()
            await repo.get(client._id)
            const newClient = await ClientModel.findById(client._id)
            expect(newClient!.toObject()).toMatchObject({ email: "dibya-wiweka@gmail.com", name: "Dibya Wiweka", pets: [] })
        })

        it("Should be able to add client", async () => {
            const repo = new ClientRepository()
            const client = await repo.save({ email: "dibya-wiweka@gmail.com", name: "Dibya Wiweka", pets: [] })
            const newClient = await ClientModel.findById(client._id)
            expect(newClient!.toObject()).toMatchObject({ email: "dibya-wiweka@gmail.com", name: "Dibya Wiweka", pets: [] })
        })

        it("Should be able to modify client", async () => {
            const client = await new ClientModel({ email: "dibya-wiweka@gmail.com", name: "Dibya Wiweka", pets: [] }).save()
            const repo = new ClientRepository()
            await repo.modify(client._id, { email: "wiweka.dibya@yahoo.com" })
            const newClient = await ClientModel.findById(client._id)
            expect(newClient!.toObject()).toMatchObject({ email: "wiweka.dibya@yahoo.com", name: "Dibya Wiweka", pets: [] })
        })

        it("Should able to delete client", async () => {
            const client = await new ClientModel({ email: "dibya-wiweka@gmail.com", name: "Dibya Wiweka", pets: [] }).save()
            const repo = new ClientRepository()
            await repo.delete(client._id)
            const newClient = await ClientModel.findById(client._id)
            expect(newClient).toBeNull()
        })
    })
})