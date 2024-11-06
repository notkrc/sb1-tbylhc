'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { GraduationCap, LogIn, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export function Header() {
  const { isTeacherMode, setTeacherMode } = useAppStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Implement Gmail OAuth login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6" />
          <h1 className="text-xl font-bold">Notend</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Student</span>
            <Switch
              checked={isTeacherMode}
              onCheckedChange={setTeacherMode}
              aria-label="Toggle teacher mode"
            />
            <span className="text-sm">Teacher</span>
          </div>
          <ThemeToggle />
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="text-sm">John Doe</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button onClick={handleLogin} className="flex items-center space-x-2">
              <LogIn className="h-5 w-5" />
              <span>Login with Gmail</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}