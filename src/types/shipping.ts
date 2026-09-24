export interface AddressInfo {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string; // UF (ex: "DF", "SP", "RJ")
}

export type ShippingCarrier = "correios" | "transportadora" | "blackrhino_express" | "local_pickup";

export interface ShippingQuote {
  id: string; // ex: "pickup", "motoboy", "pac", "sedex", "jadlog"
  name: string; // ex: "PAC Correios", "SEDEX Expresso", "Retirada no Ateliê"
  carrier: ShippingCarrier;
  price: number; // Preço final em BRL (0 se for grátis)
  originalPrice: number; // Preço original de tabela antes do benefício de frete grátis
  deliveryDaysMin: number;
  deliveryDaysMax: number;
  isFree: boolean;
  badge?: string; // ex: "Econômico", "Mais Rápido", "Recomendado", "Sem Custo"
}

export interface ShippingRatesConfig {
  freeShippingThreshold: number;
  originCep: string;
  originCity: string;
  originState: string;
}
