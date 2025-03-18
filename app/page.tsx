import AnnouncementEditor from "@/components/announcement-editor"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-serif text-center tracking-wide">
            <span className="block text-sm uppercase tracking-widest text-gray-300 mb-1">COBACAM</span>
            Éditeur d'annonce de deuil
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden transform transition-all">
          <AnnouncementEditor />
        </div>
      </main>

      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} COBACAM - Communauté Bamiléké du Cameroun</p>
          <p className="text-xs text-gray-400 mt-1">Avec respect et dignité</p>
        </div>
      </footer>
    </div>
  )
}

