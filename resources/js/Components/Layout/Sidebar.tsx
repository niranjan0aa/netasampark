import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
  HomeIcon, 
  UsersIcon, 
  ChatBubbleLeftRightIcon,
  TicketIcon,
  CalendarIcon,
  NewspaperIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  BanknotesIcon,
  UserGroupIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Voter CRM', href: '/voters', icon: UsersIcon },
  { name: 'Communication', href: '/communication', icon: ChatBubbleLeftRightIcon },
  { name: 'Ticketing', href: '/tickets', icon: TicketIcon },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Local News', href: '/news', icon: NewspaperIcon },
  { name: 'Surveys & Issues', href: '/surveys', icon: ClipboardDocumentListIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Finance', href: '/finance', icon: BanknotesIcon },
  { name: 'Partners', href: '/partners', icon: UserGroupIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const { url } = usePage();
  
  return (
    <>
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={() => setOpen(false)} />
        <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white">
          <div className="flex h-full flex-col overflow-y-auto bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NS</span>
                </div>
                <span className="ml-3 text-xl font-semibold text-gray-900">NetaSampark</span>
              </div>
              <button
                type="button"
                className="rounded-md p-2.5 text-gray-700"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="mt-8 flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                            url.startsWith(item.href)
                              ? "bg-indigo-50 text-indigo-600"
                              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-6 w-6 shrink-0",
                              url.startsWith(item.href) ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">NS</span>
            </div>
            <span className="ml-3 text-xl font-semibold text-gray-900">NetaSampark</span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                          url.startsWith(item.href)
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-6 w-6 shrink-0",
                            url.startsWith(item.href) ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}