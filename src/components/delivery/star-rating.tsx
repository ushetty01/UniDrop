"use client"

import { useState } from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
  totalStars?: number
  size?: number
}

export function StarRating({
  rating,
  onRatingChange,
  totalStars = 5,
  size = 24,
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
              className="sr-only"
            />
            <Star
              className={cn(
                "cursor-pointer transition-colors",
                ratingValue <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              )}
              fill={
                ratingValue <= (hover || rating) ? "currentColor" : "transparent"
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              style={{ width: size, height: size }}
            />
          </label>
        )
      })}
    </div>
  )
}
