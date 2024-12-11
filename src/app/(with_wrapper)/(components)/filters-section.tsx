import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

const FiltersSection = () => {
  return (
    <div className="bg-card rounded-2xl p-5 space-y-3">
      <Input placeholder="Поиск" />
      <div className="flex gap-x-2">
        <Input placeholder="Когда" />
        <Input placeholder="Куда" />
      </div>
      <div className="grid grid-flow-col gap-x-2">
        <Input placeholder="Цена от" />
        <Input placeholder="Цена до" />

        <Popover>
          <PopoverTrigger>
            <Input
              placeholder="Тип места"
              readOnly
              className="cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent>
            <ScrollArea className="max-h-[295px] w-[280px]">
              <div className="flex flex-col">
                <div className="space-x-2">
                  <Checkbox />
                  <Label>Достопримечательность</Label>
                </div>
                <div className="space-x-2">
                  <Checkbox />
                  <Label>Музей</Label>
                </div>
                <div className="space-x-2">
                  <Checkbox />
                  <Label>Кафе</Label>
                </div>
                <div className="space-x-2">
                  <Checkbox />
                  <Label>Ресторан</Label>
                </div>
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Input
              placeholder="Возрастные ограничения"
              readOnly
              className="cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent>
            <ScrollArea className="max-h-[295px] w-[280px]">
              <div className="flex flex-col">
                <div className="space-x-2">
                  <Checkbox />
                  <Label>0+</Label>
                </div>
                <div className="space-x-2">
                  <Checkbox />
                  <Label>9+</Label>
                </div>
                <div className="space-x-2">
                  <Checkbox />
                  <Label>12+</Label>
                </div>
                <div className="space-x-2">
                  <Checkbox />
                  <Label>18+</Label>
                </div>
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Input
              placeholder="Активность"
              readOnly
              className="cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent>
            <ScrollArea className="max-h-[295px] w-[280px]">
              <div className="flex flex-col">
                <div className="space-x-2">
                  <Checkbox />
                  <Label>Низкая</Label>
                </div>
                <div className="space-x-2">
                  <Checkbox />
                  <Label>Средняя</Label>
                </div>
                <div className="space-x-2">
                  <Checkbox />
                  <Label>Продвинутая</Label>
                </div>
                <div className="space-x-2">
                  <Checkbox />
                  <Label>Интенсивная</Label>
                </div>
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default FiltersSection;
