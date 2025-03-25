// components/nft/collection-items.tsx

"use client";

import { useEffect, useState } from "react";
import { NFTItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight, Grid, AlertCircle } from "lucide-react";

// Helper function to get initial letter for fallback
function getInitialLetter(name: string): string {
  return name?.charAt(0)?.toUpperCase() || '#';
}

// Export the interface
export interface CollectionItemsProps {
  address: string;
  limit?: number;
}

export default function CollectionItems({ address, limit = 12 }: CollectionItemsProps) {
  const [items, setItems] = useState<NFTItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchCollectionItems() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/chainbase?action=collectionItems&address=${address}&limit=${limit}&offset=${offset}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch collection items: ${response.status}`);
        }
        
        const data = await response.json();
        setItems(data || []);
        setHasMore(data.length === limit);
      } catch (error) {
        console.error("Error fetching collection items:", error);
        setError("Failed to load collection items. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (address) {
      fetchCollectionItems();
    }
  }, [address, limit, offset]);

  const handleNextPage = () => {
    setOffset(prev => prev + limit);
  };

  const handlePrevPage = () => {
    setOffset(prev => Math.max(0, prev - limit));
  };

  if (loading && offset === 0) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-400" />
        <p className="mt-2 text-blue-200/70">Loading collection items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-400/30 text-red-200 p-4 rounded-xl flex items-center">
        <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
        <span>{error}</span>
      </div>
    );
  }

  if (items.length === 0 && !loading) {
    return (
      <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center text-gray-400">
        No items found for this collection.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Grid className="h-5 w-5 text-purple-400" />
        <h2 className="text-xl font-bold text-white">Collection Items</h2>
      </div>
      
      {loading && (
        <div className="text-center py-4">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-400" />
          <p className="mt-2 text-blue-200/70">Loading...</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={`${item.contract_address}-${item.token_id}`}
            className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-purple-400/30 transition-colors"
          >
            <div className="aspect-square relative">
              <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-blue-900/40 flex items-center justify-center">
                <span className="text-white/50 font-medium"># {item.token_id}</span>
              </div>
              
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name || `Token #${item.token_id}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-white truncate">
                {item.name || `#${item.token_id}`}
              </h3>
              <p className="text-sm text-blue-300 truncate">
                Token ID: {item.token_id}
              </p>
              {item.attributes && item.attributes.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.attributes.slice(0, 3).map((attr, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/20"
                    >
                      {attr.trait_type}: {attr.value}
                    </span>
                  ))}
                  {item.attributes.length > 3 && (
                    <span className="text-xs text-gray-400">+{item.attributes.length - 3} more</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handlePrevPage}
          disabled={offset === 0 || loading}
          className="bg-black/30 border-white/20 text-blue-300 hover:bg-black/40 hover:text-blue-200 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        
        <span className="text-sm text-gray-400">
          Showing {offset + 1}-{offset + items.length}
        </span>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleNextPage}
          disabled={!hasMore || loading}
          className="bg-black/30 border-white/20 text-blue-300 hover:bg-black/40 hover:text-blue-200 disabled:opacity-50"
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}