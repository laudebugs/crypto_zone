import { PubSub } from "apollo-server";
const EventEmitter = require("events");
import Pusher from "pusher";

export const pubsub = new PubSub();
export const SnapShotPubSub = {
  SNAPSHOT: "SNAPSHOT",
};

export const emmiter = new EventEmitter();
export const pusher = new Pusher({
  appId: "1188111",
  key: "cdcfc1b6bd2444ebe4a7",
  secret: "6b9359945a1716ea79c6",
  cluster: "us2",
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});
