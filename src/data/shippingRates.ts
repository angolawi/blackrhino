import { ShippingCarrier } from "@/types/shipping";

export interface CarrierRateOption {
  id: string;
  name: string;
  carrier: ShippingCarrier;
  basePrice: number;
  deliveryDaysMin: number;
  deliveryDaysMax: number;
  eligibleForFreeShipping: boolean;
  badge?: string;
  extraPerKg?: number; // Custo adicional por kg acima do peso base (2.0 kg)
}

export interface RegionShippingConfig {
  regionName: string;
  options: CarrierRateOption[];
}

export const SHIPPING_CONFIG = {
  originCep: "70800-200",
  originCity: "Brasília",
  originState: "DF",
  atelierAddress: "Ateliê Black Rhino - SHTN / Asa Norte, Brasília - DF",
  freeShippingThreshold: 350, // Frete grátis em compras a partir deste valor
  baseWeightKg: 2.0, // Peso base incluso na tarifa inicial (equivale a 1 kimono completo + embalagem)
};

export type BrazilianRegion = "DF" | "CENTRO_OESTE" | "SUDESTE" | "SUL" | "NORDESTE" | "NORTE";

export const UF_TO_REGION: Record<string, BrazilianRegion> = {
  // Distrito Federal
  DF: "DF",
  // Centro-Oeste
  GO: "CENTRO_OESTE",
  MT: "CENTRO_OESTE",
  MS: "CENTRO_OESTE",
  // Sudeste
  SP: "SUDESTE",
  RJ: "SUDESTE",
  MG: "SUDESTE",
  ES: "SUDESTE",
  // Sul
  PR: "SUL",
  SC: "SUL",
  RS: "SUL",
  // Nordeste
  BA: "NORDESTE",
  PE: "NORDESTE",
  CE: "NORDESTE",
  RN: "NORDESTE",
  PB: "NORDESTE",
  MA: "NORDESTE",
  PI: "NORDESTE",
  AL: "NORDESTE",
  SE: "NORDESTE",
  // Norte
  AM: "NORTE",
  PA: "NORTE",
  RO: "NORTE",
  AC: "NORTE",
  RR: "NORTE",
  AP: "NORTE",
  TO: "NORTE",
};

/**
 * Tabela de frete por região calibrada com base nas tarifas reais dos Correios e Transportadoras
 * a partir do centro de distribuição em Brasília/DF.
 * Você pode ajustar qualquer valor ou prazo diretamente nesta tabela.
 */
