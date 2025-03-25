import {
  NFTCollection,
  SearchResult,
  NFTItem,
} from "@/types";


async function fetchChainbaseApi(
  endpoint: string,
  params?: Record<string, any>
) {
  const API_KEY = process.env.CHAINBASE_API_KEY;
  const API_URL =
    process.env.CHAINBASE_API_URL || "https://api.chainbase.com/v1";

  const url = new URL(`${API_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value.toString());
      }
    });
  }

  console.log(`Fetching from: ${url.toString()}`);

  const response = await fetch(url.toString(), {
    headers: {
      "x-api-key": API_KEY || "",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Chainbase API error: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
}

export async function searchCollections(
  query: string,
  chain_id: number = 1,
  limit: number = 10
): Promise<SearchResult> {
  // Check if the query looks like an Ethereum address (0x followed by 40 hex characters)
  const isEthAddress = /^0x[a-fA-F0-9]{40}$/.test(query);

  if (isEthAddress) {
    // If this is an Ethereum address, fetch the collection directly
    try {
      const data = await fetchChainbaseApi(`/nft/search`, {
        contract_address: query,
        name: "",
        chain_id,
      });

      // Format the response to match the expected SearchResult structure
      if (data?.data) {
        return {
          collections: [data.data],
          total: data.count || 0,
        };
      }
    } catch (error) {
      console.error("Error fetching collection by address:", error);
      // Fall back to searching by keyword if direct lookup fails
    }
  }

  // Search for NFT collections using names
  const data = await fetchChainbaseApi("/nft/search", {
    name: query,
    chain_id,
    limit,
  });

  return {
    collections: data.data || [],
    total: data.count || 0,
  };
}

export async function getCollection(
  contractAddress: string,
  chain_id: number = 1
): Promise<NFTCollection> {
  const data = await fetchChainbaseApi(`/nft/collection`, {
    contract_address: contractAddress,
    chain_id,
  });
  return data.data;
}

export async function getCollectionItems(
  contractAddress: string,
  limit: number = 20,
  offset: number = 0,
  chain_id: number = 1
): Promise<NFTItem[]> {
  const data = await fetchChainbaseApi("/nft/collection/items", {
    contract_address: contractAddress,
    chain_id,
    limit,
    offset,
  });

  return data.data || [];
}



