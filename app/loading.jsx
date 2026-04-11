export default function Loading() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#faf6ed]/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner ring */}
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-[#4db6ac]/20" />
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#4db6ac]"
            style={{ animation: "spin 0.8s linear infinite" }}
          />
        </div>
        <p className="text-sm text-gray-500 font-medium tracking-wide">Loading…</p>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
