type Props = {
  tag: string;
  title: string;
  desc?: string;
};

export default function SectionHead({ tag, title, desc }: Props) {
  return (
    <div className="text-center mb-20 pt-32">
      <span className="inline-block text-gold text-xs tracking-[0.4em] uppercase font-medium mb-4">
        {tag}
      </span>
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight">
        {title}
      </h1>
      {desc && <p className="text-text-dim mt-5 max-w-xl mx-auto">{desc}</p>}
    </div>
  );
}
