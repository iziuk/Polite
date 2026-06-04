import type { IPack } from "./types";

import autoservicePack from "@polite/data/autoservice-sk.json";
import marketPack from "@polite/data/market-sk.json";
import pharmacyPack from "@polite/data/pharmacy-sk.json";
import transportPack from "@polite/data/transport-sk.json";

export const PHRASE_PACKS: readonly [IPack, ...IPack[]] = [autoservicePack, marketPack, pharmacyPack, transportPack];
