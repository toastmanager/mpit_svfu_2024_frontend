"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

const ProfileActionButtons = ({ profileId }: { profileId: string }) => {
  const { user } = useAuth();

  if (profileId === user?.id) {
    return (
      <div className="flex flex-col mt-5 md:mt-0 gap-1">
        <Button
          variant="outline"
          className="w-48 bg-card hover:bg-card border-primary text-primary"
        >
          Редактировать
        </Button>
        <Button
          variant="outline"
          className="w-48 bg-primary text-primary-foreground hover:bg-primary hover:opacity-85 hover:text-primary-foreground"
        >
          Создать тур
        </Button>
      </div>
    );
  }
};

export default ProfileActionButtons;
