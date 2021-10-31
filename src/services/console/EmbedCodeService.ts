import { EmbedCodeItem } from "../../domains/project/EmbedCodeItem";

export interface EmbedCodeService {
  embedCodes(): { embedCodeItem: EmbedCodeItem }
}
