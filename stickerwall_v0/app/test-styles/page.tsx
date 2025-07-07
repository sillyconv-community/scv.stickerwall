export default function TestStyles() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Style Test Page</h1>

      {/* Test basic Tailwind */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Basic Tailwind Test</h2>
        <div className="bg-red-500 text-white p-4 rounded">If you see this in red, Tailwind is working!</div>
      </div>

      {/* Test custom colors */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Custom Colors Test</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-cream p-4 rounded text-center">
            <div className="text-olive-dark font-bold">Cream</div>
          </div>
          <div className="bg-sage p-4 rounded text-center">
            <div className="text-white font-bold">Sage</div>
          </div>
          <div className="bg-olive p-4 rounded text-center">
            <div className="text-white font-bold">Olive</div>
          </div>
          <div className="bg-olive-dark p-4 rounded text-center">
            <div className="text-white font-bold">Olive Dark</div>
          </div>
          <div className="bg-orange p-4 rounded text-center">
            <div className="text-white font-bold">Orange</div>
          </div>
        </div>
      </div>

      {/* Fallback test */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Fallback Colors Test</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="fallback-cream p-4 rounded text-center">
            <div className="fallback-text-olive-dark font-bold">Cream Fallback</div>
          </div>
          <div className="fallback-sage p-4 rounded text-center">
            <div className="text-white font-bold">Sage Fallback</div>
          </div>
          <div className="fallback-olive p-4 rounded text-center">
            <div className="text-white font-bold">Olive Fallback</div>
          </div>
          <div className="fallback-olive-dark p-4 rounded text-center">
            <div className="text-white font-bold">Olive Dark Fallback</div>
          </div>
          <div className="fallback-orange p-4 rounded text-center">
            <div className="text-white font-bold">Orange Fallback</div>
          </div>
        </div>
      </div>
    </div>
  )
}
