import LoadingSpinner from "@/components/overview/LoadingSpinner";
import SliderForm from "@/components/SliderForm";
import type { Database } from '@/integrations/supabase/types';

type Facility = Database['public']['Tables']['Facilities']['Row'];

interface SlidersContainerProps {
  isLoading: boolean;
  error: Error | null;
  facilities: Facility[] | undefined;
  onSearch: () => void;
}

const SlidersContainer = ({ isLoading, error, facilities, onSearch }: SlidersContainerProps) => {
  const LoadingState = () => (
    <div className="w-full animate-pulse space-y-2">
      <div className="h-6 bg-muted rounded" />
      <div className="h-24 bg-muted rounded" />
    </div>
  );

  const ErrorState = () => (
    <div className="text-center">
      <p className="text-destructive">Unable to load facilities</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 text-sm text-muted-foreground hover:text-primary"
      >
        Try again
      </button>
    </div>
  );

  return (
    <div className="flex-1 px-4 flex items-center justify-center min-h-[calc(100vh-12rem)]">
      <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-sm p-6 w-full max-w-md">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : (
          facilities && <SliderForm facilities={facilities} onSearch={onSearch} />
        )}
      </div>
    </div>
  );
};

export default SlidersContainer;