export const REGIONAL_SHIPPING_RATES: Record<BrazilianRegion, RegionShippingConfig> = {
  DF: {
    regionName: "Distrito Federal (Local)",
    options: [
      {
        id: "pickup",
        name: "Retirada no Ateliê Black Rhino",
        carrier: "local_pickup",
        basePrice: 0,
        deliveryDaysMin: 1,
        deliveryDaysMax: 1,
        eligibleForFreeShipping: true,
        badge: "Sem Custo",
      },
      {
        id: "motoboy",
        name: "Entrega Tatame Express (DF)",
        carrier: "blackrhino_express",
        basePrice: 18,
        deliveryDaysMin: 1,
        deliveryDaysMax: 2,
        eligibleForFreeShipping: true,
        badge: "Mais Rápido",
        extraPerKg: 2,
      },
      {
        id: "sedex_local",
        name: "SEDEX Local (DF)",
        carrier: "correios",
        basePrice: 19,
        deliveryDaysMin: 1,
        deliveryDaysMax: 1,
        eligibleForFreeShipping: false,
        extraPerKg: 3,
      },
    ],
  },

  CENTRO_OESTE: {
    regionName: "Centro-Oeste (GO, MT, MS)",
    options: [
      {
        id: "pac",
        name: "PAC Correios",
        carrier: "correios",
        basePrice: 28,
        deliveryDaysMin: 3,
        deliveryDaysMax: 6,
        eligibleForFreeShipping: true,
        badge: "Econômico",
        extraPerKg: 4,
      },
      {
        id: "sedex",
        name: "SEDEX Expresso",
        carrier: "correios",
        basePrice: 42,
        deliveryDaysMin: 1,
        deliveryDaysMax: 3,
        eligibleForFreeShipping: false,
        badge: "Mais Rápido",
        extraPerKg: 6,
      },
    ],
  },

  SUDESTE: {
    regionName: "Sudeste (SP, RJ, MG, ES)",
    options: [
      {
        id: "pac",
        name: "PAC Correios",
        carrier: "correios",
        basePrice: 32,
        deliveryDaysMin: 5,
        deliveryDaysMax: 8,
        eligibleForFreeShipping: true,
        badge: "Econômico",
        extraPerKg: 5,
      },
      {
        id: "jadlog",
        name: "Transportadora Jadlog (.Package)",
        carrier: "transportadora",
        basePrice: 34,
        deliveryDaysMin: 4,
        deliveryDaysMax: 6,
        eligibleForFreeShipping: false,
        extraPerKg: 5,
      },
      {
        id: "sedex",
        name: "SEDEX Expresso",
        carrier: "correios",
        basePrice: 54,
        deliveryDaysMin: 2,
        deliveryDaysMax: 3,
        eligibleForFreeShipping: false,
        badge: "Mais Rápido",
        extraPerKg: 8,
      },
    ],
  },

  SUL: {
    regionName: "Sul (PR, SC, RS)",
    options: [
      {
        id: "pac",
        name: "PAC Correios",
        carrier: "correios",
        basePrice: 36,
        deliveryDaysMin: 6,
        deliveryDaysMax: 9,
        eligibleForFreeShipping: true,
        badge: "Econômico",
        extraPerKg: 5,
      },
      {
        id: "jadlog",
        name: "Transportadora Jadlog (.Package)",
        carrier: "transportadora",
        basePrice: 38,
        deliveryDaysMin: 5,
        deliveryDaysMax: 7,
        eligibleForFreeShipping: false,
        extraPerKg: 5,
      },
      {
        id: "sedex",
        name: "SEDEX Expresso",
        carrier: "correios",
        basePrice: 68,
        deliveryDaysMin: 2,
        deliveryDaysMax: 4,
        eligibleForFreeShipping: false,
        badge: "Mais Rápido",
        extraPerKg: 9,
      },
    ],
  },

  NORDESTE: {
    regionName: "Nordeste (BA, PE, CE, RN, etc.)",
    options: [
      {
        id: "pac",
        name: "PAC Correios",
        carrier: "correios",
        basePrice: 44,
        deliveryDaysMin: 7,
        deliveryDaysMax: 12,
        eligibleForFreeShipping: true,
        badge: "Econômico",
        extraPerKg: 6,
      },
      {
        id: "sedex",
        name: "SEDEX Expresso",
        carrier: "correios",
        basePrice: 78,
        deliveryDaysMin: 3,
        deliveryDaysMax: 5,
        eligibleForFreeShipping: false,
        badge: "Mais Rápido",
        extraPerKg: 10,
      },
    ],
  },

  NORTE: {
    regionName: "Norte (AM, PA, RO, etc.)",
    options: [
      {
        id: "pac",
        name: "PAC Correios",
        carrier: "correios",
        basePrice: 58,
        deliveryDaysMin: 9,
        deliveryDaysMax: 15,
        eligibleForFreeShipping: true,
        badge: "Econômico",
        extraPerKg: 8,
      },
      {
        id: "sedex",
        name: "SEDEX Expresso",
        carrier: "correios",
        basePrice: 98,
        deliveryDaysMin: 4,
        deliveryDaysMax: 7,
        eligibleForFreeShipping: false,
        badge: "Mais Rápido",
        extraPerKg: 14,
      },
    ],
  },
};
