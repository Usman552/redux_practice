import { PackageX, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductsError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="animate-in fade-in flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center duration-500">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <PackageX className="h-6 w-6 text-muted-foreground" />
      </div>

      <p className="font-medium">{message}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        This is usually temporary - try again.
      </p>

      <Button variant="outline" className="mt-5" onClick={onRetry}>
        <RefreshCw className="mr-2 h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}
