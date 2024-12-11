import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import placesService from '@/services/places-service';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const PlacesPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const place = await placesService.getById(id);

  return (
    <div className="min-h-full flex justify-center">
      <main className="max-w-[1200px] w-full mt-5 mb-10">
        <div className="bg-card rounded-2xl w-full p-5">
          <span className="text-4xl font-semibold">{place.title}</span>
          <div className="mt-5 grid grid-cols-auto-fit-240 w-full gap-2 grid-rows-auto-fit-240">
            {place.imageUrls.map((imageUrl: string, index: number) => (
              <img
                key={index}
                src={imageUrl}
                className={twMerge(
                  'object-cover h-full w-full rounded-2xl',
                  index === 0
                    ? 'md:row-span-2 md:col-span-1 lg:col-span-2'
                    : '',
                )}
              ></img>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap-reverse w-full justify-between mt-2">
          {/* <div className="w-[350px] space-y-2">
            <div className="rounded-2xl bg-card h-[298px] p-5">
              <span>This is page of tour with id {id}</span>
            </div>
            <div className="h-[149px] bg-card rounded-2xl p-5">
              <span>This is page of tour with id {id}</span>
            </div>
          </div> */}

          <div className="w-full space-y-2">
            <div className="rounded-2xl bg-card w-full p-5 space-y-4">
              <span className="font-semibold text-3xl">Описание места</span>

              <div className="w-full flex flex-wrap gap-x-4">
                <div>
                  <span className="font-semibold">Активность</span>
                  <br />
                  <span className="">Базовая</span>
                </div>
                <div>
                  <span className="font-semibold">Возрастные ограничения</span>
                  <br />
                  <span className="">0+</span>
                </div>
              </div>

              <div>
                <span className="text-base">{place.description}</span>
              </div>
            </div>

            <div>
              <Link href={`/users/${place.author?.id}`}>
                <div className="rounded-2xl flex justify-between bg-card w-full p-5">
                  <div>
                    <span className="font-semibold text-3xl">
                      Автор - {place.author?.fullname}
                    </span>
                    <br />
                    <span className="text-base">
                      {place.author?.description ??
                        'К сожалению, пользователь не оставил о себе информации'}
                    </span>
                  </div>
                  <Avatar className="h-[50px] w-[50px]">
                    <AvatarImage
                      src={place.author?.avatarUrl}
                      className="object-cover"
                      alt="user image"
                    />
                    <AvatarFallback>
                      {place.author?.fullname[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlacesPage;
