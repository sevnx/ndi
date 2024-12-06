'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import images from '@/constants/images'
import { Separator } from '@/components/ui/separator'

export default function NightmareCookieClient() {
  const tempValues = [0, 0.5, 1, 1.5, 2, 2.5]
  const state = [images.KeyIcyLogo, images.KeyIcyStade1, images.KeyIcyStade2, images.KeyIcyStade3, images.KeyIcyStade4, images.KeyIcyStade5]

  const [temp, setTemp] = useState<number>(0)
  const [svgTranslation, setSvgTranslation] = useState<number>(0)
  const [speed, setSpeed] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 0

  useEffect(() => {
    if (gameOver) return

    const moveSvg = () => {
      if (!isPaused) {
        setSvgTranslation((prev) => {
          const nextValue = prev + speed;
          if (nextValue >= screenHeight) {
            setGameOver(true);
            return prev;
          }
          return nextValue;
        });
        setSpeed((prev) => prev + 0.0008);
      }
    };

    const interval = setInterval(moveSvg, 10);
    return () => clearInterval(interval);
  }, [isPaused, speed, gameOver, screenHeight]);

  useEffect(() => {
    const percentage = (svgTranslation / screenHeight) * 100;
    const threshold = Math.floor(percentage / 16);

    if (threshold >= 0 && threshold < tempValues.length && temp !== tempValues[threshold]) {
      setTemp(tempValues[threshold]);
    }
  }, [svgTranslation, screenHeight, temp]);

  const handleClick = () => {
    if (gameOver) return;

    setSvgTranslation((prev) => {
      const nextValue = prev - 10 <= 0 ? 0 : prev - 10;
      if (nextValue >= screenHeight) {
        return screenHeight;
      }
      return nextValue;
    });

    setSpeed((prev) => prev - 0.01);

    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  };

  const sections = [
    {
      temp: 2,
      title: "Point de non-retour",
      content: "Les écosystèmes océaniques s'effondrent à un rythme alarmant. La montée rapide du niveau de la mer force des millions de personnes à quitter les zones côtières. Les océans, autrefois régulateurs du climat, deviennent des moteurs de chaos planétaire."
    },
    {
      temp: 1.5,
      title: "L'océan s'essouffle",
      content: "Les océans deviennent de plus en plus acides à cause de l'absorption du CO₂, menaçant la chaîne alimentaire marine. Les phénomènes climatiques extrêmes, comme les ouragans, gagnent en fréquence et en intensité: C'est ce qu'est estimé d'arriver en 2100."
    },
    {
      temp: 1,
      title: "Dommages permanents",
      content: "Les coraux subissent des dommages irréversibles. La fonte des glaciers accélère, contribuant à l'élévation du niveau de la mer. Les zones côtières voient leurs habitats marins, comme les mangroves, commencer à disparaître. Cela arrivera en 2030 !"
    },
    {
      temp: 0.5,
      title: "Premiers impacts",
      content: "La température des océans augmente considérablement, entraînant le blanchissement des coraux à grande échelle. Les courants océaniques commencent à se perturber, menaçant les écosystèmes marins et les stocks de poissons."
    },
    {
      temp: 0,
      title: "Les signes avant-coureurs",
      content: "Les eaux des océans commencent à absorber la chaleur supplémentaire. Les écosystèmes marins, comme les récifs coralliens, ressentent les premiers signes de stress thermique, mais la plupart résistent encore."
    }
  ];

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-[1120px] mx-auto px-4 md:px-0" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        width: "100%",
        textAlign: "left",
      }}>
        <div className="z-50 fixed flex" style={{flexDirection: "column"}}>
          <div className="flex justify-end" style={{marginTop: "2rem", position: "relative"}}>
            <svg className="h-24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"
              stroke="currentColor" style={{width: 'auto'}}>
              <rect x="0" y="0" width="100%" height="50%" fill="white" rx="0" ry="0"
                stroke={"red"}></rect>
              <text x="50%" y="25%" dominantBaseline="middle" textAnchor="middle" fill="red"
                fontWeight={"bold"} fontSize="1.5rem">
                +{temp}°C
              </text>
            </svg>
          </div>
          <div className="flex justify-end" onClick={handleClick}
            style={{marginTop: "2rem", position: "relative"}}>
            <Image
              src={state[tempValues.indexOf(temp)] as string}
              alt="Next.js logo"
              width={100}
              height={38}
              priority
            />
          </div>
        </div>
        
        <div className="w-full flex flex-col items-start gap-8">
          {sections.map((section, index) => (
            <div key={index} className="w-full pt-12 pb-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                    +{section.temp}°C
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <p className="text-muted-foreground mt-2">
                  {section.content}
                </p>
              </div>
              {index < sections.length - 1 && (
                <Separator className="mt-8" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 w-full" style={{transform: 'translateY(107vh)'}}>
        <div className="w-full" style={{position: 'relative'}}>
          <Image
            src={gameOver ? images.VagueFatale : images.Vague}
            alt="Vague"
            layout="intrinsic"
            width={1440}
            height={3200}
            style={{
              height: '90vh',
              position: 'absolute',
              bottom: `${svgTranslation}px`,
              width: '100%',
              transition: isPaused ? 'none' : 'transform 0.1s linear',
              overflow: 'hidden',
            }}
          />
        </div>
      </div>
    </div>
  );
};
