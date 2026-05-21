import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '902166425406'
const MESSAGE = encodeURIComponent(
  'Merhaba, projeniz hakkında bilgi almak istiyorum.',
)

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp ile yazın"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-200 hover:scale-110"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
