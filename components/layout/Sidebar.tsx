'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Menu, Settings, Type, FileSpreadsheet } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/projects', icon: Menu, label: 'Projects' },
    { href: '/spintax', icon: Type, label: 'Spintax' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-4 border-b border-gray-200">
        <FileSpreadsheet className="w-8 h-8 text-blue-600" />
        <span className="ml-2 text-lg font-semibold">CSV Generator</span>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map(({ href, icon: Icon, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive(href)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}