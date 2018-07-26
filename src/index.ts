import Plumier, { RestfulApiFacility } from "@plumjs/plumier";

import { MongooseFacility } from "@plumjs/mongoose";
import { Resolver } from "./resolver";


new Plumier()
    .set(new RestfulApiFacility())
    .set(new MongooseFacility({uri: "mongodb://localhost:27017/pet-api"}))
    .set({ dependencyResolver: new Resolver() })
    .initialize()
    .then(x => x.listen(8000))
    .catch(x => console.error(x))