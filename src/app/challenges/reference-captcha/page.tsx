import React from 'react';
import Head from 'next/head';
import images from '@/constants/images';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Référence Captcha',
}

export default function ReferenceCaptcha() {
  const sections = [
    {
      title: 'Le cœur',
      content: `Le cœur humain pompe le sang et maintient une circulation vitale. De même, l'océan possède des courants marins qui distribuent chaleur, nutriments et énergie autour de la planète.`,
      image: images.grid1.illus6
    },
    {
      title: 'Les poumons',
      content: `Nos poumons échangent constamment oxygène et dioxyde de carbone. L'océan échange également des gaz avec l'atmosphère. Les phytoplanctons marins produisent une grande partie de l'oxygène que nous respirons, et l'océan absorbe le CO<sub>2</sub>.`,
      image: images.grid1.illus3
    },
    {
      title: 'Colonne vertébrale',
      content: `Notre squelette soutient notre corps et protège nos organes. L'océan possède des structures vivantes et minérales, comme les récifs coralliens, qui offrent un support aux écosystèmes marins et protègent contre l'érosion côtière.`,
      image: images.grid1.illus5
    },
    {
      title: 'Le système immunitaire',
      content: `Le système immunitaire nous protège contre les agents pathogènes. Dans l'océan, la diversité biologique joue un rôle similaire en résistant mieux aux maladies et aux invasions d'espèces nuisibles.`,
      image: images.grid1.illus1
    },
    {
      title: "L'oreil",
      content: `L'oreille humaine nous permet de percevoir les sons et de maintenir notre équilibre. Les cétacés, comme les baleines, utilisent l'écholocation pour naviguer et communiquer dans l'océan.`,
      image: images.grid1.illus7
    },
    {
      title: 'La dent',
      content: `Les dents humaines nous permettent de mâcher et de digérer les aliments. Les requins et les autres prédateurs marins utilisent leurs dents pour capturer et manger leur proie.`,
      image: images.grid1.illus8
    },
    {
      title: 'Les cheveux',
      content: `Les cheveux humains protègent notre peau et régulent notre température corporelle. Les algues marines et les herbiers marins offrent des refuges et des nurseries pour de nombreuses espèces marines.`,
      image: images.grid1.illus9
    },
    {
      title: 'La peau',
      content: `La peau humaine est notre plus grand organe et nous protège contre les éléments extérieurs. La couche supérieure de l'océan, appelée la zone photique, est essentielle pour la photosynthèse et la vie marine.`,
      image: images.grid1.illus4
    },
    {
      title: 'Les artères',
      content: `Le système cardiovasculaire humain transporte les nutriments et l'oxygène à travers le corps. Les courants marins et les marées transportent des nutriments et des larves d'une région à l'autre.`,
      image: images.grid1.illus2
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <Head>
        <title>Océan & Corps Humain</title>
        <meta name="description" content="Comparaison interactive entre le corps humain et l'océan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className="text-center text-2xl font-bold mb-4 pt-12">
          Et si l&apos;océan était un corps humain ?
        </h2>

        <h5 className="text-center text-lg mb-10 text-gray-600 dark:text-gray-400">
          Découvrez comment les processus clés de l&apos;océan sont similaires aux systèmes fondamentaux de notre corps.
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-neutral-900">
              <img 
                src={section.image.src} 
                alt={section.title}
                className="w-full h-auto mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: section.content }} className="text-gray-600 dark:text-gray-400" />
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h4 className="text-xl font-semibold mb-4">
            Pourquoi cette comparaison ?
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            En comprenant les similitudes entre le fonctionnement de l&apos;océan et celui de notre propre corps, nous prenons conscience que préserver l&apos;océan, c&apos;est préserver la vie dans son ensemble. Nos actions quotidiennes influencent la santé de cet écosystème global, tout comme nos choix affectent notre propre santé.
          </p>
        </div>
      </main>
    </div>
  );
};
