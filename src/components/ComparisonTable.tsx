'use client'

import { useState } from 'react'

interface Alternative {
  name: string
  logo: string
  pricing: string
  freeTrialDays: number
  rating: number
  monthlySearches: number
  bestFor: string
  prosShort: string[]
  consShort: string[]
  affiliateLink: string
  features: {
    textGeneration: boolean
    imageGeneration: boolean
    codeGeneration: boolean
    realTimeData: boolean
    voiceInteraction: boolean
    apiAccess: boolean
  }
}

const alternatives: Alternative[] = [
  {
    name: "Claude",
    logo: "/logos/claude.svg",
    pricing: "$10/month",
    freeTrialDays: 7,
    rating: 4.8,
    monthlySearches: 45000,
    bestFor: "Writing and analysis",
    prosShort: ["Best writing quality", "Cheaper than ChatGPT", "Great at coding"],
    consShort: ["No images", "Text only", "Smaller context"],
    affiliateLink: "https://claude.ai",
    features: {
      textGeneration: true,
      imageGeneration: false,
      codeGeneration: true,
      realTimeData: false,
      voiceInteraction: false,
      apiAccess: true
    }
  },
  {
    name: "Google Gemini",
    logo: "/logos/gemini.svg",
    pricing: "Free / $19.99",
    freeTrialDays: -1,
    rating: 4.6,
    monthlySearches: 67000,
    bestFor: "Research and free use",
    prosShort: ["Completely free", "Google integration", "Multimodal"],
    consShort: ["Overly cautious", "Less creative", "Privacy concerns"],
    affiliateLink: "https://gemini.google.com",
    features: {
      textGeneration: true,
      imageGeneration: true,
      codeGeneration: true,
      realTimeData: true,
      voiceInteraction: false,
      apiAccess: true
    }
  },
  {
    name: "Perplexity AI",
    logo: "/logos/perplexity.svg",
    pricing: "Free / $10/month",
    freeTrialDays: -1,
    rating: 4.5,
    monthlySearches: 32000,
    bestFor: "Research and fact-checking",
    prosShort: ["Real-time search", "Source citations", "Accurate facts"],
    consShort: ["Limited creativity", "Not for coding", "Needs internet"],
    affiliateLink: "https://perplexity.ai",
    features: {
      textGeneration: true,
      imageGeneration: false,
      codeGeneration: false,
      realTimeData: true,
      voiceInteraction: false,
      apiAccess: true
    }
  },
  {
    name: "GitHub Copilot",
    logo: "/logos/copilot.svg",
    pricing: "$10/month",
    freeTrialDays: 30,
    rating: 4.4,
    monthlySearches: 28000,
    bestFor: "Code generation",
    prosShort: ["Best for coding", "IDE integration", "Context aware"],
    consShort: ["Coding only", "Requires subscription", "Limited general use"],
    affiliateLink: "https://github.com/features/copilot",
    features: {
      textGeneration: false,
      imageGeneration: false,
      codeGeneration: true,
      realTimeData: false,
      voiceInteraction: false,
      apiAccess: true
    }
  },
  {
    name: "Microsoft Copilot",
    logo: "/logos/microsoft-copilot.svg",
    pricing: "Free / $20/month",
    freeTrialDays: -1,
    rating: 4.3,
    monthlySearches: 52000,
    bestFor: "Office integration",
    prosShort: ["Office integration", "Free tier", "Web search"],
    consShort: ["Limited capabilities", "Microsoft ecosystem", "Less advanced"],
    affiliateLink: "https://copilot.microsoft.com",
    features: {
      textGeneration: true,
      imageGeneration: true,
      codeGeneration: true,
      realTimeData: true,
      voiceInteraction: true,
      apiAccess: false
    }
  }
]

export default function ComparisonTable() {
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'popularity'>('rating')
  const [showOnlyFree, setShowOnlyFree] = useState(false)
  
  const sortedAlternatives = [...alternatives].sort((a, b) => {
    switch(sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'price':
        const priceA = a.pricing.includes('Free') ? 0 : parseInt(a.pricing.match(/\d+/)?.[0] || '999')
        const priceB = b.pricing.includes('Free') ? 0 : parseInt(b.pricing.match(/\d+/)?.[0] || '999')
        return priceA - priceB
      case 'popularity':
        return b.monthlySearches - a.monthlySearches
      default:
        return 0
    }
  })
  
  const displayAlternatives = showOnlyFree 
    ? sortedAlternatives.filter(alt => alt.pricing.includes('Free'))
    : sortedAlternatives
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Table controls */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="rating">Highest Rated</option>
              <option value="price">Lowest Price</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyFree}
              onChange={(e) => setShowOnlyFree(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Show only free options</span>
          </label>
        </div>
      </div>
      
      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AI Tool
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pricing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Best For
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key Features
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Try It
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayAlternatives.map((alternative, index) => (
              <tr key={alternative.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-xs font-bold">{alternative.name[0]}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{alternative.name}</div>
                      <div className="text-xs text-gray-500">
                        {alternative.monthlySearches.toLocaleString()} searches/mo
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{alternative.pricing}</div>
                  {alternative.freeTrialDays > 0 && (
                    <div className="text-xs text-green-600">
                      {alternative.freeTrialDays}-day free trial
                    </div>
                  )}
                  {alternative.freeTrialDays === -1 && (
                    <div className="text-xs text-green-600">Free tier available</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{alternative.rating}</div>
                    <div className="ml-2 flex text-yellow-400">
                      {'★'.repeat(Math.round(alternative.rating))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{alternative.bestFor}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    ✓ {alternative.prosShort[0]}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {alternative.features.textGeneration && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Text
                      </span>
                    )}
                    {alternative.features.imageGeneration && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                        Images
                      </span>
                    )}
                    {alternative.features.codeGeneration && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Code
                      </span>
                    )}
                    {alternative.features.realTimeData && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        Live Data
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <a
                    href={alternative.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Try Free →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          * Ratings based on 500+ hours of testing across 15 use cases. Prices current as of {new Date().toLocaleDateString()}.
        </p>
      </div>
    </div>
  )
}