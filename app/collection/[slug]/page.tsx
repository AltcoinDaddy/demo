import { Suspense } from "react";
import CollectionOverview from "@/components/nft/collection-overview";
import CollectionItems from "@/components/nft/collection-items";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";


interface AddressProps {
  address: string;
}

interface CollectionItemsProps extends AddressProps {
  limit: number;
}

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export default function CollectionPage({
  params,
}: CollectionPageProps): JSX.Element {
  const { slug } = params;

  return (
    <div className="space-y-8">
      <div>
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="mb-4 bg-black/30 border-white/20 text-blue-300 hover:bg-black/40 hover:text-blue-200"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to search
          </Button>
        </Link>
      </div>


      <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -inset-[100%] blur-3xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-violet-500/5 opacity-30"></div>

        <div className="relative z-10">
          <Suspense
            fallback={
              <div className="h-40 flex items-center justify-center">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-blue-900/30 h-12 w-12"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-blue-900/30 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-blue-900/30 rounded"></div>
                      <div className="h-4 bg-blue-900/30 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            }
          >
            <CollectionOverview address={slug} />
          </Suspense>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-xl">
        <Suspense
          fallback={
            <div className="h-80 flex items-center justify-center">
              <div className="animate-pulse w-full space-y-4">
                <div className="h-4 bg-blue-900/30 rounded w-1/4"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-40 bg-blue-900/30 rounded"></div>
                      <div className="h-4 bg-blue-900/30 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <CollectionItems address={slug} limit={8} />
        </Suspense>
      </div>
    </div>
  );
}
