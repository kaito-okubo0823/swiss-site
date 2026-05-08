type Props = {
  tag: string;
  title: string;
  desc?: string;
};

export default function SectionHead({ tag, title, desc }: Props) {
  return (
    <div className="text-center mb-12 md:mb-20 pt-20 md:pt-32">
      <span className="inline-block text-gold text-[0.65rem] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium mb-3 md:mb-4">
        {tag}
      </span>
      <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight px-4">
        {title}
      </h1>
      {desc && <p className="text-text-dim mt-4 md:mt-5 max-w-xl mx-auto text-sm md:text-base px-4">{desc}</p>}
    </div>
  );
}
