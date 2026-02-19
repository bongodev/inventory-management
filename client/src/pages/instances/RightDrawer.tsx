import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { InstancePage } from './page';

export function RightSideDrawer() {
  return (
    <div>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">Create New Instance</Button>
        </DrawerTrigger>

        <DrawerContent className="max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create New Instance</DrawerTitle>
          </DrawerHeader>

          <InstancePage />

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
