"use client";
import { Play, Pause } from "lucide-react";
import { useRef, useState } from "react";

export default function Page() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    // 1. Container principal ocupando a tela toda com Flex column
    <div className="flex flex-col min-h-screen items-center">
       <div className="sm:h-72">
          <img src="./imgradiossp.png" alt="imagem-radio" className="h-full" />
        </div>
      {/* 2. Conteúdo principal (cresce para preencher o espaço disponível) */}
    <main className="grow flex flex-col items-center justify-center">
  <div className="mt-10 flex flex-col items-center">
    <audio ref={audioRef} src={process.env.NEXT_PUBLIC_URL_SSP} />

    <button className="flex flex-col items-center" onClick={togglePlay}>
      {!isPlaying ? (
        <Play size={100} />
      ) : (
        <>
          <Pause size={100} />
          <div className="w-64 mt-5">
            <img src="./master.gif" alt="Tocando" />
          </div>
        </>
      )}
    </button>
  </div>
</main>

      {/* 3. Footer */}
     <footer className="w-full py-8 mt-auto border-t border-gray-800 bg-black text-center">
  <div className="flex flex-col items-center gap-2">
    <p className="text-gray-400 text-sm font-medium tracking-wide">
      © 2026 Rádio SSP. Todos os direitos reservados.
    </p>
    <a 
      href="#" 
      className="text-white hover:text-blue-400 transition-colors text-sm font-light"
    >
      Desenvolvido por <span className="font-bold underline underline-offset-4">Jair Junior</span>
    </a>
  </div>
</footer>
      
    </div>
  );
}