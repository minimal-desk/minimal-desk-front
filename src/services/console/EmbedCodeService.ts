import { EmbedCodeItem } from "../../domains/EmbedCodeItem";

export interface EmbedCodeService {
  embedCodes(): { embedCodeItem: EmbedCodeItem }
}