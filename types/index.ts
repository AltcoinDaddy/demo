export interface NFTCollection {
  id: string;
  name: string;
  symbol: string;
  description: string;
  image_url: string;
  banner_image_url: string;
  contract_address: string;
  chain_id: number;
  floor_price: number;
  total_supply: number;
  owner_count: number;
  volume_24h?: number;
  volume_7d?: number;
  volume_30d?: number;
  marketplace?: string;
}

export interface SearchResult {
  collections: NFTCollection[];
  total: number;
}

export interface NFTItem {
  token_id: string;
  contract_address: string;
  name: string;
  description: string;
  image_url: string;
  metadata: Record<string, any>;
  attributes: NFTAttribute[];
  owner?: string;
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  rarity?: number;
}
