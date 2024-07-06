import { PubSub } from '@google-cloud/pubsub';

export class PubSubClient {
  private readonly pubsub: PubSub;

  constructor() {
    this.pubsub = new PubSub({
      apiEndpoint: process.env.PUBSUB_EMULATOR_HOST || 'localhost:8085',
      projectId: process.env.PUBSUB_PROJECT_ID || 'fiap-pos-tech-428300',
    });
  }

  async publishMessage(topicName: string, data: any): Promise<string> {
    const dataBuffer = Buffer.from(JSON.stringify(data));
    const messageId = await this.pubsub.topic(topicName).publish(dataBuffer);
    return messageId;
  }

  async subscribe(
    subscriptionName: string,
    messageHandler: (message: any) => void,
  ): Promise<void> {
    const subscription = this.pubsub.subscription(subscriptionName);
    subscription.on('message', messageHandler);
  }
}
