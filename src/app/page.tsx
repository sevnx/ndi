import { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import images from '@/constants/images';
import { AnimatedSvg } from '@/components/animated-svg';

export const metadata: Metadata = {
  title: 'Accueil | KeyIcy'
};

export default function Home() {
  return (
    <div className="min-h-screen pt-40 pb-12 max-w-[1120px] mx-auto px-4 md:px-0">
      <div className="text-left mb-12">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Corps et océan : un équilibre vital à préserver
        </h1>
        <p className="text-lg text-muted-foreground">
          Nos artères et les courants marins, nos poumons et le plancton...
          De surprenantes similitudes relient notre corps aux océans.
          Des liens qui nous rappellent une évidence :
          la santé des mers n'est pas qu'une question d'écologie,
          c'est un enjeu vital pour la Terre.
        </p>
      </div>
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 aspect-square bg-muted rounded-lg">
            <AnimatedSvg image1={images.FluxMarin} image2={images.Artere} />
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-semibold mb-4">La grande circulation vitale</h2>
            <p className="text-lg text-muted-foreground">
              Les courants océaniques sont les artères de notre planète, transportant chaleur, 
              nutriments et oxygène à travers les mers du monde entier. Cette circulation thermohaline, 
              comparable à notre système sanguin, maintient l'équilibre thermique de la Terre et nourrit 
              d'innombrables écosystèmes marins. Lorsque ces courants sont perturbés par le réchauffement 
              climatique, c'est tout l'équilibre de la vie marine qui est menacé, comme un cœur qui 
              battrait de façon irrégulière.
            </p>
          </div>
        </div>
        <Separator className="mt-12" />
      </div>
      <div className="mb-12">
        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="w-full md:w-1/3 aspect-square bg-muted rounded-lg">
            <AnimatedSvg image1={images.Poumon} image2={images.Phytoplancton} />
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-semibold mb-4">Le souffle des océans</h2>
            <p className="text-lg text-muted-foreground">
              Les océans sont les véritables poumons de notre planète bleue. À travers le 
              phytoplancton et les algues marines, ils produisent plus de la moitié de l'oxygène 
              que nous respirons. Ce processus vital de photosynthèse marine absorbe également le 
              CO₂ atmosphérique, régulant ainsi naturellement notre climat. Mais aujourd'hui, 
              l'acidification des océans menace cet équilibre fragile, compromettant la capacité 
              des océans à maintenir cette respiration planétaire essentielle.
            </p>
          </div>
        </div>
        <Separator className="mt-12" />
      </div>
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 aspect-square bg-muted rounded-lg">
            <AnimatedSvg image1={images.SystemeImmunitaire} image2={images.Corail} />
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-semibold mb-4">Les barrières protectrices de la vie marine</h2>
            <p className="text-lg text-muted-foreground">
              Les récifs coralliens constituent un système immunitaire naturel pour nos océans. 
              Tels des sentinelles, ils protègent les côtes de l'érosion tout en abritant une 
              biodiversité exceptionnelle. Ces écosystèmes complexes filtrent les eaux et maintiennent 
              leur qualité, créant des zones refuges indispensables pour d'innombrables espèces marines. 
              Leur disparition progressive sous l'effet du réchauffement climatique menace cet équilibre millénaire.
            </p>
          </div>
        </div>
        <Separator className="mt-12" />
      </div>
      <div>
        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="w-full md:w-1/3 aspect-square bg-muted rounded-lg">
            <AnimatedSvg image1={images.Peau} image2={images.SurfaceOcean} />
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-semibold mb-4">L'interface entre deux mondes</h2>
            <p className="text-lg text-muted-foreground">
              La surface des océans agit comme une peau protectrice pour notre planète, régulant 
              les échanges thermiques et gazeux avec l'atmosphère. Cette interface délicate maintient 
              un équilibre climatique stable depuis des millénaires. Le réchauffement des eaux de 
              surface et la pollution perturbent aujourd'hui ces échanges vitaux, affectant les cycles 
              naturels qui maintiennent la stabilité de notre climat global.
            </p>
          </div>
        </div>
        <Separator className="mt-12" />
      </div>
      <div className="pt-12 flex justify-center">
        <div className="w-3/4">
          <Image 
            src={images.Banquise} 
            alt="Animation de la banquise" 
            className="w-full h-auto shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
