import { QaItem } from "./QaItem";

export interface FaqTopic {
  topicName: String;
  faqItems: [QaItem];
}