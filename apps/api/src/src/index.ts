// Read env varibles
require("dotenv").config("../");

import "reflect-metadata";
import { scheduleSnapShots } from "./graphql/workers/snapshotWorker";

// Connect to mongo database
require("./database/mongo");

scheduleSnapShots();
