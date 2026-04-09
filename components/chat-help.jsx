"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, ChevronDown, ChevronUp } from "lucide-react"

export default function ChatHelp() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([{ text: "Hello! How can I help you today?", isUser: false }])

  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!message.trim()) return

    // Add user message
    setMessages([...messages, { text: message, isUser: true }])
    setMessage("")

    // Simulate response after a short delay
    setTimeout(() => {
      const responses = [
        "Thank you for your message. Our team will get back to you soon.",
        "I understand your concern. How else can I assist you?",
        "That's a great question! You can find more information on our About page.",
        "We appreciate your interest in our foundation. Would you like to know more about our projects?",
        "Thank you for reaching out. Would you like me to connect you with one of our team members?",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [...prev, { text: randomResponse, isUser: false }])
    }, 1000)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#4db6ac] hover:bg-[#3d9d93] text-white shadow-lg z-50"
        aria-label="Open help chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 rounded-lg bg-white shadow-xl z-50 flex flex-col overflow-hidden border border-gray-200">
      {/* Chat Header */}
      <div className="bg-[#4db6ac] text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Help Chat</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-[#3d9d93] rounded p-1"
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-[#3d9d93] rounded p-1"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Chat Body - conditionally rendered based on minimized state */}
      {!isMinimized && (
        <>
          <div className="flex-1 p-3 overflow-y-auto max-h-80 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 ${msg.isUser ? "ml-auto text-right" : "mr-auto"} max-w-[80%]`}>
                <div
                  className={`p-3 rounded-lg inline-block ${
                    msg.isUser ? "bg-[#4db6ac] text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="border-t p-3 flex">
            <Input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 mr-2"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </>
      )}
    </div>
  )
}

