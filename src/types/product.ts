export type WeaveWeight = 350 | 450 | 550;

export type WeaveType =
  | "Ultralight Pearl Weave (350 GSM)"
  | "Standard Competition Pearl Weave (450 GSM)"
  | "Armored Gold / Double Weave (550 GSM)";

export type PantsMaterial = "10 oz Diamond Ripstop" | "10 oz Cotton Canvas";

export type ComplianceStatus = "IBJJF Legal" | "Academy / In-House Edition";

export type GiCut = "A0" | "A1" | "A1L" | "A2" | "A2L" | "A2H" | "A3" | "A3L" | "A4";

export type ProductCategory = "gis" | "belts" | "separates" | "gear";

export interface MacroHotspot {
  id: string;
  title: string;
  description: string;
  xPercent: number; // For interactive anatomy placement
  yPercent: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subhead: string;
  category: ProductCategory;
  price: number; // in USD
  compareAtPrice?: number;
  colorName: string;
  colorHex: string;
  weaveWeight: WeaveWeight;
  weaveType: WeaveType;
  pantsMaterial: PantsMaterial;
  compliance: ComplianceStatus;
  sanforized: boolean; // Pre-shrunk status
  images: {
    primary: string;
    secondary: string;
    macroCollar?: string;
    pants?: string;
    lifestyle?: string;
  };
  rating: number;
  reviewCount: number;
  availableCuts: GiCut[];
  inventory: Record<GiCut, number>;
  description: string;
  technicalSpecs: {
    jacketGsm: number;
    jacketWeave: string;
    collarMaterial: string;
    pantsMaterial: string;
    drawstringLoops: number;
    reinforcements: string[];
    dryTimeHours: number;
    tensileStiffnessRating: number; // out of 10
  };
  features: string[];
  shrinkageGuide: {
    coldWashHangDry: string;
    warmWashHangDry: string;
    hotWashMachineDry: string;
  };
  badge?: string;
  inStock: boolean;
}

export interface CartItem {
  id: string; // unique item cart id
  productId: string;
  slug: string;
  title: string;
  colorName: string;
  cut: GiCut | string;
  price: number;
  image: string;
  quantity: number;
  isAddon?: boolean;
}

export interface AcademyCustomConfig {
  baseColor: "white" | "royal-blue" | "black";
  academyName: string;
  contactEmail: string;
  quantityTier: 15 | 30 | 50 | 100;
  placements: {
    leftChest: boolean;
    upperBack: boolean;
    lowerSkirt: boolean;
    rightShoulder: boolean;
    pantHip: boolean;
  };
  notes?: string;
  logoFileName?: string;
}

export type Currency = "USD" | "BRL" | "EUR";
