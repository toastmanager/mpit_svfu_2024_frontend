'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, createPlacesQueries } from '@/lib/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const PLACE_TYPES = new Map<string, string>([
  ['LANDMARK', 'Достопримечательность'],
  ['MUSEUM', 'Музей'],
  ['CAFE', 'Кафе'],
  ['RESTAURANT', 'Ресторан'],
]);

const ACTIVITIES = new Map<string, string>([
  ['SMALL', 'Низкая'],
  ['MEDIUM', 'Средняя'],
  ['ADVANCED', 'Продвинутая'],
  ['HIGH', 'Высокая'],
]);

const FiltersSection = ({
  queries = {
    start: new Date(),
  },
}: {
  queries?: PlaceFilters;
}) => {
  const placeTypesKeys = useMemo(() => Array.from(PLACE_TYPES.keys()), []);
  const activitiesKeys = useMemo(() => Array.from(ACTIVITIES.keys()), []);

  const router = useRouter();

  const [ageRestrictionsValue, setAgeRestrictionsValue] = useState<
    number | undefined
  >(queries.ageRestriction);

  const handleAgeRestrictionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let newValue = e.target.value;
    const numericValue = newValue.replace(/[^0-9]/g, '');
    setAgeRestrictionsValue(
      !isNaN(Number(numericValue)) ? Number(numericValue) : undefined,
    );
  };

  const updateQueries = (filters: PlaceFilters) => {
    router.push(createPlacesQueries(filters));
  };

  const handleAgeRestrictionBlur = () => {
    updateQueries({
      ...queries,
      ageRestriction: !isNaN(Number(ageRestrictionsValue))
        ? Number(ageRestrictionsValue)
        : undefined,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    updateQueries({ ...queries, search: newValue });
  };

  const isTypesEmpty =
    !queries.types || (queries.types && queries.types[0] == '');
  const isActivitesEmpty =
    !queries.activities || (queries.activities && queries.activities[0] == '');

  return (
    <div className="bg-card rounded-2xl p-5 space-y-3">
      <Input placeholder="Поиск" value={queries.search} onChange={handleSearchChange} />
      <div className="flex gap-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !queries.start && 'text-muted-foreground',
              )}
            >
              <Icon icon={'mage:calendar'} className="mr-2 h-4 w-4" />
              {queries.start ? (
                format(queries.start, 'PPP', { locale: ru })
              ) : (
                <span>Начало путешествия</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={queries.start}
              onSelect={(date?: Date) => {
                updateQueries({ ...queries, start: date });
              }}
              locale={ru}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !queries.end && 'text-muted-foreground',
              )}
            >
              <Icon icon={'mage:calendar'} className="mr-2 h-4 w-4" />
              {queries.end ? (
                format(queries.end, 'PPP', { locale: ru })
              ) : (
                <span>Конец путешествия</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={queries.end}
              onSelect={(date?: Date) => {
                updateQueries({ ...queries, end: date });
              }}
              locale={ru}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {/* <Input placeholder="Куда" /> */}
      </div>
      <div className="grid grid-flow-col gap-x-2">
        <Input placeholder="Цена от" className="w-full" />
        <Input placeholder="Цена до" className="w-full" />

        <Popover>
          <PopoverTrigger>
            <Input
              value={
                !isTypesEmpty
                  ? queries.types
                      ?.map((key, _) => PLACE_TYPES.get(key)!)
                      .join(', ')
                  : ''
              }
              readOnly
              placeholder="Тип места"
              className={'cursor-pointer w-full'}
            />
          </PopoverTrigger>
          <PopoverContent>
            <ScrollArea className="max-h-[295px] w-[280px]">
              <div className="flex flex-col">
                {placeTypesKeys.map((key, _) => (
                  <div key={`${key}_checkbox`} className="space-x-2">
                    <Checkbox
                      checked={queries.types?.includes(key) ?? false}
                      onCheckedChange={(checked: boolean) => {
                        if (checked) {
                          if (queries.types && queries.types[0] == '') {
                            queries.types.pop();
                          }
                          queries.types?.push(key);
                        } else {
                          queries.types?.splice(queries.types?.indexOf(key), 1);
                        }
                        updateQueries({ ...queries, types: queries.types });
                      }}
                    />
                    <Label>{PLACE_TYPES.get(key)!}</Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <Input
          placeholder="Возрастные ограничения"
          type="text"
          value={`${ageRestrictionsValue ?? ''}`}
          onChange={handleAgeRestrictionChange}
          onBlur={handleAgeRestrictionBlur}
        />

        <Popover>
          <PopoverTrigger>
            <Input
              value={
                !isActivitesEmpty
                  ? queries.activities
                      ?.map((key, _) => ACTIVITIES.get(key)!)
                      .join(', ')
                  : ''
              }
              readOnly
              className={'cursor-pointer w-full'}
              placeholder="Активность"
            />
          </PopoverTrigger>
          <PopoverContent>
            <ScrollArea className="max-h-[295px] w-[280px]">
              <div className="flex flex-col">
                {activitiesKeys.map((key, _) => (
                  <div key={`${key}_checkbox`} className="space-x-2">
                    <Checkbox
                      checked={queries.activities?.includes(key) ?? false}
                      onCheckedChange={(checked: boolean) => {
                        if (checked) {
                          if (
                            queries.activities &&
                            queries.activities[0] == ''
                          ) {
                            queries.activities.pop();
                          }
                          queries.activities?.push(key);
                        } else {
                          queries.activities?.splice(
                            queries.activities?.indexOf(key),
                            1,
                          );
                        }
                        updateQueries({
                          ...queries,
                          activities: queries.activities,
                        });
                      }}
                    />
                    <Label>{ACTIVITIES.get(key)!}</Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default FiltersSection;
