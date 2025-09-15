import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FaqSection = () => {
  const faqs = [
    {
      question: "Comment puis-je être sûr(e) que mon chien sera en sécurité ?",
      answer: "Tous nos promeneurs sont rigoureusement sélectionnés et vérifiés. Ils possèdent une assurance responsabilité civile et suivent une formation spécialisée. De plus, vous pouvez suivre la promenade en temps réel grâce au GPS."
    },
    {
      question: "Que se passe-t-il si le promeneur ne peut pas venir ?",
      answer: "En cas d'imprévu, nous vous prévenons immédiatement et vous proposons un promeneur de remplacement ou un remboursement intégral. Notre service client est disponible 24h/24 pour vous accompagner."
    },
    {
      question: "Mon chien peut-il être promené avec d'autres chiens ?",
      answer: "Cela dépend de votre préférence et du tempérament de votre chien. Vous pouvez choisir une promenade individuelle ou en groupe. Nos promeneurs évaluent toujours la compatibilité avant de regrouper les chiens."
    },
    {
      question: "Comment sont fixés les tarifs ?",
      answer: "Nos tarifs sont transparents et basés sur la durée de la promenade. Ils incluent l'assurance, le suivi GPS, les photos et le rapport de promenade. Aucun frais caché !"
    },
    {
      question: "Puis-je annuler ou modifier ma réservation ?",
      answer: "Oui, vous pouvez annuler gratuitement jusqu'à 2 heures avant le début de la promenade. Pour les modifications, contactez directement votre promeneur via l'application."
    },
    {
      question: "Que faire si mon chien a des besoins spéciaux ?",
      answer: "Lors de la réservation, vous pouvez indiquer tous les besoins spéciaux de votre chien (médicaments, allergies, comportement). Nos promeneurs sont formés pour s'adapter à chaque situation."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-warm/40 to-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Questions{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              fréquentes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Tout ce que vous devez savoir sur nos services
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-gradient-card rounded-lg border-0 shadow-soft px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Vous avez d'autres questions ?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-sage hover:text-sage/80 transition-colors font-semibold"
          >
            Contactez notre équipe
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
