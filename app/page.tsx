"use client";

import { Play, Pause, Radio, Wifi, WifiOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<
    "conectado" | "online" | "offline" | "buffering"
  >("conectado");

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleCanPlay = () => {
      setStatus("online");
    };

    const handlePlaying = () => {
      setIsPlaying(true);
      setStatus("online");
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleWaiting = () => {
      setStatus("buffering");
    };

    const handleError = () => {
      setIsPlaying(false);
      setStatus("offline");
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("error", handleError);

    // Tenta iniciar o carregamento do stream
    audio.load();

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    try {
      setStatus("conectado");

      await audio.play();

      setIsPlaying(true);
    } catch (error) {
      console.error("Erro ao iniciar rádio:", error);
      setIsPlaying(false);
      setStatus("offline");
    }
  };

  const statusInfo = {
    conectado: {
      text: "Conectando à rádio...",
      icon: <Wifi size={18} />,
      className: "text-yellow-400",
    },

    online: {
      text: "Rádio online • No ar",
      icon: <Radio size={18} />,
      className: "text-green-400",
    },

    buffering: {
      text: "Carregando transmissão...",
      icon: <Wifi size={18} />,
      className: "text-blue-400",
    },

    offline: {
      text: "Rádio sem transmissão no momento",
      icon: <WifiOff size={18} />,
      className: "text-red-400",
    },
  };

  const currentStatus = statusInfo[status];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-white flex flex-col">

      {/* TOPO */}
      <header className="w-full flex justify-center pt-8 px-4">
        <div className="w-full max-w-4xl flex justify-center">
          <img
            src="/rps1.png"
            alt="RPS Publicidade"
            className="w-auto max-w-full h-40 sm:h-52 object-contain drop-shadow-2xl"
          />
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="flex-1 flex items-center justify-center px-5">

        <div className="w-full max-w-md flex flex-col items-center">

          {/* CARD DO PLAYER */}
          <div className="w-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 shadow-2xl">

            <div className="flex flex-col items-center">

              {/* ÍCONE DA RÁDIO */}
              <div
                className={`
                  relative w-32 h-32 rounded-full
                  flex items-center justify-center
                  bg-gradient-to-br from-orange-400 to-orange-600
                  shadow-lg shadow-orange-500/20
                  ${isPlaying ? "animate-pulse" : ""}
                `}
              >
                <Radio size={55} strokeWidth={1.5} />

                {isPlaying && (
                  <>
                    <span className="absolute inset-0 rounded-full border border-orange-400/50 animate-ping" />
                  </>
                )}
              </div>

              {/* NOME */}
              <h1 className="mt-7 text-3xl font-bold tracking-tight">
                Rádio RPS
              </h1>

              <p className="mt-2 text-sm text-zinc-400">
                RPS Publicidade
              </p>

              {/* STATUS */}
              <div
                className={`
                  mt-5 flex items-center gap-2
                  text-sm font-medium
                  ${currentStatus.className}
                `}
              >
                {currentStatus.icon}

                <span>{currentStatus.text}</span>
              </div>

              {/* BOTÃO */}
              <button
                onClick={togglePlay}
                disabled={status === "conectado" && !isPlaying}
                className="
                  mt-8
                  w-24 h-24
                  rounded-full
                  flex items-center justify-center
                  bg-white text-black
                  hover:scale-105
                  active:scale-95
                  transition-all duration-200
                  shadow-xl
                  disabled:opacity-60
                  disabled:cursor-wait
                "
              >
                {isPlaying ? (
                  <Pause size={38} fill="currentColor" />
                ) : (
                  <Play size={38} fill="currentColor" className="ml-1" />
                )}
              </button>

              {/* TEXTO ABAIXO */}
              <p className="mt-5 text-xs text-zinc-500 text-center">
                {isPlaying
                  ? "Você está ouvindo a transmissão ao vivo"
                  : "Clique no botão para ouvir a rádio"}
              </p>

            </div>
          </div>

          {/* ANIMAÇÃO */}
          {isPlaying && (
            <div className="w-full mt-6 flex justify-center">
              <img
                src="/master.gif"
                alt="Rádio tocando"
                className="w-48 opacity-80"
              />
            </div>
          )}

        </div>
      </main>

      {/* ÁUDIO */}
      <audio
        ref={audioRef}
        src={process.env.NEXT_PUBLIC_URL_SSP}
        preload="auto"
      />

      {/* FOOTER */}
      <footer className="w-full border-t border-white/10 bg-black/50 py-7 px-5">

        <div className="flex flex-col items-center gap-2">

          <p className="text-zinc-500 text-xs text-center">
            © 2026 Rádio RPS. Todos os direitos reservados.
          </p>

          <p className="text-zinc-600 text-xs">
            Desenvolvido por{" "}
            <span className="text-zinc-300 font-medium">
              Jair Junior
            </span>
          </p>

        </div>

      </footer>

    </div>
  );
}