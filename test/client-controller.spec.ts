import { ClientController } from "../src/controller/client-controller";
import { ClientRepository } from "../src/repository/repository";

jest.mock("../src/repository/repository")

describe("ClientController", () => {
    beforeEach(() => (ClientRepository as any).mockClear())
    
    it("Should able to create client", () => {
        const repository = new ClientRepository()
        const controller = new ClientController(repository)
        controller.save({ name: "Dibya Wiweka", email: "dibya.wiweka@gmail.com", pets: [] })
        expect(repository.save)
            .lastCalledWith({ name: "Dibya Wiweka", email: "dibya.wiweka@gmail.com", pets: [] })
    })

    it("Should able to modify client", () => {
        const repository = new ClientRepository()
        const controller = new ClientController(repository)
        controller.modify("5b590cf13c8ab17afa360e8b", { name: "Dibya Wiweka" })
        expect(repository.modify)
            .lastCalledWith("5b590cf13c8ab17afa360e8b", { name: "Dibya Wiweka" })
    })

    it("Should able to get client", () => {
        const repository = new ClientRepository()
        const controller = new ClientController(repository);
        (repository.get as jest.Mock).mockReturnValueOnce({ name: "Mimi", decease: true, birthday: new Date("2015-1-1") })
        const result = controller.get("5b590cf13c8ab17afa360e8b")
        expect(repository.get).lastCalledWith("5b590cf13c8ab17afa360e8b")
        expect(result).toEqual({ name: "Mimi", decease: true, birthday: new Date("2015-1-1") })
    })

    it("Should able to delete client", () => {
        const repository = new ClientRepository()
        const controller = new ClientController(repository);
        (repository.delete as jest.Mock).mockReturnValueOnce({ name: "Mimi", decease: true, birthday: new Date("2015-1-1") })
        controller.delete("5b590cf13c8ab17afa360e8b")
        expect(repository.delete).lastCalledWith("5b590cf13c8ab17afa360e8b")
    })

    it("Should be able to get all client", () => {
        const repository = new ClientRepository()
        const controller = new ClientController(repository);
        (repository.all as jest.Mock).mockReturnValueOnce([
            {
                name: "Dibya Wiweka", email: "dibya.wiweka@gmail.com",
                pets: [{ name: "Mimi", decease: true, birthday: new Date("2015-1-1") }]
            }])
        const result = controller.list()
        expect(result).toEqual([
            {
                name: "Dibya Wiweka", email: "dibya.wiweka@gmail.com",
                pets: [{ name: "Mimi", decease: true, birthday: new Date("2015-1-1") }]
            }])
    })
})