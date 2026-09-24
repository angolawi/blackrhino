export interface AddressInfo {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string; // UF (ex: "DF", "SP", "RJ")
}

export type ShippingCarrier = "correios" | "transportadora" | "blackrhino_express" | "local_pickup";

export interface ShippingCompany {
  id: number;
  name: string;
  picture?: string;
}

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
  company?: ShippingCompany;
  serviceId?: number;
}

export interface ShippingRatesConfig {
  freeShippingThreshold: number;
  originCep: string;
  originCity: string;
  originState: string;
}

export interface MelhorEnvioVolume {
  id?: string;
  height: number;
  width: number;
  length: number;
  weight: number;
  qntd?: number;
}

export interface MelhorEnvioCalculateRequest {
  from: {
    postal_code: string;
  };
  to: {
    postal_code: string;
  };
  volumes?: MelhorEnvioVolume[];
  services?: string;
  options?: {
    receipt?: boolean;
    own_hand?: boolean;
    unit_id?: number;
  };
}

export interface MelhorEnvioQuoteRaw {
  id: number;
  name: string;
  price?: string;
  custom_price?: string;
  discount?: string;
  currency?: string;
  delivery_time?: number;
  delivery_range?: {
    min: number;
    max: number;
  };
  custom_delivery_time?: number;
  custom_delivery_range?: {
    min: number;
    max: number;
  };
  packages?: Array<{
    price?: string;
    discount?: string;
    format?: string;
    weight?: string;
    insurance_value?: string;
    dimensions?: {
      height: number;
      width: number;
      length: number;
    };
  }>;
  company: {
    id: number;
    name: string;
    picture?: string;
  };
  error?: string;
}
