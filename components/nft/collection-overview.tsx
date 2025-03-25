// components/nft/collection-search.tsx

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NFTCollection } from "@/types";
import Link from "next/link";
import { Search, AlertCircle, Loader2 } from "lucide-react";

// Helper function to get initial letter for fallback
function getInitialLetter(name: string): string {
  return name?.charAt(0)?.toUpperCase() || 'N';
}



export default function CollectionSearch({address}:{address: string}) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [collections, setCollections] = useState<NFTCollection[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setError(null);
    setCollections([]);
    
    try {
      console.log("Searching for:", query);
      const response = await fetch(`/api/chainbase?action=search&query=${encodeURIComponent(query)}`);
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData);
        throw new Error(errorData.error || `API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Search results:", data);
      
      if (data.collections) {
        setCollections(data.collections);
      } else {
        setCollections([]);
      }
    } catch (error) {
      console.error("Error searching collections:", error);
      setError(error instanceof Error ? error.message : "Failed to search collections");
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex space-x-2 relative">
        <div className="relative w-full">
          <Input
            placeholder="Search by collection name or contract address..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pr-10 bg-black/30 border-white/20 text-white placeholder:text-gray-400 h-12 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
            </div>
          )}
        </div>
        <Button 
          onClick={handleSearch} 
          disabled={isSearching}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-6 shadow-lg shadow-blue-600/20"
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-400/30 text-red-200 p-4 rounded-xl flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
          <span>{error}</span>
        </div>
      )}


      {collections.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((collection) => (
            <Link href={`/collection/${collection.contract_address}`} key={collection.id || collection.contract_address}>
              <Card className="bg-black/30 border-white/10 overflow-hidden rounded-xl hover:bg-black/40 hover:border-blue-400/30 transition duration-300 h-full">
                <div className="h-36 w-full relative border-b border-white/10">
                  {/* Banner with fallback */}
                  <div className="h-full w-full bg-gradient-to-r from-blue-900/40 to-purple-900/40 flex items-center justify-center">
                    <span className="text-sm text-gray-400 opacity-50">No banner</span>
                  </div>
                  
                  {collection.banner_image_url && (
                    <img
                      src={collection.banner_image_url}
                      alt={`${collection.name} banner`}
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  
                  <div className="absolute bottom-0 right-0 left-0 h-full bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                
                <CardContent className="p-4 relative">
                  <div className="flex items-center space-x-4">
                    {/* Logo with fallback */}
                    <div className="h-16 w-16 relative rounded-xl overflow-hidden border-2 border-white/20 -mt-10 z-10 bg-black/50 shadow-xl">
                      <div className={`h-full w-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center`}>
                        <span className="text-lg font-bold text-white">{getInitialLetter(collection.name)}</span>
                      </div>
                      
                      {collection.image_url && (
                        <img
                          src={collection.image_url}
                          alt={collection.name}
                          className="absolute inset-0 h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white truncate">{collection.name}</h3>
                      <p className="text-sm text-gray-400">
                        {collection.total_supply
                          ? `${collection.total_supply.toLocaleString()} items`
                          : ""}
                      </p>
                      {collection.floor_price ? (
                        <p className="text-sm font-medium mt-1 text-blue-300">
                          Floor: {collection.floor_price.toFixed(3)} ETH
                        </p>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {!isSearching && error && collections.length === 0 && query && (
        <div className="text-center py-8 text-gray-400 bg-black/20 rounded-xl border border-white/10 backdrop-blur-sm">
          No collections found for "{query}". Try a different search term.
        </div>
      )}
    </div>
  );
}