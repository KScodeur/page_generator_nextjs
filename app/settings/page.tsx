import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Database Configuration
          </h2>
          <div className="text-sm text-gray-500">
            <p>Database settings are managed through environment variables.</p>
            <p className="mt-2">Current configuration:</p>
            <ul className="mt-2 space-y-1">
              <li>Host: {process.env.DB_HOST || 'Not configured'}</li>
              <li>Port: {process.env.DB_PORT || '5432'}</li>
              <li>Database: {process.env.DB_NAME || 'Not configured'}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Generation Settings
          </h2>
          <div className="text-sm text-gray-500">
            <p>Default generation settings for new projects:</p>
            <ul className="mt-2 space-y-1">
              <li>Maximum pages per project: 100</li>
              <li>Default generation method: All combinations</li>
              <li>Starting index: 0</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}