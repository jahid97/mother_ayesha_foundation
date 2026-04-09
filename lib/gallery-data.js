/**
 * Gallery Data Module
 *
 * This module contains data for the gallery section of the Mother Aysha Foundation website.
 * It exports:
 * - galleryImages: An array of all gallery images with metadata
 * - featuredGalleryImageIds: IDs of images to be featured on the homepage
 * - galleryCategories: Categories for filtering the gallery
 * - Helper functions to retrieve gallery data in different ways
 *
 * In a production environment, this data would typically be stored in a database
 * or content management system.
 */
// Gallery data - Contains information about gallery images
export const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800&text=Education+Program",
    alt: "Children in a classroom learning",
    category: "Education",
    location: "Kenya",
    date: "March 2023",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800&text=Water+Project",
    alt: "New water well installation",
    category: "Water & Sanitation",
    location: "Ethiopia",
    date: "January 2023",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800&text=Healthcare+Outreach",
    alt: "Medical team providing healthcare services",
    category: "Healthcare",
    location: "Bangladesh",
    date: "April 2023",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=800&text=Community+Garden",
    alt: "Community members working in a sustainable garden",
    category: "Food Security",
    location: "Uganda",
    date: "February 2023",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800&text=Volunteer+Team",
    alt: "Volunteer team building a school",
    category: "Infrastructure",
    location: "Tanzania",
    date: "May 2023",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=600&width=800&text=Children+Playing",
    alt: "Children playing at a new playground",
    category: "Recreation",
    location: "Rwanda",
    date: "June 2023",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=600&width=800&text=Donation+Drive",
    alt: "Community donation drive",
    category: "Community Support",
    location: "Somalia",
    date: "July 2023",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=600&width=800&text=Teacher+Training",
    alt: "Teacher training workshop",
    category: "Education",
    location: "Kenya",
    date: "August 2023",
  },
  {
    id: 9,
    src: "/placeholder.svg?height=600&width=800&text=Orphanage+Visit",
    alt: "Team visiting local orphanage",
    category: "Childcare",
    location: "India",
    date: "September 2023",
  },
  {
    id: 10,
    src: "/placeholder.svg?height=600&width=800&text=Clean+Water+Access",
    alt: "Family accessing clean water",
    category: "Water & Sanitation",
    location: "Ethiopia",
    date: "October 2023",
  },
  {
    id: 11,
    src: "/placeholder.svg?height=600&width=800&text=School+Supplies",
    alt: "Distributing school supplies",
    category: "Education",
    location: "Kenya",
    date: "November 2023",
  },
  {
    id: 12,
    src: "/placeholder.svg?height=600&width=800&text=Community+Meeting",
    alt: "Community planning meeting",
    category: "Community Development",
    location: "Uganda",
    date: "December 2023",
  },
]

// Featured gallery image IDs to display on the homepage
export const featuredGalleryImageIds = [1, 2, 3, 4, 5, 6, 7, 8]

// Gallery categories for filtering
export const galleryCategories = [
  "All",
  "Education",
  "Water & Sanitation",
  "Healthcare",
  "Food Security",
  "Infrastructure",
  "Recreation",
  "Community Support",
  "Childcare",
  "Community Development",
]

// Function to get all gallery images
export function getAllGalleryImages() {
  return galleryImages
}

// Function to get gallery images by category
export function getGalleryImagesByCategory(category) {
  return galleryImages.filter((image) => image.category === category)
}

// Function to get gallery image by ID
export function getGalleryImageById(id) {
  return galleryImages.find((image) => image.id === id)
}

