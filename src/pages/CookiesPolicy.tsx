import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FloatingActionButton } from "@/components/ui/floating-action-button";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 prose max-w-none">
        <h1 className="text-4xl font-bold text-center mb-8">Politique de Cookies</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Qu'est-ce qu'un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte qui est stocké sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Il permet au site de se souvenir de vos actions et préférences (telles que la connexion, la langue, la taille de la police et d'autres préférences d'affichage) sur une période donnée, de sorte que vous n'ayez pas à les saisir à nouveau chaque fois que vous revenez sur le site ou naviguez d'une page à l'autre.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Comment utilisons-nous les cookies ?</h2>
          <p>
            Nous utilisons les cookies pour diverses raisons, notamment :
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>**Cookies strictement nécessaires** : Essentiels pour le fonctionnement du site web et pour vous permettre d'utiliser ses fonctionnalités, comme l'accès aux zones sécurisées.</li>
            <li>**Cookies de performance** : Collectent des informations sur la façon dont vous utilisez notre site web (par exemple, les pages que vous visitez le plus souvent, les messages d'erreur que vous rencontrez). Ces cookies ne collectent pas d'informations qui vous identifient personnellement.</li>
            <li>**Cookies de fonctionnalité** : Permettent au site web de se souvenir des choix que vous faites (comme votre nom d'utilisateur, votre langue ou la région où vous vous trouvez) et de fournir des fonctionnalités améliorées et plus personnelles.</li>
            <li>**Cookies de ciblage/publicitaires** : Utilisés pour diffuser des publicités plus pertinentes pour vous et vos intérêts. Ils sont également utilisés pour limiter le nombre de fois que vous voyez une publicité et pour aider à mesurer l'efficacité des campagnes publicitaires.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Vos choix concernant les cookies</h2>
          <p>
            Vous avez le droit de décider d'accepter ou de refuser les cookies. Vous pouvez exercer vos préférences en matière de cookies en cliquant sur les liens de désactivation appropriés fournis dans le tableau des cookies ci-dessous. Vous pouvez également configurer votre navigateur web pour refuser tous les cookies ou pour vous alerter lorsqu'un cookie est envoyé. Cependant, si vous désactivez les cookies, certaines parties de notre site web pourraient ne pas fonctionner correctement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Mises à jour de notre politique de cookies</h2>
          <p>
            Nous pouvons mettre à jour cette politique de cookies de temps à autre afin de refléter, par exemple, des changements dans les cookies que nous utilisons ou pour d'autres raisons opérationnelles, légales ou réglementaires. Veuillez donc consulter régulièrement cette politique de cookies pour rester informé de notre utilisation des cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Plus d'informations</h2>
          <p>
            Si vous avez des questions sur notre utilisation des cookies ou d'autres technologies, veuillez nous contacter via notre page de contact.
          </p>
        </section>

      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default CookiesPolicy;


