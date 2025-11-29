export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Outer ripple */}
        <div className="absolute w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-ping" />
        
        {/* Inner glow */}
        <div className="absolute w-16 h-16 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full animate-pulse blur-xl" />
        
        {/* Core */}
        <div className="relative w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full animate-spin shadow-[0_0_30px_-5px_rgba(236,72,153,0.6)]">
            <div className="absolute top-1 left-1 w-3 h-3 bg-white/50 rounded-full blur-[1px]" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground animate-pulse font-medium">
        Thinking...
      </p>
    </div>
  );
};