'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface AdUnitProps {
  slot: string
  format: 'horizontal-banner' | 'rectangle' | 'vertical-rectangle' | 'native' | 'auto-relaxed'
  className?: string
  sticky?: boolean
}

// Map our slot names to actual AdSense slot IDs
const getAdSlotId = (slot: string): string => {
  const slotMapping: Record<string, string> = {
    'after-introduction': '3137758017', // display_horizontal
    'comparison-table': '3637571023', // auto-relaxed 1
    'between-reviews-1': '4431777949', // Display_responsive_square
    'between-reviews-2': '4431777949', // Display_responsive_square
    'sidebar-sticky': '4175507517', // display_vertical
    'footer': '2324489353', // auto-relaxed 2
  }
  return slotMapping[slot] || '4431777949' // default to responsive square
}

export default function AdUnit({ slot, format, className = '', sticky = false }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [adLoaded, setAdLoaded] = useState(false)
  
  // Use intersection observer to load ads only when they're about to be visible
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '50px',
    triggerOnce: true
  })
  
  // Define ad dimensions based on format
  const getDimensions = () => {
    switch(format) {
      case 'horizontal-banner':
        return { width: 728, height: 90, mobile: { width: 320, height: 50 } }
      case 'rectangle':
        return { width: 336, height: 280, mobile: { width: 300, height: 250 } }
      case 'vertical-rectangle':
        return { width: 300, height: 600, mobile: { width: 160, height: 600 } }
      case 'native':
        return { width: 'fluid', height: 'auto', mobile: { width: 'fluid', height: 'auto' } }
      default:
        return { width: 300, height: 250, mobile: { width: 300, height: 250 } }
    }
  }
  
  const dimensions = getDimensions()
  
  useEffect(() => {
    if (inView && !adLoaded && typeof window !== 'undefined') {
      console.log(`Loading ad for slot: ${slot}`)
      
      // Initialize AdSense if not already done
      if (typeof window !== 'undefined' && !(window as any).adsbygoogle) {
        (window as any).adsbygoogle = []
      }
      
      setTimeout(() => {
        setAdLoaded(true)
        // Push the ad to AdSense queue
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
        } catch (e) {
          console.error('AdSense error:', e)
        }
      }, 100)
    }
  }, [inView, adLoaded, slot])
  
  // Auto-relaxed ads (In-feed ads)
  if (format === 'auto-relaxed') {
    return (
      <div ref={ref} className={`my-8 ${className} flex justify-center`}>
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-5635114711353420"
          data-ad-slot={getAdSlotId(slot)}
        />
      </div>
    )
  }

  // Native ads need special styling to blend with content
  if (format === 'native') {
    return (
      <div ref={ref} className={`my-8 ${className}`}>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gray-300 rounded-lg animate-pulse" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-blue-600 font-semibold mb-1">SPONSORED</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {adLoaded ? 'Discover the AI Tool That\'s Changing Everything' : 'Loading...'}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {adLoaded ? 'Join thousands of professionals using this breakthrough AI assistant for better results in half the time.' : ''}
              </p>
              <button className="text-blue-600 font-medium text-sm hover:text-blue-700">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Standard display ads
  return (
    <div 
      ref={ref}
      className={`${className} ${sticky ? 'sticky top-24' : ''} flex justify-center items-center`}
    >
      <ins 
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5635114711353420"
        data-ad-slot={getAdSlotId(slot)}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}