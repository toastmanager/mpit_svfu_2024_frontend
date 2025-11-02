'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ACTIVITIES, PLACE_TYPES } from '@/lib/utils';
import placesService from '@/services/places.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { ru } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const placeTypeKeys = Array.from(PLACE_TYPES.keys()) as [string, ...string[]];
const placeActivityKeys = Array.from(ACTIVITIES.keys()) as [
  string,
  ...string[],
];

const placeFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  locationName: z.string().min(3),
  type: z.enum(placeTypeKeys),
  activity: z.enum(placeActivityKeys),
  ageRestriction: z.number().int().min(0),
  price: z.number().min(0),
  longitude: z.number(),
  latitude: z.number(),
  start: z.date().nullable(),
  end: z.date().nullable(),
  address: z.string(),
  redirectUrl: z.string().url(),
});

type PlaceFormValues = z.infer<typeof placeFormSchema>;

const PlaceCreatePage = () => {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [start, setStart] = useState<Date | undefined>(undefined);
  const [end, setEnd] = useState<Date | undefined>(undefined);

  const router = useRouter();

  const form = useForm<PlaceFormValues>({
    resolver: zodResolver(placeFormSchema),
    defaultValues: {
      title: '',
      description: '',
      locationName: '',
      activity: 'SMALL',
      ageRestriction: 0,
      type: 'LANDMARK',
      price: 0,
      longitude: 129.732321,
      latitude: 62.027216,
      start: null,
      end: null,
      address: '',
      redirectUrl: '',
    },
  });

  const createPlace = async (data: PlaceFormValues) => {
    try {
      const newPlace = await placesService.create(data);
      console.log('Place created successfully:', newPlace);
      form.reset();
      setStart(undefined);
      setEnd(undefined);
      router.push(`${newPlace.id}/upload_image`);
    } catch (error) {
      console.error('Failed to create place:', error);
    }
  };

  return (
    <div className="min-h-full flex justify-center">
      <div className="max-w-[1200px] w-full bg-card mt-5 mb-52 rounded-2xl p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createPlace)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label>Название</Label>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Площадь Республики" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label>Адрес</Label>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Проспект Ленина, 30" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label>Название региона/области</Label>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="г. Якутск" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label>Описание</Label>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Инициативу создания площади Республики поддержали авторитетные руководители организаций, общественные деятели, историки и представители культуры. Более четырех тысяч горожан подписали обращение в поддержку этого решения, что свидетельствует о широкой общественной поддержке."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name="ageRestriction"
                render={({ field }) => (
                  <FormItem className="w-full min-w-[200px]">
                    <FormLabel>
                      <Label>Возрастное ограничение</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem className="w-full min-w-[200px]">
                    <FormLabel>
                      <Label>Высота</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="62.027216"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem className="w-full min-w-[200px]">
                    <FormLabel>
                      <Label>Широта</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="129.732321"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full min-w-[200px]">
                    <FormLabel>
                      <Label>Цена</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full min-w-[200px]">
                    <FormLabel>
                      <Label>Тип</Label>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(PLACE_TYPES.entries()).map(
                            ([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem className="w-full min-w-[200px]">
                    <FormLabel>
                      <Label>Уровень активности</Label>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите уровень" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(ACTIVITIES.entries()).map(
                            ([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center gap-5">
              <div className="flex gap-1">
                <div className="space-y-2">
                  <Label>Дата начала</Label>
                  <Popover open={startOpen} onOpenChange={setStartOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        id="start-date-picker"
                        className="w-full"
                      >
                        {start?.toLocaleDateString() ?? 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        locale={ru}
                        mode="single"
                        selected={start}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setStart(date);
                          form.setValue('start', date ?? null);
                          setStartOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Время начала</Label>
                  <Input
                    type="time"
                    id="start-time-picker"
                    disabled={start == null}
                    onChange={(e) => {
                      const time = e.target.value;
                      if (!time || !start) return;

                      const [hours, minutes] = time.split(':').map(Number);
                      const newStart = new Date(start);
                      newStart.setHours(hours, minutes);

                      setStart(newStart);
                      form.setValue('start', newStart);
                    }}
                    defaultValue="10:30"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
              </div>

              <div className="flex gap-1">
                <div className="space-y-2">
                  <Label>Дата окончания</Label>
                  <Popover open={endOpen} onOpenChange={setEndOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        id="end-date-picker"
                        className="w-full"
                      >
                        {end?.toLocaleDateString() ?? 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        locale={ru}
                        mode="single"
                        selected={end}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setEnd(date);
                          form.setValue('end', date ?? null);
                          setEndOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-nowrap">Время окончания</Label>
                  <Input
                    type="time"
                    id="end-time-picker"
                    disabled={end == null}
                    onChange={(e) => {
                      const time = e.target.value;
                      if (!time || !end) return;

                      const [hours, minutes] = time.split(':').map(Number);
                      const newEnd = new Date(end);
                      newEnd.setHours(hours, minutes);

                      setEnd(newEnd);
                      form.setValue('end', newEnd);
                    }}
                    defaultValue="18:00"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="redirectUrl"
                render={({ field }) => (
                  <FormItem className="w-full space-y-2">
                    <FormLabel>
                      <Label>Ссылка на страницу оплаты/подробностей</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://vk.com/" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Создать
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PlaceCreatePage;
