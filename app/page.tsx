import CollectionSearch from "@/components/nft/collection-search";


export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
        <div className="absolute -inset-[20%] blur-3xl bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-violet-500/30 opacity-30 animate-slow-spin"></div>
        
        <div className="relative z-10 px-8 py-14 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              NFT Collection Explorer
            </span>
          </h1>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
            Discover, analyze, and track NFT collections across the blockchain ecosystem
          </p>
          
          <div className="mt-8 max-w-2xl mx-auto">
            <CollectionSearch />
          </div>
        </div>
      </div>
      
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-black/30 transition duration-300">
          <div className="h-12 w-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Floor Price Tracking</h3>
          <p className="text-blue-100/70">Monitor floor prices and market trends for any NFT collection in real-time.</p>
        </div>
        
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-black/30 transition duration-300">
          <div className="h-12 w-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 border border-purple-400/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Market Analytics</h3>
          <p className="text-blue-100/70">Analyze historical data, sales volume, and ownership distribution.</p>
        </div>
        
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-black/30 transition duration-300">
          <div className="h-12 w-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4 border border-pink-400/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">NFT Discovery</h3>
          <p className="text-blue-100/70">Explore trending collections and discover unique digital assets.</p>
        </div>
      </div>
      
      {/* About Section */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
        <h2 className="text-2xl font-bold text-white mb-4">About This Explorer</h2>
        <p className="text-blue-100/80 text-lg">
          This NFT Collection Explorer is powered by Chainbase API, providing real-time data on NFT collections 
          across multiple blockchains. Search for your favorite collections to view floor prices, 
          historical trends, and recent sales activity.
        </p>
      </div>
    </div>
  );
}