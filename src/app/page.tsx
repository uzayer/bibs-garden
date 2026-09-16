import { Footer } from '@/components/footer'
import { Skiper29 } from '@/components/ui/skiper-ui/skiper29'

export default function Home() {
  return (
    <>
      {/* Skiper UI's demo site renders this with its dark border token, so the rules stay invisible on the cream background */}
      <div className="[--border:oklch(1_0_0/10%)]">
        <Skiper29 />
      </div>
      <Footer />
    </>
  )
}
