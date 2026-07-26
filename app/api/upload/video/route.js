/**
 * Client-upload token endpoint for videos — admin only.
 *
 * Videos are too large for the regular /api/upload route (a Next.js
 * serverless function body is capped around 4.5MB). Instead the browser
 * uploads the file bytes directly to Vercel Blob using a short-lived token
 * issued here via @vercel/blob/client's handleUpload().
 *
 * Used by components/admin/video-upload.jsx and the video branch of
 * components/admin/media-picker.jsx.
 */
import { handleUpload } from "@vercel/blob/client"
import { NextResponse } from "next/server"
import { auth } from "@/auth"

const MAX_VIDEO_BYTES = 100 * 1024 * 1024 // 100 MB

export async function POST(request) {
  const body = await request.json()

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await auth()
        if (!session || session.user.role !== "admin") {
          throw new Error("Unauthorized")
        }
        return {
          allowedContentTypes: ["video/mp4", "video/webm", "video/quicktime", "video/x-matroska"],
          maximumSizeInBytes: MAX_VIDEO_BYTES,
          addRandomSuffix: true,
        }
      },
      // No onUploadCompleted — we don't need server-side bookkeeping, the
      // client receives the blob URL directly from upload() and saves it
      // via the normal admin save flow. Omitting it (rather than passing a
      // no-op) also avoids @vercel/blob's "no callbackUrl could be
      // determined" warning, which it logs whenever this callback is
      // present but the app isn't running on Vercel (e.g. local dev).
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
