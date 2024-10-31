'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Music, Calendar, MapPin, Ticket, Menu, X, TicketSlashIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<'day1' | 'day2' >('day1')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const lineup = {
    day1: [
      { name: "Artist 1", genre: "Pop" },
      { name: "Artist 2", genre: "Rock" },
      { name: "Artist 3", genre: "Electronic" },
      { name: "Artist 4", genre: "Hip Hop" },
    ],
    day2: [
      { name: "Artist 5", genre: "R&B" },
      { name: "Artist 6", genre: "Indie" },
      { name: "Artist 7", genre: "Jazz" },
      { name: "Artist 8", genre: "Folk" },
    ],
   
  }

  return (
    <div className="flex flex-col min-h-screen">
       <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollPosition > 50 ? 'bg-black bg-opacity-80 backdrop-blur-md' : ''}`}>
        <div className="container mx-auto px-10 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
          <Image
              src="/logo-wondersun.svg"
              alt="Wondersun Festival Logo"
              width={200}
              height={24}
            />
          </Link>
          <nav className="hidden md:flex items-center justify-center  space-x-12" >
            <Link className="text-2xl font-medium hover:text-yellow-400 transition-colors" href="#lineup">Lineup</Link>
            <Link className="text-2xl font-medium hover:text-yellow-400 transition-colors" href="#about">About</Link>
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-white text-xl">Tickets</Button>
          </nav>
          <Button 
            variant="outline" 
            size="sm" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-90 backdrop-blur-md">
            <nav className="flex flex-col items-center py-4">
              <Link className="text-lg font-medium py-2 hover:text-yellow-400 transition-colors" href="#lineup" onClick={() => setIsMenuOpen(false)}>Lineup</Link>
              <Link className="text-lg font-medium py-2 hover:text-yellow-400 transition-colors" href="#tickets" onClick={() => setIsMenuOpen(false)}>Tickets</Link>
              <Link className="text-lg font-medium py-2 hover:text-yellow-400 transition-colors" href="#about" onClick={() => setIsMenuOpen(false)}>About</Link>
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            className="absolute w-auto min-w-full min-h-full max-w-none"
          >
            <source src="/Teaser.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">Wondersun Festival</h1>
            <h3 className="text-xl md:text-2xl mb-8">August 15-17, 2024 • Vieil Allan</h3>
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-300">Tickets</Button>
          </div>
        </section>

        <section id="lineup" className="py-20 bg-gradient-to-b from-black to-purple-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Lineup</h2>
            <div className="flex justify-center space-x-4 mb-12">
            {[
                { key: 'day1', label: 'Vendredi' },
                { key: 'day2', label: 'Samedi' },
              ].map((day) => (
                <Button
                  key={day.key}
                  variant={selectedDay === day.key ? 'default' : 'outline'}
                  onClick={() => setSelectedDay(day.key as 'day1' | 'day2')}
                  className={`text-2xl font-bold py-3 px-6 ${selectedDay === day.key ? 'bg-yellow-400 text-black' : 'text-black border-white hover:bg-white hover:text-black'}`}
                  >
                    {day.label}
                  </Button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {lineup[selectedDay].map((artist, i) => (
                <Card key={i} className="bg-transparent border border-white/20 hover:border-yellow-400 transition-colors">
                  <CardContent className="p-6">
                    <Image
                      src={`/placeholder.svg?height=300&width=300`}
                      alt={artist.name}
                      width={300}
                      height={300}
                      className="rounded-md mb-4 object-cover"
                    />
                    <h3 className="font-bold text-xl mb-2">{artist.name}</h3>
                    <p className="text-sm text-gray-400">{artist.genre}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="tickets" className="py-20 bg-gradient-to-b from-purple-900 to-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Tickets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['General Admission', 'VIP', 'Platinum'].map((type, i) => (
                <Card key={i} className="bg-white/10 backdrop-blur-md border-0">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-2xl mb-2">{type}</h3>
                    <p className="text-4xl font-bold mb-4">${(i + 1) * 150}</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <Ticket className="mr-2 h-4 w-4 text-yellow-400" />
                        <span>Access to all stages</span>
                      </li>
                      <li className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-yellow-400" />
                        <span>3-day pass</span>
                      </li>
                      {i > 0 && (
                        <li className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-yellow-400" />
                          <span>Premium viewing areas</span>
                        </li>
                      )}
                    </ul>
                    <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-300">Prendre ma place</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">Un festival unique</h2>
                <h3 className="text-1xl md:text-2xl font-bold">Viens vivre l'experience Wondersun</h3>
                <p className="text-lg text-gray-300">
                Venez célébrer avec nous le pouvoir de la musique. Rejoignez-nous pour deux jours inoubliables, dans le cadre unique des ruines du vieil Allan au coeur de la Drôme Provençale.  
                decouvrez des installations artistiques immersives et le belvédere offrant une vue unique sur la vallée de la Drôme. 
                </p>
              </div>
              <div className="relative h-96">
                <Image
                  src="/drone.jpeg?height=400&width=600"
                  alt="Festival atmosphere"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-black to-purple-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Reste informé.e</h2>
            <p className="text-xl mb-8">abonne toi et sois le ou la premiere informées des actus et mise en vente des billets.</p>
            <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              <Input
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                placeholder="ton adresse email"
                type="email"
                required
              />
              <Button type="submit" className="bg-yellow-400 text-black text-xl hover:bg-yellow-300">S'inscrire</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/logo-wondersun.svg"
              alt="Wondersun Festival Logo"
              width={200}
              height={24}
            />
            </div>
            <nav className="flex gap-8">
              <Link className="text-sm hover:text-yellow-400 transition-colors" href="#">Terms</Link>
              <Link className="text-sm hover:text-yellow-400 transition-colors" href="#">Privacy</Link>
              <Link className="text-sm hover:text-yellow-400 transition-colors" href="#">Contact</Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © 2024 Wondersun Festival. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}