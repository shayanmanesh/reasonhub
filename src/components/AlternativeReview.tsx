interface AlternativeReviewProps {
  rank: number
  name: string
  tagline: string
  pricing: string
  bestFor: string
  prosArray: string[]
  consArray: string[]
  detailedReview: string
}

export default function AlternativeReview({
  rank,
  name,
  tagline,
  pricing,
  bestFor,
  prosArray,
  consArray,
  detailedReview
}: AlternativeReviewProps) {
  return (
    <article className="mb-12 scroll-mt-20" id={`review-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      {/* Review header with ranking badge */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
            #{rank}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
            <p className="text-gray-600">{tagline}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">{pricing}</p>
          <p className="text-sm text-gray-500">Best for: {bestFor}</p>
        </div>
      </div>
      
      {/* Quick pros and cons for scanners */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">Strengths</h4>
          <ul className="space-y-1">
            {prosArray.map((pro, index) => (
              <li key={index} className="text-sm text-green-800 flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-semibold text-red-900 mb-2">Limitations</h4>
          <ul className="space-y-1">
            {consArray.map((con, index) => (
              <li key={index} className="text-sm text-red-800 flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Detailed review content */}
      <div className="prose max-w-none text-gray-700">
        {detailedReview.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph.trim()}
          </p>
        ))}
      </div>
      
      {/* Call-to-action */}
      <div className="mt-6 flex items-center justify-between border-t pt-6">
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try {name} Free →
          </a>
          <span className="text-sm text-gray-500">No credit card required</span>
        </div>
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Share this review
        </button>
      </div>
    </article>
  )
}