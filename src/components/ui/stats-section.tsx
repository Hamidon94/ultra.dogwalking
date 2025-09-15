export const StatsSection = () => {
  const stats = [
    {
      number: "10 000+",
      label: "Chiens heureux",
      icon: "🐕"
    },
    {
      number: "500+",
      label: "Promeneurs certifiés",
      icon: "🚶‍♂️"
    },
    {
      number: "50 000+",
      label: "Promenades réalisées",
      icon: "🌳"
    },
    {
      number: "4.9/5",
      label: "Note moyenne",
      icon: "⭐"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-sage/10 via-ocean/10 to-sage/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
