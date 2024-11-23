export default function NotFound() {
  return (
    <section className="h-[calc(100vh-50px)] flex relative">
      <div className='m-auto text-center'>
        <span>Путешествия по сайту, вы забрели не туда</span>
        <br />
        <span>Страница не найдена</span>
      </div>
      <div className="absolute w-full -top-80 text-[500px] md:text-[1000px] font-bold text-foreground/5 text-center select-none -z-50">
        <span>404</span>
      </div>
    </section>
  );
}
